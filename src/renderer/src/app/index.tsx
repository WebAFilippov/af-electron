import { App } from './application'
import './styles/globals.css'
import { AppStarter } from '@shared/model/app-starter'
import ReactDOM from 'react-dom/client'

const container = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(container)

AppStarter()
root.render(<App />)
