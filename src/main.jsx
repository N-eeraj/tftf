import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import Router from './Router'
import Navbar from '@components/Navbar'

import './style.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Navbar />
    <Router />
  </BrowserRouter>
)