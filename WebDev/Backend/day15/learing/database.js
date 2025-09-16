const mongoose = require("mongoose");
const { Schema } = mongoose;

const url =
  "mongo_db_uri";

async function main() {
  await mongoose.connect(url);

  //creating the schema 
  const userSchema = new Schema({
    name: String,
    age: Number,
    phone: String,
    city: String,
  });

  //create the model from the schema
  const User = await mongoose.model("user", userSchema);

  //inserting one document

  // await User.create({name:"harshit",age:20,city:"ghaziabad",phone:"7827902652"})

  //inserting many document

  // await User.insertMany([{name:"dhruv",age:40},{name:"sarthak",age:10},{city:"delhi",name:"megansh"}])

  //fetching all the documents

  // const allUsers = await User.find({})
  // console.log(allUsers)

  //find document by specific feild

  // const harshit = await User.find({name:"harshit"})
  // console.log(harshit)

  // find document by two or more specific feild

  // const harshit = await User.find({name:"harshit" , age:"10" })
  // console.log(harshit)
}

main()
  .then(() => {
    console.log("connected to the DB");
  })
  .catch((err) => {
    console.log(err);
  });
