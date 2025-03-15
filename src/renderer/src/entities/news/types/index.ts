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

export interface ResponseNews {
  success: boolean
  data?: News[]
  hasNextPage?: boolean
  nextCursor?: string | null
  message?: string
}

export interface News {
  id: string
  title: string
  slug: string
  link: string | null
  pubDate: Date
  categoryId: string | null
  creatorId: string | null
  content: string | null
  createdAt: Date
  updatedAt: Date
}

// interface MediaContent {
//   contentUrl: string | null
//   thumbnailUrl: string | null
//   credit: string | null
//   title: string | null
//   text: string | null
// }

// export interface RSSItem {
//   title: string
//   slug: string
//   link: string | null
//   pubDate: Date
//   category: string | null
//   creator: string | null
//   media: MediaContent
//   content: string | null
// }

// export interface ResponseNews {
//   success: boolean
//   data?: News[]
//   hasNextPage?: boolean
//   nextCursor?: string | null
//   message?: string
// }

// type News = {
// id: string;
// title: string;
// slug: string;
// link: string | null;
// pubDate: Date;
// categoryId: string | null;
// creatorId: string | null;
// content: string | null;
// createdAt: Date;
// updatedAt: Date;
// }
