const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Server is running Alhamdulillah!");
});

// Example parcel route
app.post("/parcel", (req, res) => {
  const parcelData = req.body;
  //   res.json({ message: "Parcel received", data: parcelData });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
