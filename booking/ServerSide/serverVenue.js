const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");

const Port = 8000;
const server = express();
server.use(cors());
server.use(express.static("./public"));
server.use(bodyParser.json());

// MongoDB connection
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Bookingdb");
  console.log("db-connected");
}
main().catch((err) => console.log(err));

// MongoDB schema and model for Venue registration
const RegisterationSchema = new mongoose.Schema({
  VenueName: String,
  VenueLocation: String,
  VenuePrice:Number,
  VenueEmail:String,
  VenueDescription: String,
  images: [String], // Array to store image paths
  Status:String,
  entityType:String,
  // userID:String,
});


const TableSchema = new mongoose.Schema({
  Id:String,
  Date: String,
  Status: String,
})
const RegisterVenue = mongoose.model("RegisterVenues", RegisterationSchema);
const BookVenuesRecord = mongoose.model("BookVenuesRecord", TableSchema);

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, path.join(__dirname, "public", "images"));
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Endpoint to add Venue and create a new collection for VenueTable data
server.post("/addData", upload.array("images", 4), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    console.log("No files uploaded");
    return res.status(400).json({ message: "No files uploaded" });
  }

  const existingVenue = await RegisterVenue.findOne({
    VenueName: req.body.venueName,
    VenueLocation: req.body.venueLocation,
  });

  if (existingVenue) {
    console.log("Venue with the same name already exists");
    return res
      .status(400)
      .json({ message: "Venue with the same name already exists" });
  }

  let venue = new RegisterVenue();
  venue.VenueName = req.body.venueName;
  venue.VenueLocation = req.body.venueLocation;
  venue.VenuePrice = req.body.venuePrice;
  venue.VenueEmail = req.body.venueEmail;
  venue.VenueDescription = req.body.venueDescription;
  venue.images = req.files.map((file) => file.filename);
  venue.Status = req.body.Status;
  venue.entityType = req.body.entityType;

  try {
    const doc = await venue.save();
    console.log(doc);
   res.json(doc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

server.put('/updateVenueStatus/:userId', async (req, res) => {
  const { userId } = req.params;
  const { newStatus } = req.body;
  // const existItem = await RegisterVenue.findOne({_id:`${userId}`});
  // console.log(existItem);
  try {
    const updatedVenue = await RegisterVenue.findByIdAndUpdate({_id:`${userId}`}, { Status: newStatus }, { new: true });
    console.log(updatedVenue);
    if (!updatedVenue) {
      return res.status(404).json({ error: 'Venue not found' });
    }

    res.json(updatedVenue);
  } catch (err) {
    res.status(500).json({ error: 'Error updating status' });
  }
});

// Endpoint to get Venue registration data
server.get("/getData", async (req, res) => {
  try {
    const docs = await RegisterVenue.find({});
    res.json(docs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

server.get("/getData/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const venueCard = await RegisterVenue.findById(id);
    res.json(venueCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

server.post("/venueRecords", async (req, res) => {
  const { Id, Date, Status } = req.body;

  try {
    // Check for an existing booking based on Date
    const existingBooking = await BookVenuesRecord.findOne({Id:Id, Date: Date });

    if (existingBooking) {
      console.log("Venue with the same Date already exists");
      return res.status(400).json({ message: "Venue with the same Date already exists" });
    }

    // Create a new booking
    const venueTableData = new BookVenuesRecord();
    venueTableData.Id = Id;
    venueTableData.Date = Date;
    venueTableData.Status = Status;

    const doc = await venueTableData.save();
    console.log(doc);

    res.status(200).json(doc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

server.post("/deleteVenueDateRecord", async (req, res) => {
  const { Id } = req.body;
  console.log(Id)

  try {
    await BookVenuesRecord.deleteMany({ Id });
    console.log("Venue record deleted");
    res.status(200).json({ message: "Venue record deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


server.get("/getVenueRecord/:id", async (req, res) => {
  try {
    const id = req.params.id.toString();
    console.log("id in serverVenue ",id);
    const tableRecord = await BookVenuesRecord.find({Id:id});
    res.json(tableRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  } 
});


server.delete('/deleteVenueRequest/:requestId', async (req, res) => {
  const requestId = req.params.requestId;

  try {
    const result = await RegisterVenue.deleteOne({ _id: requestId });

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

server.post('/removeVenueBookDate', async (req, res) => {
  const { Id, Date } = req.body;
  console.log(Id, Date);
  try {
    const findRecord = await BookVenuesRecord.findOne({ Id, Date });
    console.log(findRecord)

    // Check if the record exists
    if (!findRecord) {
      return res.status(404).json({ error: 'Record not found' });
    }

    const updatedVenueCartCount = await BookVenuesRecord.deleteOne({ Id, Date });
    console.log(updatedVenueCartCount);

    res.json(updatedVenueCartCount);
  } catch (err) {
    res.status(500).json({ error: 'Error updating status' });
  }
});



server.listen(Port, () => {
  console.log(`server is running on port : ${Port}`);
});
