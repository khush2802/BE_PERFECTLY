const app = require("./src/app");
const mongoose = require("mongoose");

async function connectToDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://khush28022003_db_user:HCssSySpXRGS0iyE@cluster0.p5phqaj.mongodb.net/d90"
    );

    console.log("Connected to MongoDB");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });

  } catch (err) {
    console.log("MongoDB Connection Error:");
    console.log(err);
  }
}

connectToDB();