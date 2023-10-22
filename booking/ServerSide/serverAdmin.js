// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const path = require("path"); // Import the path module

// const Port = 8007;
// const server = express();
// server.use(bodyParser.json());
// server.use(cors({
//     origin: "http://localhost:3000", // Replace with the actual origin of your React app
//     credentials: true, // If you're using cookies or sessions
//   }));

// // MongoDB connection
// async function main() {
//   await mongoose.connect("mongodb://127.0.0.1:27017/Bookingdb");
//   console.log("db-connected");
// }
// main().catch((err) => console.log(err));

// // MongoDB schema and model for registration
// const UserSchema = new mongoose.Schema({
//   Name: String,
//   Location: String,
//   Price: Number,
//   Email: String,
//   Description: String,
//   Status: String,
//   entityType:String,
// });

// const UserRecordAdmin = mongoose.model("UserRecordAdmin", UserSchema);

// server.post("/addRecordAdmin", async (req, res) => {
//   console.log("req.body : ", req.body);

//   // Create a new Cart instance
//   const userRecord1 = new UserRecordAdmin();
//   userRecord1.Name= req.body.DJName;
//   userRecord1.Location= req.body.DJLocation;
//   userRecord1.Price= req.body.DJPrice;
//   userRecord1.Email= req.body.DJEmail;
//   userRecord1.Description= req.body.DJDescription;
//   userRecord1.Status= req.body.Status;
//   userRecord1.entityType= req.body.entityType;

//   try {
//     // Save the cartData to the database
//     const savedCartData = await userRecord1.save();
//     console.log(savedCartData);
//     res.json(savedCartData);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // server.get("/getCart",async (req,res) => {
// //   const cartData1 = await Cart.find({});
// //   res.status(200).json(cartData1);
// // })

// server.listen(Port, () => {
//   console.log(`server is running on port : ${Port}`);
// });
