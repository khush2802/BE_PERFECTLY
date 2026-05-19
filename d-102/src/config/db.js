const mongoose = require("mongoose");


async function connectedToDB(){
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to DB");
}

module.exports = connectedToDB;