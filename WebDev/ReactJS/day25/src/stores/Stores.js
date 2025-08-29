import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartSlice"
import restaurantReducer from "./ResturantSlice"

const store = configureStore({
    reducer:{
        cartslice:CartReducer,
        restaurants : restaurantReducer
    }
})

export default store