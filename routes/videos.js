const express = require("express");
const fs = require("fs");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const videoData = require("../data/video-details.json");
router.use("/public", express.static("public"));

router
  .route("/")
  .get((req, res) => {
    res.status(200).json(videoData);
  })
  .post((req, res) => {
    const { title, description } = req.body;
    if (!title || !description)
      return res
        .status(400)
        .json("All uploads must have a title and description");
    const newUpload = {
      id: uuidv4(),
      title: req.body.title,
      channel: "Melanie Nguyen Don",
      image: `https://localhost:5050/images/Upload-video-preview.png`,
      description: req.body.description,
      views: "1,700,001,023",
      likes: "1,000,985,000",
      duration: "1:11",
      video: "https://project-2-api.herokuapp.com/stream",
      timestamp: new Date().getTime(),
      comments: [], //empty because you dont have any comments yet
    };

    const freshVideoListFile = fs.readFileSync("./data/video-details.json");
    const freshVideoList = JSON.parse(freshVideoListFile);
    freshVideoList.push(newUpload);
    console.log(freshVideoList);
    fs.writeFileSync(
      "./data/video-details.json",
      JSON.stringify(freshVideoList)
    );
    res.status(201).json(freshVideoList);
  });

router.route("/:videoId").get((req, res) => {
  const { videoId } = req.params; //destructuring
  const videoMatch = videoData.find((video) => videoId == video.id);
  if (!videoMatch) return res.status(404).json(`No video with id ${videoId}`);
  res.json(videoMatch);
});

module.exports = router;
