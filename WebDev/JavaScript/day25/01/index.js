const questions = [
  {
    question: "What is the name of Indian national bird?",
    options: ["peacock", "flamingo", "pigeon", "crow"],
    answer: "peacock"
  },
  {
    question: "What is the capital of India?",
    options: ["Mumbai", "Kolkata", "New Delhi", "Chennai"],
    answer: "New Delhi"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars"
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["O2", "H2O", "CO2", "NaCl"],
    answer: "H2O"
  },
  {
    question: "Who wrote the national anthem of India?",
    options: ["Rabindranath Tagore", "Bankim Chandra", "Mahatma Gandhi", "Sarojini Naidu"],
    answer: "Rabindranath Tagore"
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    answer: "Carbon Dioxide"
  },
  {
    question: "What is the largest organ of the human body?",
    options: ["Heart", "Skin", "Lungs", "Brain"],
    answer: "Skin"
  },
  {
    question: "Which is the longest river in the world?",
    options: ["Nile", "Amazon", "Ganga", "Yangtze"],
    answer: "Nile"
  },
  {
    question: "Who was the first Prime Minister of India?",
    options: ["Jawaharlal Nehru", "Gandhi", "Indira Gandhi", "Rajiv Gandhi"],
    answer: "Jawaharlal Nehru"
  },
  {
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    answer: "2"
  },
  {
    question: "Which continent is the largest by area?",
    options: ["Africa", "Asia", "Europe", "Australia"],
    answer: "Asia"
  },
  {
    question: "What do bees produce?",
    options: ["Milk", "Wax", "Honey", "Butter"],
    answer: "Honey"
  },
  {
    question: "Which part of the plant conducts photosynthesis?",
    options: ["Root", "Stem", "Flower", "Leaf"],
    answer: "Leaf"
  },
  {
    question: "Who invented the light bulb?",
    options: ["Edison", "Tesla", "Newton", "Einstein"],
    answer: "Edison"
  },
  {
    question: "Which instrument is used to measure temperature?",
    options: ["Barometer", "Thermometer", "Hygrometer", "Altimeter"],
    answer: "Thermometer"
  },
  {
    question: "What is the hardest natural substance?",
    options: ["Gold", "Iron", "Diamond", "Silver"],
    answer: "Diamond"
  },
  {
    question: "Which animal is known as the Ship of the Desert?",
    options: ["Horse", "Camel", "Donkey", "Elephant"],
    answer: "Camel"
  },
  {
    question: "How many legs does a spider have?",
    options: ["6", "8", "10", "12"],
    answer: "8"
  },
  {
    question: "What is the currency of Japan?",
    options: ["Yuan", "Won", "Yen", "Dollar"],
    answer: "Yen"
  },
  {
    question: "Which ocean is the largest?",
    options: ["Indian", "Atlantic", "Arctic", "Pacific"],
    answer: "Pacific"
  },
  {
    question: "Which bird can mimic human speech?",
    options: ["Crow", "Sparrow", "Parrot", "Owl"],
    answer: "Parrot"
  },
  {
    question: "What is the boiling point of water?",
    options: ["50°C", "100°C", "150°C", "200°C"],
    answer: "100°C"
  },
  {
    question: "What is the national sport of India?",
    options: ["Cricket", "Football", "Hockey", "Kabaddi"],
    answer: "Hockey"
  },
  {
    question: "Who discovered gravity?",
    options: ["Newton", "Galileo", "Einstein", "Faraday"],
    answer: "Newton"
  },
  {
    question: "Which is the tallest mountain in the world?",
    options: ["K2", "Kanchenjunga", "Mount Everest", "Nanda Devi"],
    answer: "Mount Everest"
  },
  {
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    answer: "7"
  },
  {
    question: "Which animal is known for its humps?",
    options: ["Elephant", "Camel", "Horse", "Lion"],
    answer: "Camel"
  },
  {
    question: "What is the name of our galaxy?",
    options: ["Milky Way", "Andromeda", "Solar System", "Orion"],
    answer: "Milky Way"
  },
  {
    question: "Which color absorbs the most heat?",
    options: ["White", "Blue", "Red", "Black"],
    answer: "Black"
  },
  {
    question: "What is the process by which plants make food?",
    options: ["Respiration", "Digestion", "Photosynthesis", "Transpiration"],
    answer: "Photosynthesis"
  },
  {
    question: "Which gas is essential for breathing?",
    options: ["Hydrogen", "Oxygen", "Carbon Dioxide", "Nitrogen"],
    answer: "Oxygen"
  },
  {
    question: "Which festival is known as the festival of lights?",
    options: ["Holi", "Eid", "Diwali", "Navratri"],
    answer: "Diwali"
  },
  {
    question: "Which fruit is known as the king of fruits?",
    options: ["Apple", "Banana", "Mango", "Orange"],
    answer: "Mango"
  },
  {
    question: "Which Indian city is known as the Pink City?",
    options: ["Delhi", "Jaipur", "Udaipur", "Agra"],
    answer: "Jaipur"
  },
  {
    question: "Who is known as the Father of the Nation in India?",
    options: ["Nehru", "Subhash Chandra Bose", "Mahatma Gandhi", "Ambedkar"],
    answer: "Mahatma Gandhi"
  },
  {
    question: "Which metal is liquid at room temperature?",
    options: ["Gold", "Iron", "Mercury", "Aluminum"],
    answer: "Mercury"
  },
  {
    question: "Which part of the body helps in breathing?",
    options: ["Heart", "Lungs", "Kidney", "Liver"],
    answer: "Lungs"
  },
  {
    question: "Which sense organ helps us to hear?",
    options: ["Eyes", "Nose", "Ears", "Skin"],
    answer: "Ears"
  },
  {
    question: "Which animal is the largest mammal?",
    options: ["Elephant", "Whale", "Giraffe", "Hippopotamus"],
    answer: "Whale"
  },
  {
    question: "Which vitamin is gained from sunlight?",
    options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
    answer: "Vitamin D"
  },
  {
    question: "Which is the nearest planet to the Sun?",
    options: ["Venus", "Earth", "Mercury", "Mars"],
    answer: "Mercury"
  },
  {
    question: "Which day is celebrated as Independence Day in India?",
    options: ["15th January", "26th January", "15th August", "2nd October"],
    answer: "15th August"
  },
  {
    question: "Which instrument is used to see tiny objects?",
    options: ["Telescope", "Microscope", "Periscope", "Binoculars"],
    answer: "Microscope"
  },
  {
    question: "What is the color of blood?",
    options: ["Blue", "Red", "Yellow", "Green"],
    answer: "Red"
  },
  {
    question: "What is the name of our Earth’s natural satellite?",
    options: ["Moon", "Mars", "Sun", "Comet"],
    answer: "Moon"
  },
  {
    question: "Which flower is the national flower of India?",
    options: ["Rose", "Lily", "Lotus", "Sunflower"],
    answer: "Lotus"
  },
  {
    question: "Which month has 28 days in a leap year?",
    options: ["January", "February", "March", "April"],
    answer: "February"
  },
  {
    question: "Which is the fastest land animal?",
    options: ["Tiger", "Horse", "Lion", "Cheetah"],
    answer: "Cheetah"
  },
  {
    question: "What do we call a baby cat?",
    options: ["Puppy", "Kitten", "Cub", "Calf"],
    answer: "Kitten"
  },
  {
    question: "Which Indian festival celebrates colors?",
    options: ["Diwali", "Eid", "Holi", "Raksha Bandhan"],
    answer: "Holi"
  }
];


//now i have to select 10 random questions from this array of question object

function questionSelector(){

    // const ques = new Set() //it can only hold unique indexes

    // while(ques.size != 10){
    //     const idx = Math.floor(Math.random() * questions.length)
    //     ques.add(idx)
    // }
    
    // return [...ques] //convert the set into array
    
    //another approach with less complexity 


    const ques = []
    let length = questions.length

    while(ques.length != 10){

        const idx = Math.floor(Math.random() * questions.length) 
        
        //swaping of questions 
        let temp = questions[idx]
        questions[idx] = questions[length-1]
        questions[length-1] = temp

        ques.push(questions[length-1])
        length--

    }
    return ques
}

const final_question = questionSelector()
console.log(final_question)
const form = document.getElementById("quizForm")
const btn = document.getElementById("btn")

const orignal_ans = {}


final_question.forEach( (obj , idx)=> {   

    // console.log(questions[obj].question)

    const ques_div = document.createElement("div")
    ques_div.className = "question"

    orignal_ans[`q${idx+1}`] = final_question[idx].answer

    const para = document.createElement("p")
    para.innerHTML = `${idx+1}.${final_question[idx].question}`
    ques_div.appendChild(para)
    //create 4 options 

    final_question[idx].options.forEach( (option)=>{
        const label = document.createElement("label")
        const input = document.createElement("input")
        const text = document.createTextNode(option)

        input.type = "radio"
        input.name = `q${idx+1}`
        input.value = `${option}`

        label.appendChild(input)
        label.appendChild(text)
        ques_div.appendChild(label)
        ques_div.appendChild(document.createElement("br"))

        // console.log(ques_div)
    })

    
    form.insertBefore(ques_div,btn)

})

console.log(orignal_ans)

form.addEventListener("submit" , (event)=> {

    let marks = 0 
    event.preventDefault()

    const ans_data = new FormData(form)
    
    for( let [key,value] of ans_data.entries()){
        // console.log(key,value) 
        if(orignal_ans[key] == value){
            marks++
        }
    }

    // console.log(marks)

    const result = document.getElementById("out")  
    result.innerHTML = `${marks} answers out of 10 are correct`
})


const reload = document.getElementById("reload")

reload.addEventListener( 'click' , ()=>{
  location.reload()
})






