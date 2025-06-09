import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'

import './sass/admin/normalize.css'
import './sass/admin/styles.scss'

import './sass/client/normalize.css'
import './sass/client/styles.scss'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
