import { load } from 'cheerio'
import { parseStringPromise } from 'xml2js'

import { createSlug } from '../shared'

class NewsService {
  async fetchNews() {
    try {
      const response = await fetch('https://lenta.ru/rss/google-newsstand/main/')
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`)
      }
      const data = await response.text()

      const parsedData = await parseStringPromise(data)
      const items = parsedData.rss.channel[0].item

      const news = items.map((item: any) => {
        const $ = load(item['content:encoded']?.[0] || '')
        const content: any[] = []

        function parseNode(node, root = false) {
          const $node = $(node)

          return {
            root,
            tag: node.tagName || 'text',
            text: $node.text() || '',
            attributes: node.attribs || {},
            children: $node.children().length
              ? $node
                  .contents()
                  .map((_, child) => parseNode(child))
                  .get()
              : []
          }
        }

        $('body > *').each((_, elem) => {
          content.push(parseNode(elem, true))
        })

        const title = item.title?.[0] || 'untitled'
        const pubDate = item.pubDate?.[0] || new Date().toISOString()
        const makedSlug = createSlug(title)
        const timestamp = Date.parse(pubDate)
        const slug = `${makedSlug}-${timestamp}`

        return {
          title,
          slug,
          pubDate,
          link: item.link?.[0] || '',
          description: item.description?.[0] || '',
          category: item.category?.[0] || '',
          creator: item['dc:creator']?.[0] || '',
          media: {
            contentUrl: item['media:content']?.[0]?.$?.url || '',
            thumbnailUrl: item['media:content']?.[0]?.['media:thumbnail']?.[0]?.$?.url || '',
            credit: item['media:content']?.[0]?.['media:credit']?.[0] || '',
            title: item['media:content']?.[0]?.['media:title']?.[0] || '',
            text: item['media:content']?.[0]?.['media:text']?.[0] || ''
          },
          content
        }
      })

      return news
    } catch (error) {
      console.error('Ошибка при загрузке новостей:', error)
      throw error
    }
  }
}

export const newsService = new NewsService()
