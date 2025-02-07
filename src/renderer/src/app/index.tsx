import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { DebugMenu } from '@entities/debug-mode/ui/DebugMenu'

import { RouterProvider } from './providers/router'
import { store } from './store'
import './styles/globals.css'

const App = (): JSX.Element => {
  return (
    <>
      <DebugMenu />
      <Provider store={store}>
        <RouterProvider />
      </Provider>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)
