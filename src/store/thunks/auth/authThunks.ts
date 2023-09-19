import { createAsyncThunk } from "@reduxjs/toolkit";
import { loggedAdapter } from "../../../pages/authForms/logInForm/adapters/for-logged.adapter";
import RegisterUser from "../../../interfaces/for-Auth";
import { ResponseAuthFromBackEnd, UserLogIn, UserLogged } from "../../../interfaces/for-Auth";
import { setAuthErrorMessage } from "../../slices/globalErrorMessage/forAuthErrorMessage";
import { setForAuthLoaderStatus } from "../../slices/globalErrorMessage/forAuthforLoaderStatus";
import axios ,{AxiosResponse} from "axios";

const BASE_URL= import.meta.env.VITE_BASE_URL;
const config = {
  headers: {
  'Content-Type': 'application/json'
  }
};

export const LoggingRequest = createAsyncThunk (
  "loggingRequest/LoggingRequest",
  async(user: UserLogIn,{dispatch}): Promise<UserLogged> => {
    dispatch(setForAuthLoaderStatus({isFetchingData:true}))
    try {
      const gettingInfo:AxiosResponse<ResponseAuthFromBackEnd> = await axios.post<ResponseAuthFromBackEnd>(
        `${BASE_URL}/auth/logIn`,
        user,
        config
        );
        dispatch(setForAuthLoaderStatus({isFetchingData:false}))
      const adapter = loggedAdapter(gettingInfo.data);
      return adapter
    } catch (err:any) {
      dispatch(setForAuthLoaderStatus({isFetchingData:false}))
      dispatch(setAuthErrorMessage({
        title:`${err.response.data.error}`,
        isError:true,
        duration:5000,
        errorMessage:"",
        errorMessageBold:"",
        severityType:"error"
      }))
      throw ( err.response.data.error)
    }
  }
)
export const RegisterRequest = createAsyncThunk (
  "RegisterRequest/RegisterRequest",
  async(user: RegisterUser,{dispatch}): Promise<UserLogged> => {
    dispatch(setForAuthLoaderStatus({isFetchingData:true}))
    try {
      const gettingInfo:AxiosResponse<ResponseAuthFromBackEnd> = await axios.post<ResponseAuthFromBackEnd>(
        `${BASE_URL}/auth/Register`,
        user,
        config
        );
        dispatch(setForAuthLoaderStatus({isFetchingData:false}))
      const adapter = loggedAdapter(gettingInfo.data);      
      return adapter
    } catch (err:any) {
      dispatch(setForAuthLoaderStatus({isFetchingData:false}))
      dispatch(setAuthErrorMessage({
        title:`${err.response.data.error}`,
        isError:true,
        duration:5000,
        errorMessage:"",
        errorMessageBold:"",
        severityType:"error"
      }))
      throw new Error(`Error en el inicio de sesión ${err}`); 
    }
  }
)