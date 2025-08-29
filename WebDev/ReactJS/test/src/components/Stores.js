import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartSlice"

const store = configureStore({
    reducer:{
        cartslice:CartReducer,
    }
})

export default store