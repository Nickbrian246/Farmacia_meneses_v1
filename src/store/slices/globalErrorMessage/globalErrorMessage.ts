import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AlertColor = 'success' | 'info' | 'warning' | 'error';
interface InitialState{
  isError:boolean,
  severityType:AlertColor,
  title:string,
  errorMessage:string,
  errorMessageBold:string,
  duration?:number | null
}

const initialState:InitialState = {
  isError:false,
  severityType:"error",
  title:"",
  errorMessage:"",
  errorMessageBold:"",
  duration:null
}

export const globalErrorMessage = createSlice({
  name:"globalErrorMessage",
  initialState,
  reducers:{
    setErrorMessage:(state,action:PayloadAction<InitialState>) =>{
      return  action.payload
    }
  }
})

export default globalErrorMessage.reducer

export const {
  setErrorMessage
} = globalErrorMessage.actions