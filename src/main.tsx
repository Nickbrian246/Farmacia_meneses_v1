import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import {configureStore} from "@reduxjs/toolkit"
import { Provider } from 'react-redux'
import shoppingCartReducer from "./store/slices/home/ProductCart"

const store = configureStore(  {
  reducer:{
    shoppingCartReducer:shoppingCartReducer
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
)
