


document.querySelector('button').addEventListener("click" , ()=>{

    const loc = document.getElementById('location').value
    const data = fetch(`http://api.weatherapi.com/v1/current.json?key=38e009608bb3440681f160530250207&q=${loc}&aqi=no`)

    data.then(res => res.json()).then(finalData => printTemp(finalData,loc))

})

function printTemp(data,loc){

    console.log(data.current.temp_c)
    document.querySelector("#weatherInfo").innerHTML = `today's temp in ${loc} is ${data.current.temp_c} C`

}