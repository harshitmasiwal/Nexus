const mongoose = require("mongoose");

const url =
  "mongodb+srv://harshit_masiwal:Harshit%4012@masiwalcluster.sqljlah.mongodb.net/Addhar";

const main = async () => {
  await mongoose.connect(url);

};

module.exports = {
    main
}
