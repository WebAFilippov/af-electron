import { z } from 'zod'

const ParsedNodeSchema = z.lazy(() =>
  z.object({
    root: z.boolean(),
    tag: z.string(),
    text: z.string(),
    attributes: z.record(z.string()),
    parentNode: z.string().nullable(),
    children: z.array(ParsedNodeSchema)
  })
)

const NewsSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  link: z.string().nullable(),
  pubDate: z.string(),
  content: z.array(ParsedNodeSchema).nullable(),
  category: z.object({ title: z.string() }).nullable(),
  creator: z.object({ name: z.string() }).nullable(),
  media: z
    .object({
      contentUrl: z.string().nullable(),
      thumbnailUrl: z.string().nullable(),
      credit: z.array(ParsedNodeSchema).nullable(),
      title: z.array(ParsedNodeSchema).nullable(),
      text: z.array(ParsedNodeSchema).nullable()
    })
    .nullable()
})

const ResponseNewsSchema = z.object({
  success: z.boolean(),
  data: z.array(NewsSchema).optional(),
  hasNextPage: z.boolean().optional(),
  nextCursor: z.string().nullable().optional(),
  message: z.string().optional()
})

export type ResponseNews = z.infer<typeof ResponseNewsSchema>

export type NewsItem = z.infer<typeof NewsSchema>

interface News {
  category: string
  data: NewsItem[]
  scroll: number
  cursor: string | null
  hasNextPage: boolean
}

export { ResponseNewsSchema }
export type { News }
