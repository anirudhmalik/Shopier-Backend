const express = require("express");
const router = express.Router();
const auth = require("../midddleware/auth");
const PostOrder = require("../modal/PostOrder");
const Products = require("../modal/GetProducts");
router.get("/", [auth], async (req, res) => {
  try {
    const result = await PostOrder.find({
      userId: req.user.userId, //query==user
      shopId: req.query.shopId,
      status: req.query.status,
    });
    if (req.query.length == "true") {
      res.json(result.length);
    } else {
      if (result.length > 0) {
        var index = 0;
        var data = [];
        while (index < result.length) {
          const result1 = await Products.find({ id: result[index].productId });
          data.push(result1[0]);
          index++;
        }
        res.json(data);
      } else {
        res.json();
      }
    }
  } catch (error) {
    console.log(error);
    res.json();
  }
});
router.post("/", [auth], async (req, res) => {
  PostOrder.updateMany(
    {
      userId: req.user.userId,
      shopId: req.body.shopId,
      status: false,
    },
    { status: true },
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send("order placed Successfully");
      }
    }
  );
});
module.exports = router;
