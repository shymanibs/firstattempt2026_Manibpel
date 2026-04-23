/* @refresh reload */
import { render } from 'solid-js/web'
import './index.css'
import App from './App.jsx'

// Register Service Worker (only in production)
navigator.serviceWorker.register('/firstattempt2026_Manibpel/sw.js', { scope: '/firstattempt2026_Manibpel/' })

const root = document.getElementById('root')
render(() => <App />, root)