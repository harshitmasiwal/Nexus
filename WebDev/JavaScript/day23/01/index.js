//acessing all the buttons

// const red = document.getElementById("red")
// const blue = document.getElementById("blue")
// const pink = document.getElementById("pink")
// const green = document.getElementById("green")
// const yellow = document.getElementById("yellow")

// red.addEventListener('click' , ()=>{
//     document.body.style.backgroundColor = red.id
// })
// blue.addEventListener('click' , ()=>{
//     document.body.style.backgroundColor = blue.id
// })
// yellow.addEventListener('click' , ()=>{
//     document.body.style.backgroundColor = yellow.id
// })
// pink.addEventListener('click' , ()=>{
//     document.body.style.backgroundColor = pink.id
// })
// green.addEventListener('click' , ()=>{
//     document.body.style.backgroundColor = green.id
// })




// what if i got 100 colours i cant write this code that times so i can use loop 

// const all_buttons = document.querySelectorAll("div")
// console.log(all_buttons)


// all_buttons.forEach( (btn)=>{
//     console.log(btn)

//     btn.addEventListener('click' , ()=>{
//         document.body.style.backgroundColor = btn.id
//     })

// })


// the above code reduces the code but it is not optimised because for each is acessing all the elements

//more optimised approach is to pack all the btns in a parent and add event listner on the parent 
//which of the child is clicked in parent we can get it easily

const parent = document.getElementById('parent')

parent.addEventListener( 'click' , (event)=>{
    console.log(event.target)
    if(event.target.className == "btn")
    document.body.style.backgroundColor = event.target.id
} )




