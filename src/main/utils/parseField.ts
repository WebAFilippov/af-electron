/* eslint-disable @typescript-eslint/no-explicit-any */
import { Cheerio, CheerioAPI, load } from 'cheerio'

export interface ParsedNode {
  root: boolean
  tag: string
  text: string
  attributes: Record<string, string>
  parentNode: string | null
  children: ParsedNode[]
}

export const parseField = (data: string, isMedia?: boolean): ParsedNode[] => {
  const processedData = isMedia ? `<span>${data}</span>` : data
  const $: CheerioAPI = load(processedData || '')
  const fieldContainer: ParsedNode[] = []

  $('body > *').each((_, elem: any) => {
    fieldContainer.push(parseNode(elem, true))
  })

  function parseNode(node: any, root = false, parentTag: string | null = null): ParsedNode {
    const $node: Cheerio<any> = $(node)
    const children = $node.children().length
      ? $node
          .contents()
          .map((_, child: any) => parseNode(child, false, node.tagName || 'text'))
          .get()
      : []

    return {
      root,
      tag: node.tagName || 'text',
      parentNode: parentTag,
      text: $node.text() || '',
      attributes: node.attribs || {},
      children
    }
  }

  return fieldContainer
}
