const express = require("express");
const router = express.Router();
const Post = require("../modal/Post");
const getCategories = require("../modal/GetCategories");
const PostProduct = require("../modal/PostProduct");
const PostSubCategories = require("../modal/PostSubCategories");
const auth = require("../midddleware/auth");

router.get("/", [auth], async (req, res) => {
  try {
    if (req.user.userType != "buyer") {
      const categories = await Post.find({
        userId: req.user.userId,
        id: req.query.id,
      });
      if (categories.length > 0) {
        const result = await getCategories.find({
          id: categories[0].itemId,
        });
        res.json(result);
      } else {
        res.json();
      }
    } else {
      const categories = await Post.find({
        userId: req.query.shopId,
        id: req.query.id,
      });
      if (categories.length > 0) {
        const result = await getCategories.find({
          id: categories[0].itemId,
        });
        res.json(result);
      } else {
        res.json();
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/", [auth], async (req, res) => {
  const category = {
    userId: req.user.userId,
    id: req.body.id,
    itemId: req.body.itemId,
  };
  Post.find({ userId: req.user.userId, id: req.body.id }, async (err, docs) => {
    if (docs.length <= 0) {
      const post = new Post(category);
      try {
        const savedPost = await post.save();
        res.send("Success");
      } catch (error) {
        console.log(error);
      }
    } else if (docs.length > 0) {
      Post.updateOne(
        { userId: req.user.userId, id: req.body.id },
        category,
        function (err, result) {
          if (err) {
            console.log(err);
          } else {
            res.send("updated");
          }
        }
      );
    } else if (err) {
      console.log(err);
    }
  });
});

router.put("/", [auth], async (req, res) => {
  try {
    const result = await Post.deleteOne({
      userId: req.user.userId,
      id: req.body.id,
    });
    const regexp = new RegExp("^" + req.body.id + "(.*)$");
    await PostSubCategories.deleteMany({
      userId: req.user.userId,
      id: { $regex: regexp },
    });
    await PostProduct.deleteMany({
      userId: req.user.userId,
      id: { $regex: regexp },
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
