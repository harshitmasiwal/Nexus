import { createSlice } from "@reduxjs/toolkit";

const createdSlice = createSlice(
    {
        name : "slice_no_1",
        initialState : {count : 0 },
        reducers : {
            Increment : (state)=>{
                return {...state ,  count : state.count+1}
            } , 
            Decrement : (state)=>{
                state.count = state.count - 1 ; 
            } , 
            Reset : (state)=>{
                state.count = 0 ;
            },
            CustomIncrement : (state, actions)=>{
                state.count += actions.payload
            }
        }
    }
)


export const {Increment , Decrement , Reset , CustomIncrement } = createdSlice.actions;
export default createdSlice.reducer ; 