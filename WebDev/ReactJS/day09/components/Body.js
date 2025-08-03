import { useEffect, useState } from "react";

function Body(){

    const [Profiles , setProfiles] = useState([])
    const [Num , setNum] = useState("")
    const [User, setUser] = useState("")

    async function getData(){

        let temp = Math.floor(Math.random()*1000 + 1)
        const response = await fetch(`https://api.github.com/users?since=${temp}&per_page=${Num}`)
        const data = await response.json()
        setProfiles(data)
        console.log(data)
    }

    async function getData2(){

        const response = await fetch(`https://api.github.com/users/${User}`)
        const data = await response.json()
        setProfiles(data)
        console.log(data)
    }

    useEffect(()=>{
        getData();
        getData2();
    },[Num,User])

    

    return (
        <>
        <div className="search"> 
            <input className="inp" type="text" placeholder="enter Name" value={User} onChange={(e)=>{
                setUser(e.target.value)
            }}></input>
            <input className="inp" type="text" placeholder="enter number" value={Num} onChange={(e)=>{
                setNum(e.target.value)
            }}></input>
            <button className="btn" onClick={()=>{
                getData()
            }}>Search</button>
        </div>

        <div className="container">
            {Profiles.map((value)=>{
                return (
                    <div className="card" key={value.id}>
                        
                            <img src={value.avatar_url} className="img" />
                        
                        
                            <h2>Name : {value.login}</h2>
                            <a href={value.html_url} target="_blank">Visit Github</a>
                        
                        
                    </div>
                    
                )
            })}
        </div>
        </>
    )
}

export default Body;