const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const videoRoutes = require("./routes/videos");

const { PORT } = process.env;

//middleware
app.use(cors());
app.use(express.json());

app.use("/videos", videoRoutes);

app.get("/", (req, res) => {
  res.json("melanie");
});

app.listen(PORT || 8000, () => {
  console.log(`Running on ${PORT || 8000}`);
});

// notes to myself ---> api middleware (401 error)
// app.use((req, res, next) =>{

// })
