import { useEffect } from 'react'

import { WindowHeader } from '@widgets/window-header'

import AutoComplete from '@features/auto-complite'

import { WindowLayout } from '@shared/layouts'

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
          <div>
            <AutoComplete />
          </div>
        </WindowLayout>
      </ThemeProvider>
    </>
  )
}

export default App
