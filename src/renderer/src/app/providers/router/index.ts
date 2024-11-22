import { createHistoryRouter } from 'atomic-router'
import { createBrowserHistory } from 'history'

import { routingConfig } from './config'

const history = createBrowserHistory()

export const router: ReturnType<typeof createHistoryRouter> = createHistoryRouter({
  routes: routingConfig
})

router.setHistory(history)
