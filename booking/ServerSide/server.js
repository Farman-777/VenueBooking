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
  images: [String], // Array to store image paths
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
    console.log("Venue with the same name and location already exists");
    return res
      .status(400)
      .json({ message: "Venue with the same name and location already exists" });
  }

  let venue = new RegisterVenue();
  venue.VenueName = req.body.venueName;
  venue.VenueLocation = req.body.venueLocation;
  venue.VenueDescription = req.body.venueDescription;
  venue.images = req.files.map((file) => file.filename);

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

// const express = require('express');
// const mongoose = require('mongoose');
// const multer = require('multer');
// const fs = require('fs'); // Import the fs module
// const path = require('path'); // Import the path module
// const app = express();
// const port =  5000;

// // Connect to MongoDB (Make sure you have MongoDB installed and running)
// mongoose.connect('mongodb://127.0.0.1:27017/image_upload_db', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection; 

// // Handle MongoDB connection events
// db.on('error', (err) => {
//   console.error('MongoDB connection error:', err);
// });

// db.once('open', () => {
//   console.log('Connected to MongoDB');

//   // Define a mongoose model for storing image information
//   const Image = mongoose.model('ImageUploadTable', {
//     name: String,
//     data: Buffer,
//     contentType: String,
//   });

//   // Set up Multer for file uploads
//   const storage = multer.memoryStorage();
//   const upload = multer({ storage });

//   app.use(express.json());

//   // Serve HTML form for uploading images
//   app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
//   });

//   // Handle image uploads
//   app.post('/upload', upload.array('images', 3), async (req, res) => {
//     try {
//       const files = req.files;

//       if (!files || files.length !== 3) {
//         return res.status(400).send('Upload exactly 3 images');
//       }

//       const images = [];

//       for (let i = 0; i < files.length; i++) {
//         const image = new Image({
//           name: files[i].originalname,
//           data: files[i].buffer,
//           contentType: files[i].mimetype,
//         });

//         // Save the image data to the "imageStore" folder
//         const imageFilePath = path.join(__dirname, 'imageStore', files[i].originalname);
//         fs.writeFileSync(imageFilePath, files[i].buffer);

//         await image.save();
//         images.push(image);
//       }

//       return res.status(201).json(images);
//     } catch (err) {
//       console.error('Error during image upload:', err);
//       res.status(500).send('Error during image upload. Please check the server logs for details.');
//     }
//   });

//   app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//   });
// });
