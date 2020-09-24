const express = require("express");
const router = express.Router();
const PostBuyerShop = require("../modal/PostBuyerShops");
const PostShop = require("../modal/PostShop");
const auth = require("../midddleware/auth");
router.get("/", [auth], async (req, res) => {
  try {
    const shops = await PostBuyerShop.find({ userId: req.user.userId });
    if (shops.length > 0) {
      var index = 0;
      var data = [];
      while (index < shops.length) {
        const result = await PostShop.find({ userId: shops[index].shopId });
        data.push(result[0]);
        index++;
      }
      res.json(data);
    } else {
      res.json();
    }
  } catch (error) {
    console.log(error);
  }
});
router.post("/", [auth], async (req, res) => {
  PostBuyerShop.find(
    { userId: req.user.userId, shopId: req.body.shopId },
    async (err, docs) => {
      if (docs.length > 0) {
        res.send("true");
      } else {
        res.send("false");
      }
    }
  );
});
router.put("/", [auth], async (req, res) => {
  try {
    const result = await PostBuyerShop.deleteOne({
      userId: req.user.userId,
      shopId: req.body.shopId,
    });
    res.json("success");
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
