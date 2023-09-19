import { configureStore } from "@reduxjs/toolkit"
import shoppingCartReducer from "./slices/home/ProductCart"
import loggedUser  from './slices/auth/Login'
import globalErrorMessage from "./slices/globalErrorMessage/globalErrorMessage";
import authErrorMessage from "./slices/globalErrorMessage/forAuthErrorMessage";
import forAuthforLoaderStatus from "./slices/globalErrorMessage/forAuthforLoaderStatus";

const appStore = configureStore(  {
  reducer:{
    shoppingCartReducer:shoppingCartReducer,
    loggedUser:loggedUser,
    globalErrorMessage:globalErrorMessage,
    authErrorMessage:authErrorMessage,
    forAuthforLoaderStatus:forAuthforLoaderStatus
  }
})
export {appStore}
