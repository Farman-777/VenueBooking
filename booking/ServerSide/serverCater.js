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
  CaterEmail:String,
  CaterDescription: String,
  images: [String], // Array to store image paths
  Status:String,
  entityType:String,
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
  Cater.CaterEmail = req.body.CaterEmail;
  Cater.CaterDescription = req.body.CaterDescription;
  Cater.images = req.files.map((file) => file.filename);
  Cater.Status = req.body.Status;
  Cater.entityType = req.body.entityType;


  try {
    const doc = await Cater.save();
    console.log(doc);
   res.json(doc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
server.put('/updateCaterStatus/:userId', async (req, res) => {
  const { userId } = req.params;
  const { newStatus } = req.body;
  // const existItem = await RegisterCater.findOne({_id:`${userId}`});
  // console.log(existItem);
  try {
    const updatedCater = await RegisterCater.findByIdAndUpdate({_id:`${userId}`}, { Status: newStatus }, { new: true });
    console.log(updatedCater);
    if (!updatedCater) {
      return res.status(404).json({ error: 'Cater not found' });
    }


    res.json(updatedCater);
  } catch (err) {
    res.status(500).json({ error: 'Error updating status' });
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




server.delete('/deleteCaterRequest/:requestId', async (req, res) => {
  const requestId = req.params.requestId;


  try {
    const result = await RegisterCater.deleteOne({ _id: requestId });


    if (result.deletedCount === 1) {
      res.status(204).send(); // Respond with a 204 No Content status for success
    } else {
      res.status(404).json({ error: 'Request not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

server.post("/deleteCaterDateRecord", async (req, res) => {
  const { Id } = req.body;
  console.log(Id)

  try {
    await BookCatersRecord.deleteMany({ Id });
    console.log("Venue record deleted");
    res.status(200).json({ message: "Venue record deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});




server.post('/removeCaterBookDate', async (req, res) => {
  const { Id, Date } = req.body;
  console.log(Id, Date);
  try {
    const findRecord = await BookCatersRecord.findOne({ Id, Date });
    // Check if the record exists
    if (!findRecord) {
      return res.status(404).json({ error: 'Record not found' });
    }


    const updatedCaterCartCount = await BookCatersRecord.deleteOne({ Id, Date });
    console.log(updatedCaterCartCount);


    res.json(updatedCaterCartCount);
  } catch (err) {
    res.status(500).json({ error: 'Error updating status' });
  }
});


server.listen(Port, () => {
  console.log(`server is running on port : ${Port}`);
});




