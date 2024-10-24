require("dotenv").config();

const express = require("express");
const app = express();

const port = process.env.PORT || 3000; // Use port from env or default to 3000

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});