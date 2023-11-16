import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { EmployeesProvider } from './context/EmployeesContext.tsx'
import { HelmetProvider } from 'react-helmet-async'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <EmployeesProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </EmployeesProvider>
  </React.StrictMode>,
)
