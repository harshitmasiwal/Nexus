const color = ['blue','red','pink','green','yellow','orange','purple']
const msg = ['hi','hello','hola','shh','sm']


document.addEventListener("click" , (event)=>{

const circle = document.createElement("div")
circle.setAttribute('class',"circle")

circle.innerText = msg[Math.floor(Math.random() * msg.length)]

circle.style.backgroundColor = color[Math.floor(Math.random() * color.length)]

const x = event.clientX
const y = event.clientY

circle.style.top = `${y-50}px`
circle.style.left = `${x-50}px`

document.body.appendChild(circle)
setTimeout(()=> {
    circle.remove()
} , 5000)

    
})

