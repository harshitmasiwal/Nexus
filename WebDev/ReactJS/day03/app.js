import React from "react";
import ReactDOM from "react-dom/client";

//now we will use the jsx 

const displayArea = ReactDOM.createRoot(document.getElementById('root'))

// Jsx : it allows us to write the code like html in js also we can use the stlying normally 
// this power we get from the babble which we get in node modules 
// bable converts the js object to the form which is understanded by the react 
//like this -> const paragraph = React.createElement('p', {style : {backgroundColor : 'black' , color : 'white'}} , content )

//babel         => react            => render 

//we can provide it id classname normally 
//style take a object inside {} braces 

const headstyle = { 
    backgroundColor : "black",
    color : "white"
}

//some times this styling is wrtieeen in this format in one line like this 
// style={{backgroundColor:"wheat"}} so its the same 

//and if we want to add the js expression in our html code we can use it inside {//js code or number } 
//this also helps to add the number 

// ex 
const name = "harshit"
const obj = {
    name : "rahul" , 
    age : 248
}


const newElement = ( <>  
    <h1 id="title hai ye"className="this is class " style={headstyle} >Gall {obj.age} kariye payar di {name}!</h1>
     <p money={29}  style={{backgroundColor:"wheat"}} > {2493889} Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum aliquam officia repellendus quo cumque incidunt animi molestias eius, laboriosam soluta nemo fugit obcaecati iste impedit, explicabo veniam dolorum a quasi tempora dolorem alias dicta tenetur. Omnis sit distinctio amet quam perspiciatis et ipsam ducimus porro dolor nulla minima cumque assumenda debitis, dolorem mollitia esse soluta explicabo laboriosam accusantium ad, tempore aliquam. Natus alias laboriosam enim esse! Cum cumque quibusdam enim possimus consectetur. Voluptate dolorem laboriosam, officia at sunt quos eius odit soluta nemo nisi deleniti qui autem ducimus? Unde, ipsum rerum! A beatae praesentium nisi quam illo aperiam minima exercitationem.
    </p>
 </> )

displayArea.render(newElement)


//using reaact components 

function greet(){
    return <h1>hello ji chai pee lo</h1>
}

function meet(){
    return <h1>kuch chatpata hoo jayee</h1>
}

const a = greet() //this will get the <h1>hello ji chai pee lo</h1>
// for rendering 


const displayArea2 = ReactDOM.createRoot(document.getElementById('root2'))
displayArea2.render(meet()) 
// displayArea2.render(<> {a} {meet()} </>) 


const title = <h1 style={{color:'pink' , backgroundColor:'black'}}>this is title</h1>
const para = <p style={{color:'brown' , backgroundColor: 'wheat'}}>befehfefehfhefe hfhejf ejfhehfe jhfjefejfh jehfjehj ehfjehfjke hfjkehfehj hkjf e f kef kejk</p>

const displayArea3 = ReactDOM.createRoot(document.getElementById('root3'))
displayArea3.render(<>
    {title}
    {para}
</>)


