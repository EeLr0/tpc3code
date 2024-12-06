import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppWuseReducer from './AppWuseReducer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWuseReducer/>
    {/* /<App /> */}
  </StrictMode>,
)
