// import { ICityInfo } from '@models/CityInfo.model'

// import { cityInfoRepository } from '@repositories/CityInfo.repository'

// class CityInfoService {
//   async getCitiesQueryParams(queryParams: {
//     query: string
//     limit?: number
//     ordering?: 'DESC' | 'ASC'
//   }): Promise<ICityInfo[]> {
//     const { query, limit, ordering } = queryParams

//     const cities = await cityInfoRepository.getCitiesQueryParams({
//       query,
//       limit,
//       ordering
//     })

//     return cities
//   }
// }

// export const cityInfoService = new CityInfoService()

// function traverseNode(node: any): HtmlNode[] {
//   const result: HtmlNode[] = []

//   $(node).each((i: number, element: any) => {
//     const tagName = $(element).get(0)?.tagName // Имя тега
//     const attributes = $(element).attr() || {} // Все атрибуты
//     const text = $(element).clone().children().remove().end().text().trim() // Текст без дочерних тегов
//     const children = $(element).children().length
//       ? traverseNode($(element).children()) // Рекурсивно обходим дочерние элементы
//       : []

//     const nodeData: HtmlNode = {
//       tag: tagName,
//       attributes,
//       text: text || null,
//       children: children.length ? children : null
//     }

//     result.push(nodeData)
//   })

//   return result
// }
