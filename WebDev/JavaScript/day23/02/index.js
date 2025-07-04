const child = document.getElementById('child')
const parent = document.getElementById('parent')
const grand = document.getElementById('grand')

// child.addEventListener( 'click' ,()=>{
//     console.log("child shot")
// })
// parent.addEventListener( 'click' ,()=>{
//     console.log("parent shot")
// })
// grand.addEventListener( 'click', ()=>{
//     console.log("grand parent shot")
// })


//we can obsersve when we click on the child it triggers the outer elements which is like a bubble comes out , we can change the bubble to capture so it reverses its direction using 

// child.addEventListener( action , callback fun , event capture(boolen value) )

// child.addEventListener( 'click' ,()=>{
//     console.log("child shot")
// } , true)
// parent.addEventListener( 'click' ,()=>{
//     console.log("parent shot")
// } , true)
// grand.addEventListener( 'click', ()=>{
//     console.log("grand parent shot")
// } , true)


//now if i click the child i got 

// grand parent shot
// parent shot
// child shot


//if i want to stop these propogation i can just doo 

child.addEventListener( 'click' ,(event)=>{
    console.log(event.currentTarget)
    // console.log(event.target)
    console.log("child shot")
    event.stopPropagation()
})
parent.addEventListener( 'click' ,(event)=>{
    // console.log(event.target)
    console.log(event.currentTarget)

    console.log("parent shot")
    event.stopPropagation()
})
grand.addEventListener( 'click', (event)=>{
    // console.log(event.target)
    console.log(event.currentTarget)
    console.log("grand parent shot")
    event.stopPropagation()
})


// event.stopPropagation() //stops the propogation of event bubble/capture