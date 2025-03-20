import { concurrency, createJsonQuery } from '@farfetched/core'
import { zodContract } from '@farfetched/zod'

import { z } from 'zod'

import { GET_ALL_CATEGORIES } from '@shared/api'

const ResponseCategories = z.object({
  success: z.boolean(),
  data: z.array(z.object({ slug: z.string(), title: z.string(), count: z.number() })).optional(),
  message: z.string().optional()
})

const fetchCategoriesFx = createJsonQuery({
  request: {
    method: 'GET',
    url: () => GET_ALL_CATEGORIES
  },
  response: {
    contract: zodContract(ResponseCategories)
  }
})

concurrency(fetchCategoriesFx, { strategy: 'TAKE_FIRST' })

export { fetchCategoriesFx }
