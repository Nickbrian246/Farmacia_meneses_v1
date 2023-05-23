import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { LoggingRequest, RegisterRequest } from "../../thunks/auth/authThunks";
import { clearLocalStorage,persisLocalStorage } from "../../../utils";

interface LoggedUser {
  name:string,
  id:string
}

const initialState= {
  name:"",
  token:""
}

export const loggedUser = createSlice({
  name:"loggedUser",
  initialState:localStorage.getItem('User') ? JSON.parse(localStorage.getItem('User') as string) : initialState,
  reducers:{
    loginUser:(state,action: PayloadAction<LoggedUser>) => {
      return action.payload
    },
    logOutUser:() => {
      clearLocalStorage("User")
      return initialState
    },
  },
  extraReducers:(builder) => {
    builder
    .addCase(LoggingRequest.fulfilled, (state, action) => {
      let dataForLocalStorage= {
        name:action.payload.name,
        token:action.payload.token,
      }
      persisLocalStorage("User",dataForLocalStorage)
      state.token= action.payload.token,
      state.name=action.payload.name
    })
    .addCase(RegisterRequest.fulfilled, (state, action) => {
      let dataForLocalStorage= {
        name:action.payload.name,
        token:action.payload.token
      }
      persisLocalStorage("User",dataForLocalStorage)
      state.token= action.payload.token
      state.name=action.payload.name
    })
  }
})

export default loggedUser.reducer

export const {
  loginUser,
  logOutUser,
}= loggedUser.actions