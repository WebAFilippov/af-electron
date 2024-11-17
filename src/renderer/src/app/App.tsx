import { useEffect } from 'react'

import { WindowHeader } from '../shared/components/ui'
import { WindowLayout } from '../shared/layouts/window-layout'
import { ThemeProvider } from './providers/theme-provider'

function App(): JSX.Element {
  useEffect(() => {
    const sendCommandShowWindow = async () => {
      const response = await window.window_control.startWindow()
      console.log(response)
    }

    sendCommandShowWindow()
  })

  return (
    <>
      <ThemeProvider storageKey="ui-theme">
        <WindowLayout window_header={<WindowHeader />}>
          <div>Content</div>
        </WindowLayout>
      </ThemeProvider>
    </>
  )
}

export default App
