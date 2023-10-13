const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path"); // Import the path module

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
  CartId:String,
  CartTitle: String, 
  CartPrice: Number,
  CartKey: String,  
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

server.post("/addCart", upload.array("image", 1), async (req, res) => {
  console.log("req.body : ",req.body)
  // Collect image filenames from uploaded files
  const imageFilename = req.body.image[0];

  // Check if an item with the same CartKey already exists
  const existingCartItem = await Cart.findOne({ CartTitle: req.body.title });

  if (existingCartItem) {
    // If an item with the same CartKey exists, respond with an error message
    return res.status(400).json({ message: "Cart item already exists" });
  }

  // Create a new Cart instance
  const cartData = new Cart({
    CartId:req.body.CartId,
    CartTitle: req.body.title, // using the title property from the request body
    CartPrice: req.body.price, // using the price property from the request body
    CartKey: req.body.CartKey, // using the cartKey property from the request body
    image: imageFilename, // Assign the array of image filenames
  });

  try {
    // Save the cartData to the database
    const savedCartData = await cartData.save();
    console.log(savedCartData);
    res.json(savedCartData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});



server.get("/getCart",async (req,res) => {
  const cartData1 = await Cart.find({});
  res.status(200).json(cartData1);
})

server.post("/deleteCart", async (req, res) => {
  try {
    const { CartKey1 } = req.body; // Access the id directly from req.body
    console.warn("CartKey1 : ",CartKey1);
    const deletedCart = await Cart.findByIdAndDelete(CartKey1);
    console.warn("line 81 : ", deletedCart);

    if (deletedCart !== undefined && deletedCart !== null) {
      // Item successfully deleted
      res.status(200).json({ message: "Cart item deleted successfully" });
    } 
  } catch (error) {
    // Handle any errors that occur during the deletion
    console.error("Error deleting cart item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



server.listen(Port, () => {
  console.log(`server is running on port : ${Port}`);
});
