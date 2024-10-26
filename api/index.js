const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static("public")); // Melayani file statis dari folder "public"

// Endpoint untuk mendapatkan data kamar
app.get("/api/rooms", (req, res) => {
  fs.readFile("rooms.json", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading file");
    }
    res.json(JSON.parse(data));
  });
});

// Endpoint untuk menyimpan data kamar
app.post("/api/rooms", (req, res) => {
  fs.writeFile("rooms.json", JSON.stringify(req.body, null, 2), (err) => {
    if (err) {
      return res.status(500).send("Error writing file");
    }
    res.status(200).send("Data saved successfully");
  });
});

// Mulai server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
