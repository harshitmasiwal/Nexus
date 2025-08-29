import { Outlet } from "react-router";
import RestHeader from "./RestHeader";

export default function SecondHome(){

    return(<>
        <RestHeader></RestHeader>
        <Outlet></Outlet>
    </>)
}