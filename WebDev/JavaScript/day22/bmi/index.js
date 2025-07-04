
function bmi_Calc(){
const h = document.getElementById("height")
const height = Number(h.value)/100;
const w = document.getElementById("weight")
const weight = Number(w.value);


console.log(height)
console.log(weight)
const bmi = (weight/(height*height)).toFixed(3)
console.log(bmi)

const r = document.getElementById("result")
r.textContent += bmi
}

const btn = document.getElementById("btn")
btn.addEventListener("click" , bmi_Calc)


