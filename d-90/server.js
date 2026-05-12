const app = require("./src/app");
const mongoose = require("mongoose");

async function connectToDB() {
  try {
    await mongoose.connect(
 
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
