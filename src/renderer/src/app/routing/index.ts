import { createHistoryRouter } from 'atomic-router'
import { createBrowserHistory } from 'history'

import { homePage } from '@pages/home-page/ui'

const routes = [{ path: '/', route: homePage }]

const router = createHistoryRouter({
  routes: routes
})

const history = createBrowserHistory()

router.setHistory(history)
