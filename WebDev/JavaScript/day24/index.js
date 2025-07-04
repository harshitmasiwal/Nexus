const form = document.querySelector('form')
// console.log(form)

// form.addEventListener('click' , (event)=>{
//     console.log(event.target)
// })

// form.addEventListener('input' , (event)=>{
//     console.log(event.target.value)
// })

//like this we have many ways to listen an event 

// form.addEventListener('submit' , (e)=>{

//     e.preventDefault()

//     const n = document.getElementById("name")
//     console.log(n.value)

//     const genderInp = document.querySelector("input[name='gender']:checked")
//     if(genderInp){
//         console.log(genderInp.value)
//     }else{
//         console.log("gender is empty")
//     }

//     const age = document.getElementById("age")
//     console.log(age.value)

//     const country = document.getElementById("country")
//     console.log(country.value)

//     const ans = document.getElementById("result")
//     ans.innerHTML= `name : ${n.value} <br> gender : ${genderInp.value} <br> age : ${age.value}  <br> country : ${country.value}`

// })

// easy way to do this stuff is by using formData object 

form.addEventListener('submit' , (e)=>{

    e.preventDefault()

    const data = new FormData(form)
    // console.log(Array.from(data.keys()))
    // console.log(Array.from(data.values()))

    //itreating using for of loop

    for(let [key,value] of data.entries()){
        console.log(key,value)
    }
})




