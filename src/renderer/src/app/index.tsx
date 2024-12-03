import { useEffect } from 'react'
import ReactDOM from 'react-dom/client'

import { RouterProvider } from './providers/router'
import { ThemeProvider } from './providers/theme'
import './styles/globals.css'

const App = (): JSX.Element => {
  useEffect(() => {
    const sendCommandShowWindow = async () => {
      await window.api.startWindow()
    }

    sendCommandShowWindow()
  })

  return (
    <ThemeProvider storageKey="ui-theme" defaultTheme="light">
      <RouterProvider />
    </ThemeProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)
