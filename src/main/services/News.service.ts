import { parseStringPromise } from 'xml2js';
import { load } from 'cheerio';

class NewsService {
  async fetchNews(): Promise<{ title: string; items: NewsItem[] }> {
    try {
      const response = await fetch('https://lenta.ru/rss/google-newsstand/main/');
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      const data = await response.text();

      // Парсинг XML с помощью xml2js
      const parsedData = await parseStringPromise(data);

      // Извлекаем заголовок ленты
      const feedTitle = parsedData.rss.channel[0].title[0] || 'Без названия';

      // Извлекаем элементы <item>
      const items = parsedData.rss.channel[0].item.map((item: any) => {
        // Парсим содержимое content:encoded с помощью cheerio
        const $ = load(item['content:encoded']?.[0] || '');
        const content: ContentItem[] = [];

        // Обрабатываем все корневые элементы
        $('body > *').each((_, element) => {
          if (element.name === 'p') {
            const paragraph = $(element);
            const textNodes: ContentNode[] = [];

            paragraph.contents().each((_, node) => {
              if (node.type === 'text') {
                textNodes.push({ type: 'text', value: $(node).text().trim() });
              } else if (node.type === 'tag' && node.name === 'a') {
                textNodes.push({
                  type: 'link',
                  value: $(node).text().trim(),
                  href: $(node).attr('href') || '',
                  target: $(node).attr('target') || '_blank',
                });
              } else if (node.type === 'tag' && node.name === 'b') {
                textNodes.push({
                  type: 'bold',
                  value: $(node).text().trim(),
                });
              }
            });

            content.push({ type: 'paragraph', data: { text: textNodes } });
          } else if (element.name === 'div' && $(element).attr('data-block') === 'gallery') {
            const images = $(element)
              .find('img')
              .map((_, img) => ({
                src: $(img).attr('src') || '',
                alt: $(img).attr('alt') || '',
              }))
              .get();
            content.push({ type: 'gallery', data: { images } });
          } else if (element.name === 'figure') {
            const image = {
              src: $(element).find('img').attr('src') || '',
              alt: $(element).find('img').attr('alt') || '',
            };
            const caption = $(element).find('figcaption').text().trim() || '';
            content.push({ type: 'figure', data: { image, caption } });
          } else if (element.name === 'blockquote') {
            const quote = $(element).find('p').map((_, p) => {
              const textNodes: ContentNode[] = [];
              $(p).contents().each((_, node) => {
                if (node.type === 'text') {
                  textNodes.push({ type: 'text', value: $(node).text().trim() });
                } else if (node.type === 'tag' && node.name === 'a') {
                  textNodes.push({
                    type: 'link',
                    value: $(node).text().trim(),
                    href: $(node).attr('href') || '',
                    target: $(node).attr('target') || '_blank',
                  });
                } else if (node.type === 'tag' && node.name === 'b') {
                  textNodes.push({
                    type: 'bold',
                    value: $(node).text().trim(),
                  });
                }
              });
              return { text: textNodes };
            }).get();
            content.push({ type: 'blockquote', data: { quote } });
          }
        });

        return {
          title: item.title?.[0] || '',
          link: item.link?.[0] || '',
          pubDate: item.pubDate?.[0] || '',
          description: item.description?.[0] || '',
          content, // Массив структурированных данных
          category: item.category?.[0] || '',
          creator: item['dc:creator']?.[0] || '',
          imageUrl: item['media:content']?.[0]?.$?.url || '',
        };
      });


      return { title: feedTitle, items };
    } catch (error) {
      console.error('Ошибка при загрузке новостей:', error);
      throw error;
    }
  }
}

// Интерфейс для структуры новости
interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  content: ContentItem[];
  category: string;
  creator: string;
  imageUrl: string;
}

// Интерфейсы для содержимого content
interface ContentItem {
  type: 'paragraph' | 'gallery' | 'figure' | 'blockquote'; // Добавляем blockquote
  data: ParagraphData | GalleryData | FigureData | BlockquoteData;
}

interface ParagraphData {
  text: ContentNode[];
}

interface GalleryData {
  images: { src: string; alt: string }[];
}

interface FigureData {
  image: { src: string; alt: string };
  caption: string;
}

interface BlockquoteData {
  quote: { text: ContentNode[] }[]; // Массив параграфов внутри цитаты
}

interface ContentNode {
  type: 'text' | 'link' | 'bold';
  value: string;
  href?: string;
  target?: string;
}

export const newsService = new NewsService();