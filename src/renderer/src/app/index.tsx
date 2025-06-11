import { App } from './application'
import './styles/globals.css'
import { AppStarted } from '@shared/config/init'
import ReactDOM from 'react-dom/client'

const container = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(container)

AppStarted()
root.render(<App />)
