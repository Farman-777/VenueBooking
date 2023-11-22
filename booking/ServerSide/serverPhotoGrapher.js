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
  PhotoGrapherEmail:String,
  PhotoGrapherDescription: String,
  images: [String], // Array to store image paths
  Status:String,
  entityType:String,
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
  PhotoGrapher.PhotoGrapherEmail = req.body.PhotoGrapherEmail;
  PhotoGrapher.PhotoGrapherDescription = req.body.PhotoGrapherDescription;
  PhotoGrapher.images = req.files.map((file) => file.filename);
  PhotoGrapher.Status = req.body.Status;
  PhotoGrapher.entityType = req.body.entityType;


  try {
    const doc = await PhotoGrapher.save();
    console.log(doc);
   res.json(doc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


server.put('/updatePhotographerStatus/:userId', async (req, res) => {
  const { userId } = req.params;
  const { newStatus } = req.body;
  // const existItem = await RegisterCater.findOne({_id:`${userId}`});
  // console.log(existItem);
  try {
    const updatedPhotographer = await RegisterPhotoGrapher.findByIdAndUpdate({_id:`${userId}`}, { Status: newStatus }, { new: true });
    console.log(updatedPhotographer);
    if (!updatedPhotographer) {
      return res.status(404).json({ error: 'Photographer not found' });
    }


    res.json(updatedPhotographer);
  } catch (err) {
    res.status(500).json({ error: 'Error updating status' });
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
    const PhotoGrapherTableData = new BookPhotoGraphersRecord();
    PhotoGrapherTableData.Id = Id;
    PhotoGrapherTableData.Date = Date;
    PhotoGrapherTableData.Status = Status;
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
    console.log("PHotographer id ",id);
    const tableRecord = await BookPhotoGraphersRecord.find({Id:id});
    res.json(tableRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


server.delete('/deletePhotographerRequest/:requestId', async (req, res) => {
  const requestId = req.params.requestId;


  try {
    const result = await RegisterPhotoGrapher.deleteOne({ _id: requestId });


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

server.post("/deletePhotoGrapherDateRecord", async (req, res) => {
  const { Id } = req.body;
  console.log(Id)

  try {
    await BookPhotoGraphersRecord.deleteMany({ Id });
    console.log("Venue record deleted");
    res.status(200).json({ message: "Venue record deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

server.post('/removePhotoGrapherBookDate', async (req, res) => {
  const { Id, Date } = req.body;
  console.log(Id, Date);
  try {
    const findRecord = await BookPhotoGraphersRecord.findOne({ Id, Date });

    // Check if the record exists
    if (!findRecord) {
      return res.status(404).json({ error: 'Record not found' });
    }


    const updatedPhotoGrapherCartCount = await BookPhotoGraphersRecord.deleteOne({ Id, Date });
    console.log(updatedPhotoGrapherCartCount);


    res.json(updatedPhotoGrapherCartCount);
  } catch (err) {
    res.status(500).json({ error: 'Error updating status' });
  }
});




server.listen(Port, () => {
  console.log(`server is running on port : ${Port}`);
});
