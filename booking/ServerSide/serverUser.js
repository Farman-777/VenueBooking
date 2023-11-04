const nodemailer = require("nodemailer")
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


const PasswordReset = new mongoose.Schema({
  otp: Number,
  email: String,
});
const ResetPassword = mongoose.model("ResetPassword", PasswordReset);

// Route to send OTP via email
server.post("/sentEmail", async (req, res) => {
  const email = req.body.userEmail;
  
 // Check if the user's email exists in the database
 const existingUser = await User.findOne({ Email: email });

 if (!existingUser) {
   console.log("User with this email does not exist.");
   return res.status(404).json({ error: "User with this email does not exist." });
 }

  const otp = Math.floor(Math.random() * 1000000);

  const passwordReset = new ResetPassword();
    passwordReset.otp = otp;
    passwordReset.email=  email;

  try {
    const savedPasswordReset = await passwordReset.save();
    console.log("OTP saved to MongoDB.");

    const sendMail = async () => {
      let testAccount = await nodemailer.createTestAccount();

      let transporter = await nodemailer.createTransport({
        service: "Gmail",
        port: 465,
        auth: {
          user: "farmanmalik4487@gmail.com",
          pass: "drjayetmacoqdutn",
        },
      });

      let info = await transporter.sendMail({
        from: "farmanmalik4487@gmail.com",
        to: email,
        subject: "Reset Password",
        html: `
          <p>Dear ${email},</p>
          <p>Your OTP to reset your password is: <strong>${otp}</strong></p>
          `,
      });

      console.log("Message sent: %s", info.messageId);
      res.json({ message: "OTP sent successfully!" });
    };

    sendMail().catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Something went wrong." });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
});

// Route to verify OTP entered by the user
server.post("/verifyOTP", async (req, res) => {
  const enteredOTP = req.body.userOTP; // OTP entered by the user
  console.log("otp serverside",enteredOTP)

  // Check if the entered OTP exists in the database
  const confirmOTP = await ResetPassword.findOne({ otp: enteredOTP });
  console.log(typeof(confirmOTP))

  if (!confirmOTP) {
    console.log("Incorrect OTP.");
    return res.status(404).json({ error: "Incorrect OTP." });
  }

  // deleting the used OTP record from the database
  await ResetPassword.deleteOne({otp:enteredOTP});

  // Return a success response
  return res.status(200).json({ message: "OTP is correct." });
});


server.post("/newPassword", async (req, res) => {
  try {
    const { userPassword1, email } = req.body; // Destructure the properties directly
    console.log("email ", email);
    console.log("newPass ", userPassword1);

    // Check if the email exists in your database
    const userAccount = await User.findOne({ Email: email });
    
    // Hash the new password using bcrypt
    const hashedPassword = await bcrypt.hash(userPassword1, 10); // You can adjust the salt rounds (e.g., 10) as needed

    // Update the user's password with the hashed password
    userAccount.Password = hashedPassword;

    // Save the updated user object with the new password
    await userAccount.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

server.get("/getUserName", async (req, res) => {
  const { email } = req.query; // Use req.query to access query parameters
  const cartData1 = await User.find({ Email: email });
  res.status(200).json(cartData1);
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
