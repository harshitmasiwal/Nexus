//creating a dummy data 

// 1 . img
// 2 . name 
// 3 . rating 
// 4 . food type
// 5 . price for tow 
// 6 . location 
// 7 . distance 
// 8 . offers
// 9 . alchohol servers 
// 10 . open time 
// 11 . close time
const restaurantNames = [ 
  "The Spice Route",
  "Ocean's Delight",
  "The Golden Fork",
  "Urban Tandoor",
  "Mama Mia Pizzeria",
  "Dragon's Wok",
  "Biryani Junction",
  "Burger Town",
  "The Curry Leaf",
  "Heavenly Bites",
  "Saffron Lounge",
  "The Hungry Panda",
  "Grill Master",
  "Royal Feast",
  "Farm to Fork",
  "Taco Fiesta",
  "The Dessert Den",
  "Midnight Munchies",
  "Sizzle & Serve",
  "Noodle Nirvana"
];

const delhiPlaces = [
  "India Gate",
  "Red Fort",
  "Lotus Temple",
  "Akshardham Temple",
  "Qutub Minar",
  "Humayun’s Tomb",
  "Jama Masjid",
  "Raj Ghat",
  "Hauz Khas Village",
  "Connaught Place"
];


const foodTypes = [
  "Indian",
  "Chinese",
  "Italian",
  "Mexican",
  "Thai",
  "American",
  "Japanese",
  "Mediterranean",
  "Korean",
  "Vietnamese",
  "French",
  "Greek",
  "Lebanese",
  "Spanish",
  "Fusion"
];


const allImg = ['Eight','fifth','First','fourth','nine','second','seventh','sixth','tenth','third']
const resturant = []


for(let i = 0 ; i < 100 ; i++){

    const obj = {}
    obj["img"] = allImg[Math.floor(Math.random() * 10)]
    obj["res_name"] = restaurantNames[Math.floor(Math.random() * 20)]
    obj["rating"] = (Math.random()*5).toFixed(1)
    obj["food_type"] = foodTypes[Math.floor(Math.random() * 15)]
    obj["price_2"] = Math.floor(Math.random() * 1000 + 200 )
    obj["loc"] = delhiPlaces[Math.floor(Math.random() *10)]
    obj["distance"] = (Math.random()*7 + 1).toFixed(1)
    obj["offer"] = Math.floor(Math.random()*20 + 5)
    obj["alcohol"] = Math.random() > 0.7
    obj["opening_time"] = Math.floor(Math.random() * 24)
    obj["closing_time"] = (obj["opening_time"] + 12)%24

    resturant.push(obj)
}

console.log(resturant)

const data = JSON.stringify(resturant , null , 2 )
console.log(data)

const fs = require('fs');
fs.writeFileSync('restaurants.json', data , 'utf-8');
console.log("data genrated sucessfully")