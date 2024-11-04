import { ModeToggle } from '../entities/mode-toggle/mode-toggle'
import { ThemeProvider } from './providers/theme-provider'

function App(): JSX.Element {
  return (
    <>
      <ThemeProvider storageKey="vite-ui-theme">
        <ModeToggle />
      </ThemeProvider>
    </>
  )
}

export default App
