import { useEffect, useState } from 'react';

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

interface ContentItem {
  type: 'paragraph' | 'gallery' | 'figure' | 'blockquote';
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
  quote: { text: ContentNode[] }[];
}

interface ContentNode {
  type: 'text' | 'link' | 'bold';
  value: string;
  href?: string;
  target?: string;
}

export const Home = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [feedTitle, setFeedTitle] = useState<string>('');

  useEffect(() => {
    window.api
      .fetchNews()
      .then(({ title, items }) => {
        setFeedTitle(title);
        setNews(items);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">{feedTitle}</h1>
      <ul className="space-y-6 max-w-4xl mx-auto">
        {news.map((item, index) => (
          <li
            key={index}
            className="bg-white shadow-md rounded-lg p-6 transition-all hover:shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Категория:</span> {item.category}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Автор:</span> {item.creator}
            </p>
            <p className="text-sm text-gray-500 mb-3">
              <span className="font-medium">Дата:</span> {item.pubDate}
            </p>
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full max-w-md rounded-md mb-4 object-cover"
              />
            )}
            <div className="text-gray-800 mb-4">
              {item.content.map((contentItem, idx) => {
                if (contentItem.type === 'paragraph') {
                  const paragraph = contentItem.data as ParagraphData;
                  return (
                    <p key={idx} className="mb-2">
                      {paragraph.text.map((node, nodeIdx) =>
                        node.type === 'text' ? (
                          <span key={nodeIdx}>{node.value}</span>
                        ) : node.type === 'link' ? (
                          <a
                            key={nodeIdx}
                            href={node.href}
                            target={node.target}
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {node.value}
                          </a>
                        ) : (
                          <b key={nodeIdx} className="font-bold">
                            {node.value}
                          </b>
                        )
                      )}
                    </p>
                  );
                } else if (contentItem.type === 'gallery') {
                  const gallery = contentItem.data as GalleryData;
                  return (
                    <div key={idx} className="grid grid-cols-2 gap-4 mb-4">
                      {gallery.images.map((image, imgIdx) => (
                        <img
                          key={imgIdx}
                          src={image.src}
                          alt={image.alt || item.title}
                          className="w-full rounded-md object-cover"
                        />
                      ))}
                    </div>
                  );
                } else if (contentItem.type === 'figure') {
                  const figure = contentItem.data as FigureData;
                  return (
                    <figure key={idx} className="mb-4">
                      <img
                        src={figure.image.src}
                        alt={figure.image.alt || item.title}
                        className="w-full max-w-md rounded-md object-cover"
                      />
                      {figure.caption && (
                        <figcaption className="text-sm text-gray-600 mt-2">
                          {figure.caption}
                        </figcaption>
                      )}
                    </figure>
                  );
                } else if (contentItem.type === 'blockquote') {
                  const blockquote = contentItem.data as BlockquoteData;
                  return (
                    <blockquote key={idx} className="border-l-4 border-gray-300 pl-4 italic text-gray-700 mb-4">
                      {blockquote.quote.map((quoteItem, quoteIdx) => (
                        <p key={quoteIdx} className="mb-2">
                          {quoteItem.text.map((node, nodeIdx) =>
                            node.type === 'text' ? (
                              <span key={nodeIdx}>{node.value}</span>
                            ) : node.type === 'link' ? (
                              <a
                                key={nodeIdx}
                                href={node.href}
                                target={node.target}
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                {node.value}
                              </a>
                            ) : (
                              <b key={nodeIdx} className="font-bold">
                                {node.value}
                              </b>
                            )
                          )}
                        </p>
                      ))}
                    </blockquote>
                  );
                }
                return null;
              })}
            </div>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Читать далее
            </a>
            <hr className="mt-4 border-gray-200" />
          </li>
        ))}
      </ul>
    </div>
  );
};