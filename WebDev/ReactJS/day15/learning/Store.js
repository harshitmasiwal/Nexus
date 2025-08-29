import { configureStore } from "@reduxjs/toolkit";
import Slice_1_Reducer from "./Slicer1";

const stores = configureStore(
    {
        reducer : {
            slice1 : Slice_1_Reducer,
        }
    }
)

export default stores;