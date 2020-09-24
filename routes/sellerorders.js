const express = require("express");
const router = express.Router();
const auth = require("../midddleware/auth");
const PostOrder = require("../modal/PostOrder");
const Products = require("../modal/GetProducts");
router.get("/", async (req, res) => {
  try {
    if (req.query.customerId) {
      console.log("entered");
      const result = await PostOrder.find({
        shopId: req.query.userId, //query==user
        userId: req.query.customerId,
        status: true,
      });
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
    } else {
      const result = await PostOrder.find({
        shopId: req.query.userId, //query==user
        status: true,
      });
      if (result.length > 0) {
        var index = 0;
        var map = {};
        var arr = [];
        while (index < result.length) {
          map[result[index].userId] = result[index].userId;
          index++;
        }
        for (i in map) {
          arr.push(i);
        }
        res.json(arr);
      } else {
        res.json();
      }
    }
  } catch (error) {
    console.log(error);
    res.json();
  }
});

module.exports = router;
