const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Port = 8005;
const server = express();
server.use(cors());
server.use(bodyParser.json());

// MongoDB connection
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Bookingdb");
  console.log("db-connected");
}
main().catch((err) => console.log(err));

// MongoDB schema and model for registration
const UserSchema = new mongoose.Schema({
  Name: String,
  Email: String,
  Password: String,
});

const User = mongoose.model("User", UserSchema);

// Endpoint to add and create a new collection for user data
server.post("/addUserData", async (req, res) => {
  const existing = await User.findOne({
    Email: req.body.userEmail,
  });

  if (existing) {
    console.log("User with the same Email already exists");
    return res
      .status(400)
      .json({ message: "User with the same Email already exists" });
  }

  // Hash the user's password before storing it in the database
  const saltRounds = 10; // You can adjust the number of salt rounds as needed
  const hashedPassword = await bcrypt.hash(req.body.userPassword, saltRounds);

  let UserData = new User();
  UserData.Name = req.body.userName;
  UserData.Email = req.body.userEmail;
  UserData.Password = hashedPassword; // Store the hashed password in the database

  try {
    const doc = await UserData.save();
    console.log(doc);
    res.json(doc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Endpoint to authenticate and log in a user
server.post("/getUserData", async (req, res) => {
  try {
    const existingUser = await User.findOne({
      Email: req.body.userEmail,
    });

    if (!existingUser) {
      console.log("Login failed: Email or password is incorrect.");
      return res.status(400).json({ message: "Email or password is incorrect." });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(req.body.userPassword, existingUser.Password);

    if (!passwordMatch) {
      console.log("Login failed: Email or password is incorrect.");
      return res.status(400).json({ message: "Email or password is incorrect." });
    }

    console.log("Login successful.");
    res.status(200).send();

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

server.listen(Port, () => {
  console.log(`server is running on port : ${Port}`);
});


// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");

// const Port = 8005;
// const server = express();
// server.use(cors());
// server.use(bodyParser.json());

// // MongoDB connection
// async function main() {
//   await mongoose.connect("mongodb://127.0.0.1:27017/Bookingdb");
//   console.log("db-connected");
// }
// main().catch((err) => console.log(err));

// // MongoDB schema and model for  registration
// const UserSchema = new mongoose.Schema({
//   Name: String,
//   Email: String,
//   Password: String,
// });

// const User = mongoose.model("User", UserSchema);

// // Endpoint to add  and create a new collection for Table data
// server.post("/addUserData", async (req, res) => {
//   const existing = await User.findOne({
//     Email: req.body.userEmail,
//   });

//   if (existing) {
//     console.log("User with the same Email already exists");
//     return res
//       .status(400)
//       .json({ message: "User with the same Email already exists" });
//   }

//   let UserData = new User();
//   UserData.Name = req.body.userName;
//   UserData.Email = req.body.userEmail;
//   UserData.Password = req.body.userPassword;

//   try {
//     const doc = await UserData.save();
//     console.log(doc);
//     res.json(doc);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // Endpoint to get  registration data
// server.post("/getUserData", async (req, res) => {
//     try {
//       const existingUser = await User.findOne({
//         Email: req.body.userEmail,
//         Password: req.body.userPassword,
//       });
  
//       if (!existingUser) {
//         console.log("Login failed: Email or password is incorrect.");
//         return res.status(400).json({ message: "Email or password is incorrect." });
//       }
//       else{
//         res.status(200).send();
//       }
  
//       console.log("Login successful.");
  
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   });
  


// server.listen(Port, () => {
//   console.log(`server is running on port : ${Port}`);
// });
