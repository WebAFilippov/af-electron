export interface MediaData {
  thumbnailUrl: string
  credit?: string
  title?: string
}

export interface ContentNode {
  text: string
  [key: string]: any
}

export interface NewsItem {
  title: string
  link: string
  pubDate: string
  category: string
  creator: string
  media: MediaData
  content: ContentNode[]
}
