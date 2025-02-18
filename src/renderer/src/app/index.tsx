import ReactDOM from 'react-dom/client'

import { AppStarted } from '@shared/config/init'

import { App } from './application'
import './styles/globals.css'

const container = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(container)

AppStarted()
root.render(<App />)
