import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { PacientesContextoProveedor } from './context/PacienteContexto.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PacientesContextoProveedor>
      <App />
    </PacientesContextoProveedor>
  </React.StrictMode>,
)
