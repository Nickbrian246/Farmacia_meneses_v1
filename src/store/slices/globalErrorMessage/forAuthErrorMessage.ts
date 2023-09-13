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
    duration:null,
}

export const authErrorMessage = createSlice({
    name:"authErrorMessage",
    initialState,
    reducers:{
        setAuthErrorMessage: (state, action: PayloadAction<InitialState>) => {
            return action.payload;
        }
        
    }
})

export default authErrorMessage.reducer

export const {
    setAuthErrorMessage
} = authErrorMessage.actions