import React from "react";
import ReactDOM from "react-dom/client"

const element = <h1>I am the hero</h1>

const obj = {"name" : "harshit"}

const arr = [12,"mr","masiwal",100]


const display = ReactDOM.createRoot(document.getElementById('root'))
display.render(<> {element} 
{/* {obj} //cant do this as the jsx only understands the element which are retruing something like string array or can do obj.name also  */}
{obj.name} {arr} //this will work 
{/* {if x < 2 return "hello"} //cant do this also  */} 
</>)

//there is the rule of jsx that the first letter of the function should be capital which is being used by us like this

function Greet(props){
    console.log(props) //props.png
    return <h1>Nameste Mr . {props.name} </h1>
}

// const output = <greet></greet> //this will be invalid in jsx 
const output = <Greet  id="hello" name="Harshit" age={20} ></Greet>

display.render(output)
