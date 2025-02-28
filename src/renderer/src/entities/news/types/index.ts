export interface MediaData {
  contentUrl: string
  thumbnailUrl: string
  credit: string
  title: string
  text: string
}

export interface ContentNode {
  root: boolean
  tag: string
  text: string
  attributes: { [key: string]: string }
  children: ContentNode[]
}

export interface NewsItem {
  title: string
  slug: string
  link: string
  pubDate: string
  description: string
  category: string
  creator: string
  media: MediaData
  content: ContentNode[]
}
