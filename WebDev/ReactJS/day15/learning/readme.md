use selector do the task of the usestate hook -> it listens everytime if the state is changed or udated then it re-renders the app 
the store object has subscribe key which makes this possible 

actions bata deta hai wo function kis slice ka part hai 
as isme do chize hoti hai 
payload: undefined , type: "slice_no_1/Increment"

payload mai ham argument bhej sakte hai function ko and type hme uski slice ka name bata deta hai 


Immer  : naya draft create karta hai
hamare kiye update karta hai kisi bhi object ko like uska naya refrence bana ho 
kyuki hme pta hai if object array mai ham changes karte hai to uska refence same hi rheta hai and hamari re rendering ruk jaati hai 
phele jab immer nahi tha tab code ase likhte the 

 Increment : (state)=>{
                return {...state ,  count : state.count+1}
            } , 