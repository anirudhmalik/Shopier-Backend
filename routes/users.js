const express = require("express");
const router = express.Router();
const Post = require("../modal/PostUser");
const PostBuyer = require("../modal/PostBuyer");
const PostShop = require("../modal/PostShop");

router.post("/", async (req, res) => {
  const user = {
    id: req.body.phone,
    name: req.body.name,
    user: req.body.id,
    phone: req.body.phone,
    password: req.body.password,
  };
  const user1 = {
    userId: req.body.phone,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    shopname: "Shop Name",
  };
  if (req.body.id == "seller") {
    Post.find({ phone: req.body.phone }, async (err, docs) => {
      if (docs.length <= 0) {
        const post = new Post(user);
        const postShop = new PostShop(user1);
        try {
          const savedPost = await post.save();
          const saved = await postShop.save();
          res.send("Registration successful");
        } catch (error) {
          console.log(error);
        }
      } else if (docs.length > 0) {
        res
          .status(400)
          .send({ error: "A user with the given email already exists." });
      } else if (err) {
        console.log(err);
      }
    });
  } else if (req.body.id == "buyer") {
    
    const user2 = {
      id: req.body.phone,
      user: req.body.id,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      name: req.body.name,
      phone: req.body.phone,
      password: req.body.password,
    };
    PostBuyer.find({ phone: req.body.phone }, async (err, docs) => {
      if (docs.length <= 0) {
        const post = new PostBuyer(user2);
        try {
          const savedPost = await post.save();
          res.send("Registration successful");
        } catch (error) {
          console.log(error);
        }
      } else if (docs.length > 0) {
        res
          .status(400)
          .send({ error: "A user with the given email already exists." });
      } else if (err) {
        console.log(err);
      }
    });
  }
});

//router.get("/", (req, res) => {
// res.send(usersStore.getUsers());
//});

module.exports = router;
