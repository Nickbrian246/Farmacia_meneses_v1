import axios, { AxiosResponse } from "axios";
import { ResponseAuthFromBackEnd, UserLogIn } from "../../../../interfaces/for-Auth";
import { loggedAdapter } from "../adapters/for-logged.adapter";
import { UserFromBackEnd,UserLogged } from "../../../../interfaces/for-Auth";


const BASE_URL=import.meta.env.VITE_BASE_URL

const config = {
  headers: {
  'Content-Type': 'application/json'
  }
};


const loginRequest = async (user: UserLogIn): Promise<UserLogged> => {
  try {
    console.log(user);
    
    const gettingInfo: AxiosResponse<ResponseAuthFromBackEnd> = await axios.post<ResponseAuthFromBackEnd>(`http://localhost:3000/apiV2/auth/logIn`,user,config);
    console.log(gettingInfo.data);
    const adapter = loggedAdapter(gettingInfo.data);
  
    
    return adapter;
  } catch (error) {
    console.log(error);
    throw new Error(`Error en el inicio de sesión ${error}`); 
  }
};
export {loginRequest}