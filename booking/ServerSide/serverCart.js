const nodemailer = require("nodemailer");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Port = 8006;
const server = express();
server.use(cors());
server.use(express.static("./Cart"));
server.use(bodyParser.json());

// MongoDB connection
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Bookingdb");
  console.log("db-connected");
}
main().catch((err) => console.log(err));

// MongoDB schema and model for registration
const UserSchema = new mongoose.Schema({
  CartId: String,
  CartTitle: String,
  CartPrice: Number,
  CartLocation:String,
  CartDate:String,
  image: [String],
});

const Cart = mongoose.model("Cart", UserSchema);

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, path.join(__dirname, "Cart", "Images"));
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Endpoint to add Cart and create a new collection for CartTable data
server.post("/addCart", upload.array("image", 1), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    console.log("No files uploaded");
    return res.status(400).json({ message: "No files uploaded" });
  }

  const existingCart = await Cart.findOne({
    CartTitle: req.body.CartTitle,
    CartPrice: req.body.CartPrice,
  });

  if (existingCart) {
    console.log("Cart with the same name already exists");
    return res
      .status(400)
      .json({ message: "Cart with the same name already exists" });
  }

  let Cart = new Cart();
  Cart.CartId = req.body.CartId;
  Cart.CartTitle = req.body.CartTitle;
  Cart.CartPrice = req.body.CartPrice;
  image = req.files.filename;
//   Cart.images = req.files.map((file) => file.filename);

  try {
    const doc = await Cart.save();
    console.log(doc);
    res.json(doc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

server.listen(Port, () => {
  console.log(`server is running on port : ${Port}`);
});
