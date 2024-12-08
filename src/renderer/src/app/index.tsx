import { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'



import { RouterProvider } from './providers/router'
import { ThemeProvider } from './providers/theme'
import { store } from './store'
import './styles/globals.css'

const App = (): JSX.Element => {
  

  return (
    <Provider store={store}>
      <ThemeProvider storageKey="ui-theme" defaultTheme="light">
        <RouterProvider />
      </ThemeProvider>
    </Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)
