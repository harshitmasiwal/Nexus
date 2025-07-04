const q = document.getElementById("text")

const quotes = [
  "Believe you can and you're halfway there.",
  "Your time is limited, don't waste it living someone else's life.",
  "The only way to do great work is to love what you do.",
  "Dream big and dare to fail.",
  "It always seems impossible until it's done.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Don't watch the clock; do what it does. Keep going.",
  "You miss 100% of the shots you don't take.",
  "Start where you are. Use what you have. Do what you can.",
  "Failure is simply the opportunity to begin again, this time more intelligently.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Don’t wait. The time will never be just right.",
  "Opportunities don't happen. You create them.",
  "Everything you’ve ever wanted is on the other side of fear.",
  "The harder you work for something, the greater you’ll feel when you achieve it.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
  "Success doesn’t just find you. You have to go out and get it.",
  "The key to success is to focus on goals, not obstacles.",
  "Don’t stop when you’re tired. Stop when you’re done.",
  "Little things make big days.",
  "It's going to be hard, but hard does not mean impossible.",
  "Don’t limit your challenges. Challenge your limits.",
  "Do something today that your future self will thank you for.",
  "If you’re going through hell, keep going.",
  "Doubt kills more dreams than failure ever will.",
  "Work hard in silence, let success make the noise.",
  "Success is what comes after you stop making excuses.",
  "Wake up with determination. Go to bed with satisfaction.",
  "Sometimes we’re tested not to show our weaknesses, but to discover our strengths.",
  "The struggle you’re in today is developing the strength you need for tomorrow.",
  "Be stronger than your excuses.",
  "Don’t wish it were easier. Wish you were better.",
  "Act as if what you do makes a difference. It does.",
  "You are never too old to set another goal or to dream a new dream.",
  "Hustle in silence and let your success make the noise.",
  "Small progress is still progress.",
  "Discipline is the bridge between goals and accomplishment.",
  "Your limitation—it's only your imagination.",
  "Sometimes later becomes never. Do it now.",
  "The way to get started is to quit talking and begin doing.",
  "Don’t be pushed around by the fears in your mind. Be led by the dreams in your heart.",
  "Magic is believing in yourself. If you can do that, you can make anything happen.",
  "Success is not how high you have climbed, but how you make a positive difference to the world.",
  "Hard work beats talent when talent doesn’t work hard.",
  "Stay away from those people who try to disparage your ambitions.",
  "Happiness is not something ready-made. It comes from your own actions.",
  "Action is the foundational key to all success.",
  "A year from now you may wish you had started today."
];


function setquote(){
    q.innerHTML = quotes[Math.floor(Math.random()*50)]
} 

// now i want to change the quote on clicking of btn 

const button = document.getElementById("btn")
button.addEventListener("click" , setquote)
// document.addEventListener("keydown" , setquote) whenever the keyboard is pressed 

// button.addEventListener("pointerover" , setquote) mouse hover

// button.addEventListener("dblclick" , setquote) double click


//want to acess the what key is pressed by the user 

// document.addEventListener("keydown" , (event_obj)=> {
//   console.log(event_obj) //the event obj has the complete info about the event
//   console.log(event_obj.key)
// })

//addding the quote change whenever the enter key is pressed
 
document.addEventListener("keydown" , (event)=>{
  console.log(event.key)
  if(event.key === "Enter"){
    setquote();
  }
})

