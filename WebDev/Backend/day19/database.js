const mongoose = require("mongoose");

const url =
  "mongodb_uri/Addhar";

const main = async () => {
  await mongoose.connect(url);

};

module.exports = {
    main
}
