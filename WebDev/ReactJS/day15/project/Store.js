import { configureStore } from "@reduxjs/toolkit";
import Slice_1 from "./Slice1";

const Store = configureStore(
    {
        reducer : {
            slice1 : Slice_1
        }
    }
)

export default Store