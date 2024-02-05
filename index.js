const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const videoRoutes = require("./routes/videos");

const { PORT } = process.env;

app.use(cors());
app.use(express.json());
app.use("/images", express.static("/public/images"));

app.use("/videos", videoRoutes);

app.get("/", (_req, res) => {
  res.json("is this working");
});

app.listen(PORT || 8000, () => {
  console.log(`Running on ${PORT || 8000}`);
});
