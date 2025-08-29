import { configureStore } from "@reduxjs/toolkit";
import slice_1 from "./firstSlice"
import reducer from "./firstSlice";

const S = configureStore(
    {
     reducer :{
        slice1 : slice_1
     }
    }
   
)

export default S