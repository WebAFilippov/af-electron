export interface SearchCitiesParams {
  query: string
  limit?: number
  order?: 'DESC' | 'ASC'
}

interface IApplication {
  id: number
  owm_apikey: string
}

interface ICity {
  id: number
  cityInfoId: number
  default: boolean
  order: number
}

export type PreloadStart = {
  city: ICity[]
  application: IApplication
}
