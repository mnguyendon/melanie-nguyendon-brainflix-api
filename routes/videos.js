const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();
const PORT = process.env.PORT || 8000;

const videoData = require("../data/video-details.json");

router.use("/public", express.static("public"));

router
  .route("/")
  .get((req, res) => {
    res.status(200).json(videoData);
  })
  .post((req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json("All uploads must have a title and description");
    }

    const newUpload = {
      id: uuidv4(),
      title: req.body.title,
      channel: "Melanie Nguyen Don",
      image: `http://localhost:${PORT}/images/Upload-video-preview.jpg`,
      description: req.body.description,
      views: "0",
      likes: "0",
      duration: "1:11",
      video: "https://project-2-api.herokuapp.com/stream",
      timestamp: new Date().getTime(),
      comments: [],
    };

    const freshVideoList = [...videoData, newUpload];

    fs.writeFileSync(
      path.join(__dirname, "../data/video-details.json"),
      JSON.stringify(freshVideoList, null, 2)
    );

    res.status(201).json(freshVideoList);
  });

router.route("/:videoId").get((req, res) => {
  const { videoId } = req.params;
  const videoMatch = videoData.find((video) => videoId == video.id);

  if (!videoMatch) {
    return res.status(404).json(`No video with id ${videoId}`);
  }

  res.json(videoMatch);
});

module.exports = router;
