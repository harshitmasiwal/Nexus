import { createSlice } from "@reduxjs/toolkit";

const FoodSlice = createSlice(
    {
        name : "slice_1",
        initialState : {count : 0},
        reducers : {
            AddItem : (state)=>{state.count++},
            RemoveItem : (state)=>{state.count--}
        }
    }
)

export const {AddItem , RemoveItem} = FoodSlice.actions
export default FoodSlice.reducer
