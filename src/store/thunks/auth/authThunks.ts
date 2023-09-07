import { createAsyncThunk } from "@reduxjs/toolkit";
import { loggedAdapter } from "../../../pages/authForms/logInForm/adapters/for-logged.adapter";
import RegisterUser from "../../../interfaces/for-Auth";
import { ResponseAuthFromBackEnd, UserLogIn, UserLogged } from "../../../interfaces/for-Auth";
import axios ,{AxiosResponse} from "axios";
const BASE_URL= import.meta.env.VITE_BASE_URL;
const config = {
  headers: {
  'Content-Type': 'application/json'
  }
};

export const LoggingRequest = createAsyncThunk (
  "loggingRequest/LoggingRequest",
  async(user: UserLogIn): Promise<UserLogged> => {
    try {
      const gettingInfo:AxiosResponse<ResponseAuthFromBackEnd> = await axios.post<ResponseAuthFromBackEnd>(
        `${BASE_URL}/auth/logIn`,
        user,
        config
        );
      const adapter = loggedAdapter(gettingInfo.data);
      console.log(adapter)
      return adapter
    } catch (error) {
      console.log(error);
      throw new Error(`Error en el inicio de sesión ${error}`); 
    }
  }
)
export const RegisterRequest = createAsyncThunk (
  "RegisterRequest/RegisterRequest",
  async(user: RegisterUser): Promise<UserLogged> => {
    try {
      const gettingInfo:AxiosResponse<ResponseAuthFromBackEnd> = await axios.post<ResponseAuthFromBackEnd>(
        `${BASE_URL}/auth/Register`,
        user,
        config
        );
      const adapter = loggedAdapter(gettingInfo.data);
      return adapter
    } catch (error) {
      console.log(error);
      throw new Error(`Error en el inicio de sesión ${error}`); 
    }
  }
)