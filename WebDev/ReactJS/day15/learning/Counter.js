import { useDispatch, useSelector } from "react-redux"
import { Increment , Decrement , Reset } from "./Slicer1"
import stores from "./Store"

export default function Counter(){

    const count = useSelector( (store)=>store.slice1.count )

    // the state we used above STATE/STORE/Give any name to it-  looks like this
    // const state = {
    //     slice1 : {
    //         count : 0
    //     },
    //     slice2 : {
    //         name : "tempppp"
    //     },
    //     slice3 : {
    //         roll : "djdede"
    //     }
    // }
    const dispatch = useDispatch()

    console.log(Increment())
    console.log(Decrement())

    return (
        <>
            <div>
                <h1>The count is : {count}</h1>
                <button onClick={()=>dispatch(Increment())}>Increment</button>
                <button onClick={()=>dispatch(Decrement())}>Decrement</button>
                <button onClick={()=>dispatch(Reset())}>Reset</button>
            </div>
        </>
    )
}