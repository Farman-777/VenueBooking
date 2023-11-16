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
  user_ID:String,
  BookCount:Number,
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
  const existingCartItem = await Cart.findOne({ CartTitle: req.body.title,user_ID:req.body.userID });

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
    user_ID:req.body.userID,
    BookCount:req.body.BookCount,
    
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

server.get("/getCart/:id",async (req,res) => {
  const {id} = req.params;
  console.log("farman : ",id);
  const cartData1 = await Cart.find({user_ID:id});
  console.log("farman : ",cartData1);
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


server.put('/updateBookCountCart/:id', async (req, res) => {
  const { id } = req.params;
  const { UpdateBookCount } = req.body;
  
  try {
    const existItem = await Cart.findOne({_id: id});
    if (!existItem) {
      return res.status(404).json({ error: 'Venue not found' });
    }
    const updatedVenueCartCount = await Cart.findOneAndUpdate({_id: id}, { BookCount: existItem.BookCount + UpdateBookCount }, { new: true });
    console.log(updatedVenueCartCount);

    res.json(updatedVenueCartCount);
  } catch (err) {
    res.status(500).json({ error: 'Error updating status' });
  }
});

server.put('/removeBookCountCart/:id', async (req, res) => {
  const { id } = req.params;
  const { UpdateBookCount } = req.body;
  
  try {
    const existItem = await Cart.findOne({_id: id});    
    if (existItem.BookCount === 0) {
      // Optional: You may want to handle the case where BookCount is already 0
      return res.status(400).json({ error: 'length can not be less than 0' });
    }
    if (!existItem) {
      return res.status(404).json({ error: 'Venue not found' });
    }
    const updatedVenueCartCount = await Cart.findOneAndUpdate({_id: id}, { BookCount: existItem.BookCount - UpdateBookCount }, { new: true });
    console.log(updatedVenueCartCount);

    res.json(updatedVenueCartCount);
  } catch (err) {
    res.status(500).json({ error: 'Error updating status' });
  }
});



server.listen(Port, () => {
  console.log(`server is running on port : ${Port}`);
});
