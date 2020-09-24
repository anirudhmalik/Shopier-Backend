const express = require("express");
const router = express.Router();
const Post = require("../modal/GetCategories");
router.get("/", async (req, res) => {
  try {
    const categories = await Post.find();
    res.json(categories);
  } catch (error) {
    console.log(error);
  }
});
router.post("/", async (req, res) => {
  const category = {
    id: req.body.id,
    icon: req.body.icon,
    label: req.body.label,
    uri: req.body.uri,
    value: req.body.value,
  };
  Post.find({ id: req.body.id }, async (err, docs) => {
    if (docs.length <= 0) {
      const post = new Post(category);
      try {
        const savedPost = await post.save();
        res.send("Success");
      } catch (error) {
        console.log(error);
      }
    } else if (docs.length > 0) {
      Post.updateOne({ id: req.body.id }, category, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          res.send("updated");
        }
      });
    } else if (err) {
      console.log(err);
    }
  });
});

module.exports = router;
