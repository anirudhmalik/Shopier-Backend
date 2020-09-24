const express = require("express");
const router = express.Router();
const PostShop = require("../modal/PostShop");
const auth = require("../midddleware/auth");

router.post("/", [auth], async (req, res) => {
  const location = {
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  };
  PostShop.updateOne({ userId: req.user.userId }, location, function (
    err,
    result
  ) {
    if (err) {
      console.log(err);
    } else {
      res.send("Location Updated");
    }
  });
});
module.exports = router;
