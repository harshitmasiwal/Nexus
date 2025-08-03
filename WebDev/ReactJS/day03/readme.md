//we will learn about the initlising of the parcel and using the react 

JSX - it allows us to write the code like html in javascript 
it uses babel inside 
check out the babel -> https://babeljs.io/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&corejs=3.42&spec=false&loose=false&code_lz=DwCwjAfCCmA2sHtgHpwSA&forceAllTransforms=false&modules=false&shippedProposals=false&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env%2Creact%2Cstage-2&prettier=false&targets=&version=7.28.1&externalPlugins=&assumptions=%7B%7D

const ele = <h1>hello</h1> //it uses babel to convert like the under one
const ele =  react.createElement("h1",{} , "hello");   
the above both are same 

and we can render it easily 

//react elements are  -> react mai element kese banate hai 

const newElement = ( <>  
    <h1 id="title hai ye"className="this is class " style={headstyle} >Gall {obj.age} kariye payar di {name}!</h1>
     <p money={29}  style={{backgroundColor:"wheat"}} > {2493889} Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum aliquam officia repellendus quo cumque incidunt animi molestias eius, laboriosam soluta nemo fugit obcaecati iste impedit, explicabo veniam dolorum a quasi tempora dolorem alias dicta tenetur. Omnis sit distinctio amet quam perspiciatis et ipsam ducimus porro dolor nulla minima cumque assumenda debitis, dolorem mollitia esse soluta explicabo laboriosam accusantium ad, tempore aliquam. Natus alias laboriosam enim esse! Cum cumque quibusdam enim possimus consectetur. Voluptate dolorem laboriosam, officia at sunt quos eius odit soluta nemo nisi deleniti qui autem ducimus? Unde, ipsum rerum! A beatae praesentium nisi quam illo aperiam minima exercitationem.
</p>
 </> )


//react component -> react mai function kese likhte hai 

function greet(){
    return <h1>hello ji chai pee lo</h1>
}

function meet(){
    return <h1>kuch chatpata hoo jayee</h1>
}

ye jo bhi return kre wo print karwa sakte hai hum easily 


displayArea2.render(a) 
<!-- or -->
displayArea2.render(meet()) 
<!-- or -->
displayArea2.render(<> {a} {meet()} </>) 
curly braces kuski ye js <></> iske andr nahi likh sakte hai hum 





