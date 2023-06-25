import { configureStore } from "@reduxjs/toolkit"
import shoppingCartReducer from "./slices/home/ProductCart"
import loggedUser  from './slices/auth/Login'
import globalErrorMessage from "./slices/globalErrorMessage/globalErrorMessage"

 const appStore = configureStore(  {
  reducer:{
    shoppingCartReducer:shoppingCartReducer,
    loggedUser:loggedUser,
    globalErrorMessage:globalErrorMessage
  }
})
export {appStore}
