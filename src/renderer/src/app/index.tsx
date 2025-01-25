import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { RouterProvider } from './providers/router'
import { store } from './store'
import './styles/globals.css'

const App = (): JSX.Element => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider />
      </Provider>
    </QueryClientProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)
