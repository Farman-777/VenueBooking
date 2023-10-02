const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");

const Port = 8001;
const server = express();
server.use(cors());
server.use(express.static("./Photographer"));
server.use(bodyParser.json());

// MongoDB connection
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Bookingdb");
  console.log("db-connected");
}
main().catch((err) => console.log(err));

// MongoDB schema and model for PhotoGrapher registration
const RegisterationSchema = new mongoose.Schema({
  PhotoGrapherName: String,
  PhotoGrapherLocation: String,
  PhotoGrapherPrice:Number,
  PhotoGrapherDescription: String,
  images: [String], // Array to store image paths
});

const RegisterPhotoGrapher = mongoose.model("RegisterPhotoGraphers", RegisterationSchema);

const TableSchema = new mongoose.Schema({
  Id:String,
  Date: String,
  Status: String,
})
const BookPhotoGraphersRecord = mongoose.model("BookPhotoGraphersRecord", TableSchema);

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, path.join(__dirname, "Photographer", "Images"));
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Endpoint to add PhotoGrapher and create a new collection for PhotoGrapherTable data
server.post("/addPhotoData", upload.array("images", 4), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    console.log("No files uploaded");
    return res.status(400).json({ message: "No files uploaded" });
  }

  const existingPhotoGrapher = await RegisterPhotoGrapher.findOne({
    PhotoGrapherName: req.body.PhotoGrapherName,
    PhotoGrapherLocation: req.body.PhotoGrapherLocation,
  });

  if (existingPhotoGrapher) {
    console.log("PhotoGrapher with the same name and place already exists");
    return res
      .status(400)
      .json({ message: "PhotoGrapher with the same name and place already exists" });
  }

  let PhotoGrapher = new RegisterPhotoGrapher();
  PhotoGrapher.PhotoGrapherName = req.body.PhotoGrapherName;
  PhotoGrapher.PhotoGrapherLocation = req.body.PhotoGrapherLocation;
  PhotoGrapher.PhotoGrapherPrice = req.body.PhotoGrapherPrice;
  PhotoGrapher.PhotoGrapherDescription = req.body.PhotoGrapherDescription;
  PhotoGrapher.images = req.files.map((file) => file.filename);

  try {
    const doc = await PhotoGrapher.save();
    console.log(doc);
   res.json(doc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Endpoint to get PhotoGrapher registration data
server.get("/getPhotoData", async (req, res) => {
  try {
    const docs = await RegisterPhotoGrapher.find({});
    res.json(docs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

server.get("/getPhotoData/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const PhotoGrapherCard = await RegisterPhotoGrapher.findById(id);
    res.json(PhotoGrapherCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

server.post("/bookingPhotographer", async (req, res) => {
  const { Id, Date, Status } = req.body;
  console.log("BookPhotograph Body ", req.body)

  try {
    // Check for an existing booking based on Date
    const existingBooking = await BookPhotoGraphersRecord.findOne({Id:Id, Date: Date });

    if (existingBooking) {
      console.log("PhotoGrapher with the same Date already exists");
      return res.status(400).json({ message: "PhotoGrapher with the same Date already exists" });
    }

    // Create a new booking
    const PhotoGrapherTableData = new BookPhotoGraphersRecord({ Id, Date, Status });
    const doc = await PhotoGrapherTableData.save();
    console.log(doc);

    res.status(200).json(doc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

server.get("/getPhotoRecord/:id", async (req, res) => {
  try {
    const id = req.params.id.toString();
    const tableRecord = await BookPhotoGraphersRecord.find({Id:id});
    res.json(tableRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


server.listen(Port, () => {
  console.log(`server is running on port : ${Port}`);
});
