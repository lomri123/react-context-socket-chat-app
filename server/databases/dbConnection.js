const mongoose = require("mongoose");
require("dotenv").config();



if (process.env.MONGO_URL) {
  const connectionString = process.env.MONGO_URL;
  mongoose
    .connect(connectionString, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    .then(() => console.log("connection successful"))
    .catch(err => console.error(err));
} else {
  const url = "mongodb://localhost:27017/db";
  mongoose.connect(
    url,
    {
      useNewUrlParser: true
    },
    console.log("connected to mongo")
  );
}

module.exports = mongoose;
