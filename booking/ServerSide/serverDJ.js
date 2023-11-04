const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");

const Port = 8003;
const server = express();
server.use(cors());
server.use(express.static("./DJ"));
server.use(bodyParser.json());

// MongoDB connection
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Bookingdb");
  console.log("db-connected");
}
main().catch((err) => console.log(err));

// MongoDB schema and model for DJ registration
const RegisterationSchema = new mongoose.Schema({
  DJName: String,
  DJLocation: String,
  DJPrice: Number,
  DJEmail:String,
  DJDescription: String,
  images: [String], // Array to store image paths
  Status:String,
  entityType:String,
});

const RegisterDJ = mongoose.model("RegisterDJs", RegisterationSchema);

const TableSchema = new mongoose.Schema({
  Id:String,
  Date: String,
  Status: String,
})
const BookDJsRecord = mongoose.model("BookDJsRecord", TableSchema);

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, path.join(__dirname, "DJ", "Images"));
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Endpoint to add DJ and create a new collection for DJTable data
server.post("/addDJData", upload.array("images", 4), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    console.log("No files uploaded");
    return res.status(400).json({ message: "No files uploaded" });
  }

  const existingDJ = await RegisterDJ.findOne({
    DJName: req.body.DJName,
    DJLocation: req.body.DJLocation,
  });

  if (existingDJ) {
    console.log("DJ with the same name and place already exists");
    return res
      .status(400)
      .json({ message: "DJ with the same name and place already exists" });
  }
//condition && req.body avail
  let DJ = new RegisterDJ();
  DJ.DJName = req.body.DJName;
  DJ.DJLocation = req.body.DJLocation;
  DJ.DJPrice = req.body.DJPrice;
  DJ.DJDescription = req.body.DJDescription;
  DJ.images = req.files.map((file) => file.filename);
  DJ.DJEmail = req.body.DJEmail;
  DJ.Status = req.body.Status;
  DJ.entityType = req.body.entityType;
  try {
    const doc = await DJ.save();
    console.log(doc);
   res.json(doc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
server.put('/updateDJStatus/:userId', async (req, res) => {
  const { userId } = req.params;
  const { newStatus } = req.body;
  // const existItem = await RegisterDJ.findOne({_id:`${userId}`});
  // console.log(existItem);
  try {
    const updatedDJ = await RegisterDJ.findByIdAndUpdate({_id:`${userId}`}, { Status: newStatus }, { new: true });
    console.log(updatedDJ);
    if (!updatedDJ) {
      return res.status(404).json({ error: 'DJ not found' });
    }

    res.json(updatedDJ);
  } catch (err) {
    res.status(500).json({ error: 'Error updating status' });
  }
});


// Endpoint to get DJ registration data
server.get("/getDJData", async (req, res) => {
  try {
    const docs = await RegisterDJ.find({});
    res.json(docs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

server.get("/getDJData/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const DJCard = await RegisterDJ.findById(id);
    res.json(DJCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

server.post("/bookingDJ", async (req, res) => {
  const { Id, Date, Status } = req.body;
  console.log("BookPhotograph Body ", req.body)

  try {
    // Check for an existing booking based on Date
    const existingBooking = await BookDJsRecord.findOne({Id:Id, Date: Date });

    if (existingBooking) {
      console.log("DJ with the same Date already exists");
      return res.status(400).json({ message: "DJ with the same Date already exists" });
    }

    // Create a new booking
    const DJTableData = new BookDJsRecord();
    DJTableData.Id = Id;
    DJTableData.Date = Date;
    DJTableData.Status = Status;
    
    const doc = await DJTableData.save();
    console.log(doc);

    res.status(200).json(doc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

server.get("/getDJRecord/:id", async (req, res) => {
  try {
    const id = req.params.id.toString();
    console.log("serverDJ_ID : ",id)
    const tableRecord = await BookDJsRecord.find({ Id:id});
    console.log(tableRecord)
    res.json(tableRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


server.delete('/deleteDJRequest/:requestId', async (req, res) => {
  const requestId = req.params.requestId;

  try {
    const result = await RegisterDJ.deleteOne({ _id: requestId });

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


server.listen(Port, () => {
  console.log(`server is running on port : ${Port}`);
});
