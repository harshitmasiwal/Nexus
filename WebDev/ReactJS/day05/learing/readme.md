module and components both are same 

these are the imports which we are making in our code
iski help se code ko alg alg parts mai break karte hai 

react ka koi rule nahi hai as it is library not a framework 
but hum ek alg folder banakr usme daal denge sare components ko just for good structure

the code of component which is present in diffrent file we have to export from that file 
only then we can import it

ex : 

Footerr.js file

export default function Footer(){
    return (
        <div className="footer">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLx81ATRb3oDmk61WRTW1VTgUhI3y0X5Ib3g&s" width="1200px" height="200px" / >
        </div>
    )
}

put the export default 
and then import  it in the file where u are going to use it 

by 
import Footer from "./components/Header"


also we can use 
function Footer(){
    return (
        <div className="footer">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLx81ATRb3oDmk61WRTW1VTgUhI3y0X5Ib3g&s" width="1200px" height="200px" / >
        </div>
    )
}
export default Footer;

like this 

also we can use any extention of the file jsx or js both are vaild


we can also store the data like this 

ek file mai ek hi export default ho sakta hai 
if hmko multiple export karwane hai 

dummy file mai 
export function greet(){
    console.log("hello")
}

export function meet(){
    console.log("hello")
}

main file 
import { greet , meet } from "./utils/dummydata";

aur name change karne ke liyee component ka use "as" keyword 

import Header as Yourname from "./components/Header";


