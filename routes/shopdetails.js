const express = require("express");
const router = express.Router();
const PostDetail = require("../modal/PostDetail");
const auth = require("../midddleware/auth");
const PostShop = require("../modal/PostShop");

router.get("/", [auth], async (req, res) => {
  try {
    if (req.user.userType != "buyer") {
      const details = await PostDetail.find({
        userId: req.user.userId,
        id: req.query.id,
      });
      if (details.length > 0) {
        res.json(details[0].value);
      } else {
        res.json();
      }
    } else {
      const details = await PostDetail.find({
        userId: req.query.shopId,
        id: req.query.id,
      });
      if (details.length > 0) {
        res.json(details[0].value);
      } else {
        res.json();
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/", [auth], async (req, res) => {
  const detail = {
    userId: req.user.userId,
    id: req.body.id,
    value: req.body.value,
  };
  if (req.body.id == "shpnme") {
    const detail2 = { shopname: req.body.value };
    PostShop.updateOne({ userId: req.user.userId }, detail2, function (
      err,
      result
    ) {
      if (err) {
        console.log(err);
      }
    });
  }
  PostDetail.find(
    { userId: req.user.userId, id: req.body.id },
    async (err, docs) => {
      if (docs.length <= 0) {
        const post = new PostDetail(detail);
        try {
          const savedPost = await post.save();
          res.send("Success");
        } catch (error) {
          console.log(error);
        }
      } else if (docs.length > 0) {
        PostDetail.updateOne(
          { userId: req.user.userId, id: req.body.id },
          detail,
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
    }
  );
});

module.exports = router;
