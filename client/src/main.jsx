import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'primeicons/primeicons.css';
import { App } from './App'

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";  

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
