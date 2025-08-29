import { createSlice } from "@reduxjs/toolkit";

const createdSlice = createSlice(
    {
        name : "slice_no_1",
        initialState : {count : 0 },
        reducers : {
            Increment : (state)=>{
                state.count = state.count + 1;
            } , 
            Decrement : (state)=>{
                state.count = state.count - 1 ; 
            } , 
            Reset : (state)=>{
                state.count = 0 ;
            }
        }
    }
)

export const {Increment , Decrement , Reset } = createdSlice.actions;
export default createdSlice.reducer ; 