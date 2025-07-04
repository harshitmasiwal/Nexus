console.log("hello")

setInterval(()=>{
    document.getElementById("title1").innerHTML = "changed title after 10 seconds "
    document.getElementById("title2").style.backgroundColor = "red"
} , 10000)