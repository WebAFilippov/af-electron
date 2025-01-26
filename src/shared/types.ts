import { IApplication } from '@models/Application.model'
import { ICityFull } from '@models/City.model'

export interface SearchCitiesParams {
  query: string
  limit?: number
  order?: 'DESC' | 'ASC'
}

export type PreloadStart = {
  city: ICityFull
  application: IApplication
}
