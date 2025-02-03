// @/app/routing
import { createHistoryRouter } from 'atomic-router'
import { createBrowserHistory } from 'history'

import { layoutRoute } from '@app/layout/ui/Layout'

const routes = [{ path: '/', route: layoutRoute }]

const router = createHistoryRouter({
  routes: routes
})

const history = createBrowserHistory()

router.setHistory(history)
