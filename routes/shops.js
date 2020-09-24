const express = require("express");
const router = express.Router();
const PostShop = require("../modal/PostShop");
const PostBuyer = require("../modal/PostBuyer");
const PostBuyerShop = require("../modal/PostBuyerShops");
const auth = require("../midddleware/auth");
router.get("/", [auth], async (req, res) => {
  var lat, latU, latL;
  var lng, lngU, lngL;
  var range = 5;
  try {
    const customer = await PostBuyer.find({ id: req.user.userId });
    lat = customer[0].latitude;
    lng = customer[0].longitude;
    latU = lat + range;
    latL = lat - range;
    lngU = lng + range;
    lngL = lng - range;
  } catch (error) {
    console.log(error);
  }
  try {
    const shops = await PostShop.find({
      latitude: { $gte: latL, $lte: latU },
      longitude: { $gte: lngL, $lte: lngU },
    });
    res.json(shops);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", [auth], async (req, res) => {
  const shopData = {
    userId: req.user.userId,
    shopId: req.body.shopId,
  };
  PostBuyerShop.find(
    { userId: req.user.userId, shopId: req.body.shopId },
    async (err, docs) => {
      if (docs.length <= 0) {
        const post = new PostBuyerShop(shopData);
        try {
          const savedPost = await post.save();
          res.send("Success");
        } catch (error) {
          console.log(error);
        }
      } else {
        res.send();
      }
    }
  );
});

module.exports = router;
