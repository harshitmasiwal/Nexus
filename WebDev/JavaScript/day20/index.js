//acess all the ids 
// hour , min , sec , am , day , date 

const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const Months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

// const d = new Date();
// let hour = d.getHours();
// let minutes = d.getMinutes();
// let seconds = d.getSeconds();
// let day = d.getDay()
// let date = d.getDate()
// let month = d.getMonth()
// let year = d.getFullYear()




setInterval( ()=> {

    const d = new Date()
    let hour = d.getHours()
    let minutes = d.getMinutes()
    let seconds = d.getSeconds()
    let day = d.getDay()
    let date = d.getDate()
    let month = d.getMonth()
    let year = d.getFullYear()

    // console.log(hour , minutes , seconds , day , date , month, year)

    document.getElementById("hour").innerHTML = hour
    document.getElementById("min").innerHTML = minutes
    document.getElementById("sec").innerHTML = seconds
    document.getElementById("meredian").innerHTML = (hour >= 12) ? "pm" : "am"
    document.getElementById("currday").innerHTML = days[day]
    document.getElementById("currdate").innerHTML =  `${date}-${Months[month]}-${year}`


} , 1000)


