import { v3_0_0 } from './3.0.0'
import { v3_0_8 } from './3.0.8'
import { v3_1_0 } from './3.1.0'
import { v3_1_5 } from './3.1.5'

type ChangelogItem = {
  version: string
  date: string
  description?: string[]
  changelog?: string[]
}

export const CHANGELOG: ChangelogItem[] = [v3_1_5, v3_1_0, v3_0_8, v3_0_0]
