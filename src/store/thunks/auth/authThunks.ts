import { createAsyncThunk } from "@reduxjs/toolkit";
import { loggedAdapter } from "../../../pages/authForms/logInForm/adapters/for-logged.adapter";
import RegisterUser from "../../../interfaces/for-Auth";
import { ResponseAuthFromBackEnd, UserLogIn, UserLogged } from "../../../interfaces/for-Auth";
import { setAuthErrorMessage } from "../../slices/globalErrorMessage/forAuthErrorMessage";
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
    try {
      const gettingInfo:AxiosResponse<ResponseAuthFromBackEnd> = await axios.post<ResponseAuthFromBackEnd>(
        `${BASE_URL}/auth/logIn`,
        user,
        config
        );
      const adapter = loggedAdapter(gettingInfo.data);
      console.log(adapter)
      return adapter
    } catch (err:any) {
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
    try {
      const gettingInfo:AxiosResponse<ResponseAuthFromBackEnd> = await axios.post<ResponseAuthFromBackEnd>(
        `${BASE_URL}/auth/Register`,
        user,
        config
        );
      const adapter = loggedAdapter(gettingInfo.data);
      return adapter
    } catch (err:any) {
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