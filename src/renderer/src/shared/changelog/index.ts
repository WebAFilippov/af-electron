import { v3_0_0 } from './3.0.0'
import { v3_0_8 } from './3.0.8'

type ChangelogItem = {
  version: string
  date: string
  description?: string[]
  changelog?: string[]
}

export const CHANGELOG: ChangelogItem[] = [v3_0_8, v3_0_0]
