const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");

const Port = 8002;
const server = express();
server.use(cors());
server.use(express.static("./Cater"));
server.use(bodyParser.json());

// MongoDB connection
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Bookingdb");
  console.log("db-connected");
}
main().catch((err) => console.log(err));

// MongoDB schema and model for Cater registration
const RegisterationSchema = new mongoose.Schema({
  CaterName: String,
  CaterLocation: String,
  CaterPrice: Number,
  CaterDescription: String,
  images: [String], // Array to store image paths
});

const RegisterCater = mongoose.model("RegisterCaters", RegisterationSchema);

const TableSchema = new mongoose.Schema({
  Id:String,
  Date: String,
  Status: String,
})
const BookCatersRecord = mongoose.model("BookCatersRecord", TableSchema);

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, path.join(__dirname, "Cater", "Images"));
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Endpoint to add Cater and create a new collection for CaterTable data
server.post("/addCaterData", upload.array("images", 4), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    console.log("No files uploaded");
    return res.status(400).json({ message: "No files uploaded" });
  }

  const existingCater = await RegisterCater.findOne({
    CaterName: req.body.CaterName,
    CaterLocation: req.body.CaterLocation,
  });

  if (existingCater) {
    console.log("Cater with the same name and place already exists");
    return res
      .status(400)
      .json({ message: "Cater with the same name and place already exists" });
  }

  let Cater = new RegisterCater();
  Cater.CaterName = req.body.CaterName;
  Cater.CaterLocation = req.body.CaterLocation;
  Cater.CaterPrice = req.body.CaterPrice;
  Cater.CaterDescription = req.body.CaterDescription;
  Cater.images = req.files.map((file) => file.filename);

  try {
    const doc = await Cater.save();
    console.log(doc);
   res.json(doc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Endpoint to get Cater registration data
server.get("/getCaterData", async (req, res) => {
  try {
    const docs = await RegisterCater.find({});
    res.json(docs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

server.get("/getCaterData/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const CaterCard = await RegisterCater.findById(id);
    res.json(CaterCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

server.post("/bookingCater", async (req, res) => {
  const { Id, Date, Status } = req.body;
  console.log("BookPhotograph Body ", req.body)

  try {
    // Check for an existing booking based on Date
    const existingBooking = await BookCatersRecord.findOne({Id:Id, Date: Date });

    if (existingBooking) {
      console.log("Cater with the same Date already exists");
      return res.status(400).json({ message: "Cater with the same Date already exists" });
    }

    // Create a new booking
    const CaterTableData = new BookCatersRecord();
    CaterTableData.Id = Id;
    CaterTableData.Date = Date;
    CaterTableData.Status = Status;
    const doc = await CaterTableData.save();
    console.log(doc);

    res.status(200).json(doc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

server.get("/getCaterRecord/:id", async (req, res) => {
  try {
    const id = req.params.id.toString();
    const tableRecord = await BookCatersRecord.find({Id:id});
    res.json(tableRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


server.listen(Port, () => {
  console.log(`server is running on port : ${Port}`);
});
