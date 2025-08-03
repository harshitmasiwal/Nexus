body 

import { useCallback, useEffect, useState } from "react";
import Error from "./Error";

function Body() {

  const [Profiles, setProfiles] = useState([]);
  const [msg , setMsg] = useState([]); 
  const [num , setNum] = useState(0)


  const getData = useCallback( async()=>{
    
      let temp = Math.floor(Math.random() * 1000 + 1);
      const response = await fetch(
        `https://api.github.com/users?since=${temp}per_page=${num}`
      );
      
        if(response.status === 200){
        const data = await response.json();
        setProfiles(data);
      }
      else{
         const data = await response.json();
         setMsg(data || "internet ")
      }
      
  } , [num])

  useEffect(() => {
    getData();
  }, []);

  if(msg.length === 0){
    return (
    
    <>
     <div>
                <input type="text" placeholder="input no.of user" value={num} onChange={(e)=>{
                    if(!isNaN(e.target.value)){
                        setNum(e.target.value)
                    }
                }} ></input>
                <button onClick={()=>{
                    getData()
                }}>search</button>
             </div>
    <div className="container">
      {Profiles.map((value) => {
        return (
          <div className="card" key={value.id}>
            <img src={value.avatar_url} className="img" />

            <h2>Name : {value.login}</h2>
            <a href={value.html_url} target="_blank">
              Visit Github
            </a>
          </div>
        );
      })}
    </div>
    </>
  );
  }
  else{
    return (<Error show={msg}></Error>)
  }

  
}

export default Body;



error.js

function Error({show}){
    console.log(show)
    return (<div  className="error" >
      <h3>Something went wrong!</h3>
       <p>{show.message }</p>
    </div>)
}

export default Error