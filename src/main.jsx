import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import posthog from 'posthog-js'
import './index.css'
import App from './App.jsx'

posthog.init('phc_tg2qzGx695gPlOCsYc5ki9JVnZLED0uoqQWLOYD0EyZ', {
    api_host: 'https://us.i.posthog.com',
    // Autocapture is default true, so clicks and pageviews are tracked natively.
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
