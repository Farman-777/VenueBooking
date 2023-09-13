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
  VenueDescription: String,
  path: String,
});

const RegisterVenue = mongoose.model("RegisterVenues", RegisterationSchema);

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
server.post("/addData", upload.single("image"), async (req, res) => {
  if (!req.file) {
    console.log("No file uploaded");
    return res.status(400).json({ message: "No file uploaded" });
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
  venue.VenueDescription = req.body.venueDescription;
  venue.path = req.file.filename;

  try {
    const doc = await venue.save();
    console.log(doc);

    // Create a new collection for venue table data using VenueName as collection name
    const VenueTable = mongoose.model(
      doc.VenueName,
      new mongoose.Schema({
        Date: String,
        Status: String,
      })
    );
    const venueTableData = new VenueTable({
      Date: "Sample Date",
      Status: "Sample Status",
    });
    await venueTableData.save();

    res.json(doc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
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

// Endpoint to insert data into VenueTable collection
server.post("/insertVenueTableData/:venueName", async (req, res) => {
  const venueName = req.params.venueName;
  const { Date, Status } = req.body;

  // Find the appropriate VenueTable collection and insert data
  const VenueTable = mongoose.model(
    venueName,
    new mongoose.Schema({
      Date: String,
      Status: String,
    })
  );

  try {
    const venueTableData = new VenueTable({
      Date,
      Status,
    });
    const doc = await venueTableData.save();
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
