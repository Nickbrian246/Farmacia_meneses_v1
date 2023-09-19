import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState{
    isFetchingData :boolean
}

const initialState:InitialState = {
    isFetchingData:false
}

export const forAuthLoaderStatus = createSlice({
    name:"forAuthLoaderStatus",
    initialState,
    reducers:{
        setForAuthLoaderStatus: (state, action: PayloadAction<InitialState>) => {
            return action.payload;
        }
        
    }
})

export default forAuthLoaderStatus.reducer

export const {
    setForAuthLoaderStatus
} = forAuthLoaderStatus.actions