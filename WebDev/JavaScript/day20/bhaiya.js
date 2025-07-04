const timer = document.getElementById("root")


function time(){
    const now = new Date()
    const indianTime = now.toLocaleTimeString()
    timer.innerHTML = indianTime
}

setInterval(time,1000)

timer.style.height = "100vh"
timer.style.fontSize ="200px"
timer.style.display = "flex"
timer.style.justifyContent = "center"
timer.style.alignItems = "center"