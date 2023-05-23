import shoppingCartReducer from "./slices/home/ProductCart"
import loggedUser  from './slices/auth/Login'
import { configureStore } from "@reduxjs/toolkit"

 const appStore = configureStore(  {
  reducer:{
    shoppingCartReducer:shoppingCartReducer,
    loggedUser:loggedUser
  }
})
export {appStore}
