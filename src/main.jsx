import React from 'react'
import ReactDOM from 'react-dom/client'
import { Helmet } from 'react-helmet';
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Helmet>
        <meta http-equiv="Cross-Origin-Embedder-Policy" content="require-corp" />
        <meta http-equiv="Cross-Origin-Opener-Policy" content="same-origin" />
      </Helmet>
    <App />
  </React.StrictMode>,
)
