const resturants = [
  {
    "img": "Eight",
    "res_name": "The Dessert Den",
    "rating": "0.2",
    "food_type": "Greek",
    "price_2": 1079,
    "loc": "Qutub Minar",
    "distance": "7.7",
    "offer": 5,
    "alcohol": true,
    "opening_time": 15,
    "closing_time": 3
  },
  {
    "img": "third",
    "res_name": "Ocean's Delight",
    "rating": "0.8",
    "food_type": "Spanish",
    "price_2": 1098,
    "loc": "Connaught Place",
    "distance": "3.4",
    "offer": 17,
    "alcohol": false,
    "opening_time": 16,
    "closing_time": 4
  },
  {
    "img": "seventh",
    "res_name": "Biryani Junction",
    "rating": "2.7",
    "food_type": "Thai",
    "price_2": 1177,
    "loc": "Connaught Place",
    "distance": "5.4",
    "offer": 6,
    "alcohol": false,
    "opening_time": 6,
    "closing_time": 18
  },
  {
    "img": "seventh",
    "res_name": "The Dessert Den",
    "rating": "2.9",
    "food_type": "Chinese",
    "price_2": 220,
    "loc": "Connaught Place",
    "distance": "1.8",
    "offer": 23,
    "alcohol": false,
    "opening_time": 8,
    "closing_time": 20
  },
  {
    "img": "sixth",
    "res_name": "Ocean's Delight",
    "rating": "2.8",
    "food_type": "Thai",
    "price_2": 347,
    "loc": "Hauz Khas Village",
    "distance": "5.5",
    "offer": 10,
    "alcohol": true,
    "opening_time": 21,
    "closing_time": 9
  },
  {
    "img": "nine",
    "res_name": "Urban Tandoor",
    "rating": "1.9",
    "food_type": "Thai",
    "price_2": 729,
    "loc": "Humayun’s Tomb",
    "distance": "7.4",
    "offer": 22,
    "alcohol": false,
    "opening_time": 17,
    "closing_time": 5
  },
  {
    "img": "Eight",
    "res_name": "Midnight Munchies",
    "rating": "0.8",
    "food_type": "Greek",
    "price_2": 1124,
    "loc": "Humayun’s Tomb",
    "distance": "6.6",
    "offer": 24,
    "alcohol": false,
    "opening_time": 22,
    "closing_time": 10
  },
  {
    "img": "third",
    "res_name": "Grill Master",
    "rating": "3.6",
    "food_type": "Vietnamese",
    "price_2": 430,
    "loc": "India Gate",
    "distance": "4.2",
    "offer": 6,
    "alcohol": false,
    "opening_time": 5,
    "closing_time": 17
  },
  {
    "img": "third",
    "res_name": "Biryani Junction",
    "rating": "1.0",
    "food_type": "Indian",
    "price_2": 1075,
    "loc": "Hauz Khas Village",
    "distance": "3.0",
    "offer": 5,
    "alcohol": false,
    "opening_time": 18,
    "closing_time": 6
  },
  {
    "img": "seventh",
    "res_name": "Taco Fiesta",
    "rating": "4.6",
    "food_type": "French",
    "price_2": 974,
    "loc": "Red Fort",
    "distance": "5.3",
    "offer": 21,
    "alcohol": false,
    "opening_time": 6,
    "closing_time": 18
  },
  {
    "img": "third",
    "res_name": "Ocean's Delight",
    "rating": "1.2",
    "food_type": "Mexican",
    "price_2": 581,
    "loc": "Hauz Khas Village",
    "distance": "3.8",
    "offer": 15,
    "alcohol": false,
    "opening_time": 4,
    "closing_time": 16
  },
  {
    "img": "nine",
    "res_name": "Royal Feast",
    "rating": "3.9",
    "food_type": "Chinese",
    "price_2": 1039,
    "loc": "Connaught Place",
    "distance": "3.0",
    "offer": 7,
    "alcohol": false,
    "opening_time": 1,
    "closing_time": 13
  },
  {
    "img": "Eight",
    "res_name": "Royal Feast",
    "rating": "0.5",
    "food_type": "Greek",
    "price_2": 656,
    "loc": "Jama Masjid",
    "distance": "5.0",
    "offer": 17,
    "alcohol": false,
    "opening_time": 20,
    "closing_time": 8
  },
  {
    "img": "fourth",
    "res_name": "Farm to Fork",
    "rating": "4.8",
    "food_type": "Lebanese",
    "price_2": 945,
    "loc": "Lotus Temple",
    "distance": "2.0",
    "offer": 17,
    "alcohol": false,
    "opening_time": 19,
    "closing_time": 7
  },
  {
    "img": "Eight",
    "res_name": "Sizzle & Serve",
    "rating": "3.1",
    "food_type": "French",
    "price_2": 523,
    "loc": "India Gate",
    "distance": "5.3",
    "offer": 5,
    "alcohol": true,
    "opening_time": 13,
    "closing_time": 1
  },
  {
    "img": "fourth",
    "res_name": "Saffron Lounge",
    "rating": "1.1",
    "food_type": "Thai",
    "price_2": 820,
    "loc": "Red Fort",
    "distance": "3.2",
    "offer": 14,
    "alcohol": true,
    "opening_time": 12,
    "closing_time": 0
  },
  {
    "img": "tenth",
    "res_name": "The Spice Route",
    "rating": "0.5",
    "food_type": "Mediterranean",
    "price_2": 1155,
    "loc": "Connaught Place",
    "distance": "7.8",
    "offer": 21,
    "alcohol": false,
    "opening_time": 2,
    "closing_time": 14
  },
  {
    "img": "sixth",
    "res_name": "Urban Tandoor",
    "rating": "4.2",
    "food_type": "Indian",
    "price_2": 830,
    "loc": "Qutub Minar",
    "distance": "6.7",
    "offer": 21,
    "alcohol": false,
    "opening_time": 7,
    "closing_time": 19
  },
  {
    "img": "fifth",
    "res_name": "Noodle Nirvana",
    "rating": "4.8",
    "food_type": "Lebanese",
    "price_2": 465,
    "loc": "India Gate",
    "distance": "7.6",
    "offer": 8,
    "alcohol": false,
    "opening_time": 1,
    "closing_time": 13
  },
  {
    "img": "tenth",
    "res_name": "Grill Master",
    "rating": "3.5",
    "food_type": "Chinese",
    "price_2": 874,
    "loc": "Lotus Temple",
    "distance": "6.1",
    "offer": 11,
    "alcohol": false,
    "opening_time": 11,
    "closing_time": 23
  },
  {
    "img": "sixth",
    "res_name": "Noodle Nirvana",
    "rating": "4.3",
    "food_type": "Vietnamese",
    "price_2": 1127,
    "loc": "India Gate",
    "distance": "5.6",
    "offer": 19,
    "alcohol": false,
    "opening_time": 5,
    "closing_time": 17
  },
  {
    "img": "third",
    "res_name": "The Hungry Panda",
    "rating": "3.3",
    "food_type": "Thai",
    "price_2": 1157,
    "loc": "Qutub Minar",
    "distance": "7.2",
    "offer": 6,
    "alcohol": false,
    "opening_time": 0,
    "closing_time": 12
  },
  {
    "img": "tenth",
    "res_name": "Sizzle & Serve",
    "rating": "4.6",
    "food_type": "Japanese",
    "price_2": 366,
    "loc": "Connaught Place",
    "distance": "3.1",
    "offer": 8,
    "alcohol": false,
    "opening_time": 8,
    "closing_time": 20
  },
  {
    "img": "nine",
    "res_name": "Noodle Nirvana",
    "rating": "1.6",
    "food_type": "Korean",
    "price_2": 422,
    "loc": "Red Fort",
    "distance": "2.0",
    "offer": 23,
    "alcohol": false,
    "opening_time": 3,
    "closing_time": 15
  },
  {
    "img": "fourth",
    "res_name": "The Golden Fork",
    "rating": "2.9",
    "food_type": "Greek",
    "price_2": 451,
    "loc": "Hauz Khas Village",
    "distance": "2.4",
    "offer": 14,
    "alcohol": false,
    "opening_time": 0,
    "closing_time": 12
  },
  {
    "img": "seventh",
    "res_name": "Dragon's Wok",
    "rating": "0.8",
    "food_type": "Chinese",
    "price_2": 420,
    "loc": "Raj Ghat",
    "distance": "6.2",
    "offer": 21,
    "alcohol": false,
    "opening_time": 6,
    "closing_time": 18
  },
  {
    "img": "third",
    "res_name": "Heavenly Bites",
    "rating": "1.5",
    "food_type": "American",
    "price_2": 608,
    "loc": "Lotus Temple",
    "distance": "1.2",
    "offer": 11,
    "alcohol": true,
    "opening_time": 19,
    "closing_time": 7
  },
  {
    "img": "sixth",
    "res_name": "Burger Town",
    "rating": "3.4",
    "food_type": "American",
    "price_2": 996,
    "loc": "Connaught Place",
    "distance": "1.3",
    "offer": 10,
    "alcohol": false,
    "opening_time": 1,
    "closing_time": 13
  },
  {
    "img": "tenth",
    "res_name": "The Spice Route",
    "rating": "4.7",
    "food_type": "Mediterranean",
    "price_2": 212,
    "loc": "Qutub Minar",
    "distance": "7.9",
    "offer": 14,
    "alcohol": false,
    "opening_time": 0,
    "closing_time": 12
  },
  {
    "img": "fourth",
    "res_name": "The Hungry Panda",
    "rating": "3.9",
    "food_type": "Indian",
    "price_2": 756,
    "loc": "India Gate",
    "distance": "2.0",
    "offer": 8,
    "alcohol": false,
    "opening_time": 20,
    "closing_time": 8
  },
  {
    "img": "First",
    "res_name": "Taco Fiesta",
    "rating": "1.2",
    "food_type": "Spanish",
    "price_2": 805,
    "loc": "Jama Masjid",
    "distance": "8.0",
    "offer": 20,
    "alcohol": false,
    "opening_time": 12,
    "closing_time": 0
  },
  {
    "img": "Eight",
    "res_name": "Dragon's Wok",
    "rating": "0.2",
    "food_type": "Italian",
    "price_2": 1196,
    "loc": "Akshardham Temple",
    "distance": "7.3",
    "offer": 15,
    "alcohol": true,
    "opening_time": 11,
    "closing_time": 23
  },
  {
    "img": "Eight",
    "res_name": "Saffron Lounge",
    "rating": "2.1",
    "food_type": "French",
    "price_2": 215,
    "loc": "Akshardham Temple",
    "distance": "5.8",
    "offer": 18,
    "alcohol": false,
    "opening_time": 11,
    "closing_time": 23
  },
  {
    "img": "sixth",
    "res_name": "The Golden Fork",
    "rating": "1.1",
    "food_type": "Mexican",
    "price_2": 1013,
    "loc": "Lotus Temple",
    "distance": "1.2",
    "offer": 7,
    "alcohol": false,
    "opening_time": 23,
    "closing_time": 11
  },
  {
    "img": "third",
    "res_name": "Dragon's Wok",
    "rating": "4.7",
    "food_type": "Thai",
    "price_2": 660,
    "loc": "Red Fort",
    "distance": "5.4",
    "offer": 12,
    "alcohol": false,
    "opening_time": 23,
    "closing_time": 11
  },
  {
    "img": "seventh",
    "res_name": "Taco Fiesta",
    "rating": "4.3",
    "food_type": "Mediterranean",
    "price_2": 532,
    "loc": "Red Fort",
    "distance": "5.4",
    "offer": 14,
    "alcohol": true,
    "opening_time": 17,
    "closing_time": 5
  },
  {
    "img": "First",
    "res_name": "The Hungry Panda",
    "rating": "0.8",
    "food_type": "Mexican",
    "price_2": 646,
    "loc": "Hauz Khas Village",
    "distance": "4.2",
    "offer": 14,
    "alcohol": true,
    "opening_time": 22,
    "closing_time": 10
  },
  {
    "img": "fourth",
    "res_name": "Burger Town",
    "rating": "2.5",
    "food_type": "Italian",
    "price_2": 846,
    "loc": "Jama Masjid",
    "distance": "4.0",
    "offer": 21,
    "alcohol": true,
    "opening_time": 1,
    "closing_time": 13
  },
  {
    "img": "seventh",
    "res_name": "The Hungry Panda",
    "rating": "3.5",
    "food_type": "Mexican",
    "price_2": 645,
    "loc": "Connaught Place",
    "distance": "4.6",
    "offer": 20,
    "alcohol": false,
    "opening_time": 19,
    "closing_time": 7
  },
  {
    "img": "First",
    "res_name": "Dragon's Wok",
    "rating": "4.4",
    "food_type": "Japanese",
    "price_2": 1075,
    "loc": "Red Fort",
    "distance": "4.5",
    "offer": 24,
    "alcohol": true,
    "opening_time": 22,
    "closing_time": 10
  },
  {
    "img": "fourth",
    "res_name": "Sizzle & Serve",
    "rating": "0.5",
    "food_type": "Lebanese",
    "price_2": 833,
    "loc": "Qutub Minar",
    "distance": "2.6",
    "offer": 16,
    "alcohol": false,
    "opening_time": 3,
    "closing_time": 15
  },
  {
    "img": "fifth",
    "res_name": "The Dessert Den",
    "rating": "4.4",
    "food_type": "Mediterranean",
    "price_2": 436,
    "loc": "India Gate",
    "distance": "3.1",
    "offer": 5,
    "alcohol": false,
    "opening_time": 7,
    "closing_time": 19
  },
  {
    "img": "tenth",
    "res_name": "Ocean's Delight",
    "rating": "1.3",
    "food_type": "French",
    "price_2": 1147,
    "loc": "Jama Masjid",
    "distance": "1.4",
    "offer": 7,
    "alcohol": false,
    "opening_time": 8,
    "closing_time": 20
  },
  {
    "img": "fifth",
    "res_name": "The Curry Leaf",
    "rating": "1.0",
    "food_type": "Greek",
    "price_2": 940,
    "loc": "Red Fort",
    "distance": "5.3",
    "offer": 15,
    "alcohol": false,
    "opening_time": 1,
    "closing_time": 13
  },
  {
    "img": "third",
    "res_name": "Farm to Fork",
    "rating": "0.2",
    "food_type": "French",
    "price_2": 870,
    "loc": "Humayun’s Tomb",
    "distance": "5.7",
    "offer": 24,
    "alcohol": true,
    "opening_time": 17,
    "closing_time": 5
  },
  {
    "img": "Eight",
    "res_name": "Urban Tandoor",
    "rating": "0.2",
    "food_type": "Vietnamese",
    "price_2": 252,
    "loc": "Red Fort",
    "distance": "5.8",
    "offer": 9,
    "alcohol": false,
    "opening_time": 4,
    "closing_time": 16
  },
  {
    "img": "third",
    "res_name": "The Hungry Panda",
    "rating": "2.6",
    "food_type": "Mexican",
    "price_2": 334,
    "loc": "Akshardham Temple",
    "distance": "1.9",
    "offer": 19,
    "alcohol": false,
    "opening_time": 2,
    "closing_time": 14
  },
  {
    "img": "seventh",
    "res_name": "Midnight Munchies",
    "rating": "4.3",
    "food_type": "Fusion",
    "price_2": 396,
    "loc": "Humayun’s Tomb",
    "distance": "7.3",
    "offer": 6,
    "alcohol": true,
    "opening_time": 1,
    "closing_time": 13
  },
  {
    "img": "second",
    "res_name": "Burger Town",
    "rating": "4.5",
    "food_type": "Chinese",
    "price_2": 264,
    "loc": "Qutub Minar",
    "distance": "5.5",
    "offer": 22,
    "alcohol": true,
    "opening_time": 12,
    "closing_time": 0
  },
  {
    "img": "nine",
    "res_name": "Saffron Lounge",
    "rating": "1.5",
    "food_type": "Korean",
    "price_2": 801,
    "loc": "Red Fort",
    "distance": "6.2",
    "offer": 16,
    "alcohol": false,
    "opening_time": 2,
    "closing_time": 14
  },
  {
    "img": "second",
    "res_name": "Noodle Nirvana",
    "rating": "4.1",
    "food_type": "Korean",
    "price_2": 218,
    "loc": "Raj Ghat",
    "distance": "3.9",
    "offer": 23,
    "alcohol": false,
    "opening_time": 14,
    "closing_time": 2
  },
  {
    "img": "seventh",
    "res_name": "Grill Master",
    "rating": "3.1",
    "food_type": "Fusion",
    "price_2": 618,
    "loc": "Akshardham Temple",
    "distance": "7.2",
    "offer": 10,
    "alcohol": false,
    "opening_time": 16,
    "closing_time": 4
  },
  {
    "img": "fourth",
    "res_name": "The Hungry Panda",
    "rating": "2.2",
    "food_type": "Spanish",
    "price_2": 1160,
    "loc": "Lotus Temple",
    "distance": "4.7",
    "offer": 22,
    "alcohol": true,
    "opening_time": 10,
    "closing_time": 22
  },
  {
    "img": "second",
    "res_name": "Royal Feast",
    "rating": "1.4",
    "food_type": "Greek",
    "price_2": 459,
    "loc": "Connaught Place",
    "distance": "8.0",
    "offer": 10,
    "alcohol": false,
    "opening_time": 15,
    "closing_time": 3
  },
  {
    "img": "tenth",
    "res_name": "The Curry Leaf",
    "rating": "0.7",
    "food_type": "Greek",
    "price_2": 661,
    "loc": "India Gate",
    "distance": "2.1",
    "offer": 5,
    "alcohol": true,
    "opening_time": 19,
    "closing_time": 7
  },
  {
    "img": "third",
    "res_name": "Noodle Nirvana",
    "rating": "4.4",
    "food_type": "Mexican",
    "price_2": 667,
    "loc": "India Gate",
    "distance": "1.5",
    "offer": 6,
    "alcohol": false,
    "opening_time": 20,
    "closing_time": 8
  },
  {
    "img": "Eight",
    "res_name": "The Golden Fork",
    "rating": "4.9",
    "food_type": "Mexican",
    "price_2": 417,
    "loc": "Raj Ghat",
    "distance": "4.1",
    "offer": 20,
    "alcohol": false,
    "opening_time": 11,
    "closing_time": 23
  },
  {
    "img": "tenth",
    "res_name": "Royal Feast",
    "rating": "0.2",
    "food_type": "Fusion",
    "price_2": 566,
    "loc": "Jama Masjid",
    "distance": "5.3",
    "offer": 17,
    "alcohol": false,
    "opening_time": 7,
    "closing_time": 19
  },
  {
    "img": "second",
    "res_name": "Midnight Munchies",
    "rating": "1.6",
    "food_type": "Chinese",
    "price_2": 882,
    "loc": "India Gate",
    "distance": "2.3",
    "offer": 21,
    "alcohol": false,
    "opening_time": 13,
    "closing_time": 1
  },
  {
    "img": "second",
    "res_name": "The Curry Leaf",
    "rating": "0.4",
    "food_type": "Japanese",
    "price_2": 1101,
    "loc": "Connaught Place",
    "distance": "6.7",
    "offer": 16,
    "alcohol": false,
    "opening_time": 4,
    "closing_time": 16
  },
  {
    "img": "third",
    "res_name": "Dragon's Wok",
    "rating": "2.3",
    "food_type": "Spanish",
    "price_2": 1191,
    "loc": "India Gate",
    "distance": "5.9",
    "offer": 16,
    "alcohol": false,
    "opening_time": 10,
    "closing_time": 22
  },
  {
    "img": "sixth",
    "res_name": "The Golden Fork",
    "rating": "1.3",
    "food_type": "Mediterranean",
    "price_2": 282,
    "loc": "Hauz Khas Village",
    "distance": "4.8",
    "offer": 22,
    "alcohol": true,
    "opening_time": 10,
    "closing_time": 22
  },
  {
    "img": "tenth",
    "res_name": "Grill Master",
    "rating": "1.3",
    "food_type": "Chinese",
    "price_2": 955,
    "loc": "Akshardham Temple",
    "distance": "3.7",
    "offer": 13,
    "alcohol": false,
    "opening_time": 12,
    "closing_time": 0
  },
  {
    "img": "seventh",
    "res_name": "The Spice Route",
    "rating": "4.0",
    "food_type": "Japanese",
    "price_2": 1025,
    "loc": "Lotus Temple",
    "distance": "7.9",
    "offer": 12,
    "alcohol": true,
    "opening_time": 5,
    "closing_time": 17
  },
  {
    "img": "fourth",
    "res_name": "The Golden Fork",
    "rating": "4.4",
    "food_type": "Thai",
    "price_2": 243,
    "loc": "Lotus Temple",
    "distance": "1.8",
    "offer": 10,
    "alcohol": true,
    "opening_time": 9,
    "closing_time": 21
  },
  {
    "img": "seventh",
    "res_name": "Noodle Nirvana",
    "rating": "2.7",
    "food_type": "Lebanese",
    "price_2": 486,
    "loc": "Red Fort",
    "distance": "1.5",
    "offer": 13,
    "alcohol": true,
    "opening_time": 11,
    "closing_time": 23
  },
  {
    "img": "nine",
    "res_name": "Midnight Munchies",
    "rating": "0.3",
    "food_type": "American",
    "price_2": 1138,
    "loc": "Hauz Khas Village",
    "distance": "4.9",
    "offer": 9,
    "alcohol": false,
    "opening_time": 7,
    "closing_time": 19
  },
  {
    "img": "third",
    "res_name": "Sizzle & Serve",
    "rating": "4.8",
    "food_type": "Vietnamese",
    "price_2": 957,
    "loc": "Hauz Khas Village",
    "distance": "1.8",
    "offer": 10,
    "alcohol": false,
    "opening_time": 19,
    "closing_time": 7
  },
  {
    "img": "sixth",
    "res_name": "The Dessert Den",
    "rating": "3.7",
    "food_type": "Vietnamese",
    "price_2": 534,
    "loc": "Hauz Khas Village",
    "distance": "7.2",
    "offer": 5,
    "alcohol": false,
    "opening_time": 19,
    "closing_time": 7
  },
  {
    "img": "nine",
    "res_name": "Biryani Junction",
    "rating": "0.9",
    "food_type": "Thai",
    "price_2": 493,
    "loc": "Raj Ghat",
    "distance": "5.9",
    "offer": 11,
    "alcohol": false,
    "opening_time": 5,
    "closing_time": 17
  },
  {
    "img": "sixth",
    "res_name": "The Dessert Den",
    "rating": "0.6",
    "food_type": "Mexican",
    "price_2": 946,
    "loc": "India Gate",
    "distance": "2.0",
    "offer": 13,
    "alcohol": false,
    "opening_time": 4,
    "closing_time": 16
  },
  {
    "img": "seventh",
    "res_name": "Dragon's Wok",
    "rating": "3.7",
    "food_type": "Vietnamese",
    "price_2": 735,
    "loc": "India Gate",
    "distance": "7.1",
    "offer": 13,
    "alcohol": false,
    "opening_time": 22,
    "closing_time": 10
  },
  {
    "img": "Eight",
    "res_name": "Noodle Nirvana",
    "rating": "3.1",
    "food_type": "Korean",
    "price_2": 1053,
    "loc": "Akshardham Temple",
    "distance": "4.9",
    "offer": 17,
    "alcohol": true,
    "opening_time": 0,
    "closing_time": 12
  },
  {
    "img": "First",
    "res_name": "The Curry Leaf",
    "rating": "4.1",
    "food_type": "Mediterranean",
    "price_2": 752,
    "loc": "Akshardham Temple",
    "distance": "4.6",
    "offer": 16,
    "alcohol": true,
    "opening_time": 2,
    "closing_time": 14
  },
  {
    "img": "sixth",
    "res_name": "Urban Tandoor",
    "rating": "3.6",
    "food_type": "Korean",
    "price_2": 1180,
    "loc": "Lotus Temple",
    "distance": "2.7",
    "offer": 19,
    "alcohol": true,
    "opening_time": 19,
    "closing_time": 7
  },
  {
    "img": "sixth",
    "res_name": "Farm to Fork",
    "rating": "0.9",
    "food_type": "Italian",
    "price_2": 342,
    "loc": "Raj Ghat",
    "distance": "2.4",
    "offer": 7,
    "alcohol": false,
    "opening_time": 3,
    "closing_time": 15
  },
  {
    "img": "nine",
    "res_name": "The Hungry Panda",
    "rating": "1.2",
    "food_type": "American",
    "price_2": 614,
    "loc": "Lotus Temple",
    "distance": "1.4",
    "offer": 16,
    "alcohol": true,
    "opening_time": 21,
    "closing_time": 9
  },
  {
    "img": "second",
    "res_name": "Dragon's Wok",
    "rating": "1.5",
    "food_type": "Indian",
    "price_2": 343,
    "loc": "Humayun’s Tomb",
    "distance": "5.8",
    "offer": 16,
    "alcohol": false,
    "opening_time": 5,
    "closing_time": 17
  },
  {
    "img": "seventh",
    "res_name": "Royal Feast",
    "rating": "2.7",
    "food_type": "Italian",
    "price_2": 893,
    "loc": "Jama Masjid",
    "distance": "4.3",
    "offer": 16,
    "alcohol": false,
    "opening_time": 2,
    "closing_time": 14
  },
  {
    "img": "second",
    "res_name": "Dragon's Wok",
    "rating": "1.0",
    "food_type": "Korean",
    "price_2": 987,
    "loc": "Red Fort",
    "distance": "5.2",
    "offer": 23,
    "alcohol": false,
    "opening_time": 0,
    "closing_time": 12
  },
  {
    "img": "tenth",
    "res_name": "Taco Fiesta",
    "rating": "3.3",
    "food_type": "Mexican",
    "price_2": 301,
    "loc": "Raj Ghat",
    "distance": "3.7",
    "offer": 20,
    "alcohol": false,
    "opening_time": 21,
    "closing_time": 9
  },
  {
    "img": "Eight",
    "res_name": "Dragon's Wok",
    "rating": "2.2",
    "food_type": "Japanese",
    "price_2": 932,
    "loc": "Jama Masjid",
    "distance": "6.3",
    "offer": 18,
    "alcohol": false,
    "opening_time": 20,
    "closing_time": 8
  },
  {
    "img": "tenth",
    "res_name": "Mama Mia Pizzeria",
    "rating": "4.2",
    "food_type": "Japanese",
    "price_2": 626,
    "loc": "Connaught Place",
    "distance": "1.2",
    "offer": 17,
    "alcohol": false,
    "opening_time": 21,
    "closing_time": 9
  },
  {
    "img": "fifth",
    "res_name": "Farm to Fork",
    "rating": "4.5",
    "food_type": "Fusion",
    "price_2": 453,
    "loc": "India Gate",
    "distance": "6.8",
    "offer": 22,
    "alcohol": true,
    "opening_time": 9,
    "closing_time": 21
  },
  {
    "img": "third",
    "res_name": "Farm to Fork",
    "rating": "4.1",
    "food_type": "Fusion",
    "price_2": 486,
    "loc": "Qutub Minar",
    "distance": "4.3",
    "offer": 12,
    "alcohol": false,
    "opening_time": 8,
    "closing_time": 20
  },
  {
    "img": "sixth",
    "res_name": "Noodle Nirvana",
    "rating": "3.7",
    "food_type": "Spanish",
    "price_2": 502,
    "loc": "Akshardham Temple",
    "distance": "5.2",
    "offer": 20,
    "alcohol": true,
    "opening_time": 17,
    "closing_time": 5
  },
  {
    "img": "seventh",
    "res_name": "Urban Tandoor",
    "rating": "1.6",
    "food_type": "Italian",
    "price_2": 1165,
    "loc": "Raj Ghat",
    "distance": "5.5",
    "offer": 7,
    "alcohol": false,
    "opening_time": 22,
    "closing_time": 10
  },
  {
    "img": "second",
    "res_name": "Royal Feast",
    "rating": "3.0",
    "food_type": "French",
    "price_2": 921,
    "loc": "Connaught Place",
    "distance": "7.6",
    "offer": 23,
    "alcohol": false,
    "opening_time": 0,
    "closing_time": 12
  },
  {
    "img": "second",
    "res_name": "Biryani Junction",
    "rating": "4.1",
    "food_type": "Mexican",
    "price_2": 748,
    "loc": "Red Fort",
    "distance": "2.1",
    "offer": 8,
    "alcohol": true,
    "opening_time": 18,
    "closing_time": 6
  },
  {
    "img": "fourth",
    "res_name": "Urban Tandoor",
    "rating": "4.2",
    "food_type": "Fusion",
    "price_2": 865,
    "loc": "Connaught Place",
    "distance": "2.1",
    "offer": 20,
    "alcohol": true,
    "opening_time": 20,
    "closing_time": 8
  },
  {
    "img": "First",
    "res_name": "Dragon's Wok",
    "rating": "4.6",
    "food_type": "Spanish",
    "price_2": 318,
    "loc": "Connaught Place",
    "distance": "5.2",
    "offer": 8,
    "alcohol": false,
    "opening_time": 11,
    "closing_time": 23
  },
  {
    "img": "tenth",
    "res_name": "The Hungry Panda",
    "rating": "4.7",
    "food_type": "Thai",
    "price_2": 759,
    "loc": "Red Fort",
    "distance": "3.8",
    "offer": 22,
    "alcohol": false,
    "opening_time": 18,
    "closing_time": 6
  },
  {
    "img": "fourth",
    "res_name": "Urban Tandoor",
    "rating": "2.1",
    "food_type": "Spanish",
    "price_2": 1056,
    "loc": "Connaught Place",
    "distance": "5.5",
    "offer": 23,
    "alcohol": true,
    "opening_time": 18,
    "closing_time": 6
  },
  {
    "img": "tenth",
    "res_name": "Burger Town",
    "rating": "2.8",
    "food_type": "Vietnamese",
    "price_2": 653,
    "loc": "India Gate",
    "distance": "3.7",
    "offer": 19,
    "alcohol": false,
    "opening_time": 15,
    "closing_time": 3
  },
  {
    "img": "seventh",
    "res_name": "Ocean's Delight",
    "rating": "2.6",
    "food_type": "American",
    "price_2": 1076,
    "loc": "Qutub Minar",
    "distance": "5.3",
    "offer": 22,
    "alcohol": false,
    "opening_time": 9,
    "closing_time": 21
  },
  {
    "img": "Eight",
    "res_name": "Dragon's Wok",
    "rating": "3.6",
    "food_type": "Korean",
    "price_2": 554,
    "loc": "Lotus Temple",
    "distance": "7.6",
    "offer": 15,
    "alcohol": true,
    "opening_time": 10,
    "closing_time": 22
  },
  {
    "img": "nine",
    "res_name": "Saffron Lounge",
    "rating": "1.5",
    "food_type": "American",
    "price_2": 662,
    "loc": "Qutub Minar",
    "distance": "7.7",
    "offer": 14,
    "alcohol": true,
    "opening_time": 23,
    "closing_time": 11
  },
  {
    "img": "Eight",
    "res_name": "Farm to Fork",
    "rating": "0.8",
    "food_type": "Indian",
    "price_2": 659,
    "loc": "Lotus Temple",
    "distance": "1.8",
    "offer": 23,
    "alcohol": false,
    "opening_time": 5,
    "closing_time": 17
  },
  {
    "img": "third",
    "res_name": "Urban Tandoor",
    "rating": "4.7",
    "food_type": "American",
    "price_2": 712,
    "loc": "Connaught Place",
    "distance": "1.4",
    "offer": 18,
    "alcohol": false,
    "opening_time": 14,
    "closing_time": 2
  },
  {
    "img": "Eight",
    "res_name": "Biryani Junction",
    "rating": "1.2",
    "food_type": "French",
    "price_2": 1148,
    "loc": "Red Fort",
    "distance": "8.0",
    "offer": 8,
    "alcohol": true,
    "opening_time": 23,
    "closing_time": 11
  }
]

const root = document.getElementById('root')

function getResturants(resturants){

    resturants.forEach(resturant => {
        
        //create a card 
        // 1 . img
        // 2 . name and rating
        // 3 . food_type and price 
        // 4 . location and distance

        //creating a card 

        const card = document.createElement('div')
        card.classList.add('card')

        //img
        const img = document.createElement('img')
        img.src = `Images/${resturant.img}.jpeg`
        //content
        const content = document.createElement('div')
        content.classList.add('card-content')
        //header
        const header = document.createElement('div')
        header.classList.add('card-header')

        const name = document.createElement('h3')
        name.innerText = resturant.res_name
        
        const rating = document.createElement('span')
        rating.classList.add('rating')
        rating.innerText = resturant.rating

        header.appendChild(name)
        header.appendChild(rating)
        //footer
        const footer = document.createElement('div')
        footer.classList.add('card-footer')

        const type = document.createElement('span')
        type.innerText = resturant.food_type
        
        const price = document.createElement('span')
        price.innerText = "₹"+resturant.price_2

        footer.appendChild(type)
        footer.appendChild(price)

        //location

        const info = document.createElement('div')
        info.classList.add('card-location')

        const location = document.createElement('span')
        location.innerText = resturant.loc

        const distance = document.createElement('span')
        distance.innerText = resturant.distance+" km"


        info.appendChild(location)
        info.appendChild(distance)

        //now placing all the things in one content

        content.appendChild(header)
        content.appendChild(footer)
        content.appendChild(info)

        card.appendChild(img)
        card.appendChild(content)

        root.appendChild(card)
    });


}

getResturants(resturants)


const alcohol = document.getElementById("Alcohol")
alcohol.addEventListener('click' , () => {


  const result = resturants.filter( obj => obj.alcohol)
  // root.replaceChildren() or 
  root.innerHTML = ""
  getResturants(result)

})


const rating = document.getElementById("Rating")
rating.addEventListener('click' , () => {


  const result = resturants.filter( obj => {
    return obj.rating > 4.5
  })
  // root.replaceChildren() or 
  root.innerHTML = ""
  getResturants(result)

})


const popUp = document.getElementById('Filters')

popUp.addEventListener( 'click' , ()=>{

  document.getElementById('filterPopup').classList.remove('hidden')
  root.style.opacity='0.6'

  const applyBtn = document.getElementById('applyFilter')
  applyBtn.addEventListener('click' , ()=>{
    const option = document.querySelector('input[name="filterOption"]:checked')
  const opt = option.value

  if(opt === "rating"){

    const result = resturants.sort((a,b)=> b.rating - a.rating )

    root.innerHTML = ""
    document.getElementById('filterPopup').classList.add('hidden')
    root.style.opacity='1'
    getResturants(result)

  }
  else if(opt === "highLow"){

    const result = resturants.sort((a,b)=> b.price_2 - a.price_2)

    root.innerHTML = ""
    document.getElementById('filterPopup').classList.add('hidden')
    root.style.opacity='1'
    getResturants(result)

  }
  else if(opt === "costLowHigh"){

    const result = resturants.sort((a,b)=> a.price_2 - b.price_2 )

    root.innerHTML = ""
    document.getElementById('filterPopup').classList.add('hidden')
    root.style.opacity='1'
    getResturants(result)

  }
  else if( opt === "distance"){

    const result = resturants.sort((a,b)=> a.distance - b.distance )

    root.innerHTML = ""
    document.getElementById('filterPopup').classList.add('hidden')
    root.style.opacity='1'
    getResturants(result)

  }

  })

  
} )


