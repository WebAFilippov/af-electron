import { useEffect } from 'react'
import ReactDOM from 'react-dom/client'

import { AppLayout } from '@shared/layouts/app-layout'

import { ThemeProvider } from './providers/theme'
import './styles/globals.css'

const App = (): JSX.Element => {
  useEffect(() => {
    const sendCommandShowWindow = async () => {
      await window.window_control.startWindow()
    }

    sendCommandShowWindow()
  })

  return (
    <>
      <ThemeProvider storageKey="ui-theme">
        <AppLayout />
      </ThemeProvider>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)
