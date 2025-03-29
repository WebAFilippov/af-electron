import { concurrency, createJsonQuery, declareParams } from '@farfetched/core'
import { zodContract } from '@farfetched/zod'

import { z } from 'zod'

import { GET_ALL_CATEGORIES } from '@shared/api'

const ResponseCategories = z.object({
  success: z.boolean(),
  data: z.array(z.object({ id: z.string(), title: z.string(), count: z.number() })).optional(),
  message: z.string().optional()
})

const fetchCategoriesFx = createJsonQuery({
  params: declareParams<{ timelapse: number }>(),
  request: {
    method: 'GET',
    url: () => GET_ALL_CATEGORIES,
    query: ({ timelapse }) => ({
      timelapse: timelapse
    })
  },
  response: {
    contract: zodContract(ResponseCategories)
  }
})

concurrency(fetchCategoriesFx, { strategy: 'TAKE_LATEST' })

export { fetchCategoriesFx }
