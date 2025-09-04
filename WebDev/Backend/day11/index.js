const express = require("express");
const { Auth } = require("./middleware/Auth");
const app = express();

const AllFoodItems = [
  { id: 1, name: "Chicken Biryani", type: "non-veg", price: 350 },
  { id: 2, name: "Paneer Roll", type: "veg", price: 350 },
  { id: 3, name: "Fish Curry", type: "non-veg", price: 360 },
  { id: 4, name: "Masala Dosa", type: "veg", price: 200 },
  { id: 5, name: "Butter Chicken", type: "non-veg", price: 400 },
  { id: 6, name: "Aloo Paratha", type: "veg", price: 120 },
  { id: 7, name: "Mutton Rogan Josh", type: "non-veg", price: 480 },
  { id: 8, name: "Veg Biryani", type: "veg", price: 280 },
  { id: 9, name: "Egg Curry", type: "non-veg", price: 220 },
  { id: 10, name: "Dal Makhani", type: "veg", price: 220 },
  { id: 11, name: "Chicken Tandoori", type: "non-veg", price: 420 },
  { id: 12, name: "Shahi Paneer", type: "veg", price: 300 },
  { id: 13, name: "Mutton Biryani", type: "non-veg", price: 450 },
  { id: 14, name: "Mix Veg Curry", type: "veg", price: 240 },
  { id: 15, name: "Prawn Masala", type: "non-veg", price: 500 },
  { id: 16, name: "Butter Naan", type: "veg", price: 60 },
  { id: 17, name: "Chicken Kebab", type: "non-veg", price: 300 },
  { id: 18, name: "Mushroom Masala", type: "veg", price: 270 },
  { id: 19, name: "Egg Biryani", type: "non-veg", price: 280 },
  { id: 20, name: "Chole Bhature", type: "veg", price: 180 },
  { id: 21, name: "Panner Tikka", type: "veg", price: 350 },
];

const UserCart = [];

//parser for json
app.use(express.json());

// app.use('/admin',Auth)
// or we can just do like this

app.get("/foods", (req, res) => {
  //user and admin both can acess this
  res.status(200).send(AllFoodItems);
});

app.post("/admin/add", Auth, (req, res) => {
  try {
    if (
      "id" in req.body &&
      "name" in req.body &&
      "type" in req.body &&
      "price" in req.body
    ) {
      AllFoodItems.push(req.body);
      res.status(201).send("Item added sucessfully");
    } else {
      throw new Error("data is not valid");
    }
  } catch (err) {
    res.status(400).send("got an error : " + err.message);
  }
});

app.delete("/admin/delete/:id", Auth, (req, res) => {
  const id = Number(req.params.id);
  const idx = AllFoodItems.findIndex((item) => item.id === id);
  if (idx != -1) {
    AllFoodItems.splice(idx, 1);
    res.status(201).send("Deleted the data sucessfully");
  } else {
    res.status(201).send("ID not found");
  }
});

app.patch("/admin/update/:id", Auth, (req, res) => {
  const id = Number(req.params.id);
  const idx = AllFoodItems.findIndex((item) => item.id === id);
  // console.log(AllFoodItems[idx])
  if (idx != -1) {
    if (req.body.name) {
      AllFoodItems[idx].name = req.body.name;
    }
    if (req.body.type) {
      AllFoodItems[idx].type = req.body.type;
    }
    if ("price" in req.body) {
      AllFoodItems[idx].price = req.body.price;
    }
    res.status(201).send("Data patched sucessfully");
  } else {
    res.status(201).send("ID not found");
  }
});

app.get("/cart", (req, res) => {
  res.status(200).send(UserCart);
});

app.post("/cart/add/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = AllFoodItems.findIndex((item) => item.id === id);

  if (idx != -1) {
    UserCart.push(AllFoodItems[idx]);
    res.status(200).send("Item added to cart sucessfully");
  } else {
    res.status(400).send("Item out of stock or bad request");
  }
});

app.delete("/cart/delete/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = UserCart.findIndex((item) => item.id === id);
  console.log(UserCart[idx]);
  if (idx != -1) {
    UserCart.splice(idx, 1);
    res.status(200).send("Item deleted from cart sucessfully");
  } else {
    console.log(idx);
    res.status(400).send("bad request");
  }
});

app.listen(4000, () => {
  console.log("server is listining on port 4000");
});
