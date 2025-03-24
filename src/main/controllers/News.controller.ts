import { ipcMain } from 'electron'

import { externalServerAPI, parseField } from '../shared'

export interface ParsedNode {
  root: boolean
  tag: string
  text: string
  attributes: Record<string, string>
  parentNode: string | null
  children: ParsedNode[]
}

interface MediaContent {
  contentUrl: string | null
  thumbnailUrl: string | null
  credit: string | null
  title: string | null
  text: string | null
}

export interface RSSItem {
  title: string
  slug: string
  link: string | null
  pubDate: Date
  category: string | null
  creator: string | null
  media: MediaContent
  content: string | null
}

export interface News {
  id: string
  title: string
  slug: string
  link: string | null
  pubDate: Date
  content: string | null
  category: { title: string } | null
  creator: { name: string } | null
  media: {
    contentUrl: string | null
    thumbnailUrl: string | null
    credit: string | null
    title: string | null
    text: string | null
  } | null
}

export interface ResponseNews {
  success: boolean
  data?: News[]
  hasNextPage?: boolean
  nextCursor?: string | null
  message?: string
}

export const NewsController = () => {
  ipcMain.handle('v1/news/fetch_news', async (_event, query: string) => {
    try {
      const response = await fetch(`${externalServerAPI}/news/?${query}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: ResponseNews = await response.json()

      if (!data.success) {
        return {
          success: false,
          message: data.message
        }
      }

      const parsedData =
        data.data &&
        data.data.map((item) => ({
          ...item,
          content: item.content ? parseField(item.content) : null,
          media: item.media
            ? {
                ...item.media,
                credit: item.media.credit ? parseField(item.media.credit, true) : null,
                title: item.media.title ? parseField(item.media.title, true) : null,
                text: item.media.text ? parseField(item.media.text, true) : null
              }
            : null
        }))

      return {
        success: true,
        data: parsedData,
        hasNextPage: data.hasNextPage,
        nextCursor: data.nextCursor
      }
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'Произошла неизвестная ошибка при получении новостей'
      }
    }
  })
}
