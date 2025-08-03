import React ,  { useEffect, useState } from "react";


function Colorful ({name}){
    const [bgColor , setbgColor] = useState("black")

        console.log(name)
        console.log("render")
        //document.body.style.backgroundColor = bgColor    //ye sirf 2 barr hi rnder karne dega kyuki ye react ki khasyat hai (BAIL OUT KARNA IN REACT)
    
        //aur 2 baar bhi nahi render karwana hai to use the useEffect hook 
    
        // useEffect(()=>{} , [])
        //ye leta hai ek callback and dependency array 
    
        useEffect( ()=>{
            console.log("use effect executed")
            document.body.style.backgroundColor = bgColor
        },[bgColor]);
        
        
        //after clicking two time u can see the image.png for console
    
        //useeffect wala last mai execute hota hai - > aur sirf first time cahlta hai ya to firr jab dependency change hoti hai tab chalta hai aur
        //  agr dependecy [] hai too sirf first tme chalta hai then kabhi nahi chalta 
        
    
        console.log("second part")
    
        return (<>
        <div className="box">
            <h1>Background Changer</h1>
            <div className="options">
                <button className="btn" onClick={()=>setbgColor("red")}>Red</button>
                <button className="btn" onClick={(()=>setbgColor("blue"))}>Blue</button>
                <button className="btn" onClick={(()=>setbgColor("pink"))}>Pink</button>
                <button className="btn" onClick={(()=>setbgColor("orange"))}>Orange</button>
                <button className="btn" onClick={(()=>setbgColor("purple"))}>Purple</button>
            </div>
        </div>
        </>)
}

export default React.memo(Colorful)