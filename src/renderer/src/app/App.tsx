import { useEffect } from 'react'

import { WindowLayout } from '../shared/layouts/window-layout'
import { ThemeProvider } from './providers/theme-provider'
import { WindowHeader } from '../widgets'
import AutoComplete from '../features/AutoComplete/AutoComplete'

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
          <div>
            <AutoComplete />
          </div>
        </WindowLayout>
      </ThemeProvider>
    </>
  )
}

export default App
