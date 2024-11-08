import { WindowHeader } from '../shared/components/ui'
import { WindowLayout } from '../shared/layouts/window-layout'
import { ThemeProvider } from './providers/theme-provider'

function App(): JSX.Element {
  return (
    <>
      <ThemeProvider storageKey="vite-ui-theme">
        <WindowLayout window_header={<WindowHeader />}>
        </WindowLayout>
      </ThemeProvider>
    </>
  )
}

export default App
