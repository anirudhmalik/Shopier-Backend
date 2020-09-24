const express = require("express");
const router = express.Router();
const PostProduct = require("../modal/GetProducts");

router.get("/", async (req, res) => {
  try {
    const categories = await PostProduct.find();
    res.json(categories);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  const product = {
    id: req.body.id,
    label: req.body.label,
    uri: req.body.uri,
    cost: req.body.cost,
    quantity: req.body.quantity,
    value: req.body.value,
  };
  PostProduct.find({ id: req.body.id }, async (err, docs) => {
    if (docs.length <= 0) {
      const post = new PostProduct(product);
      try {
        const savedPost = await post.save();
        res.send("Success");
      } catch (error) {
        console.log(error);
      }
    } else if (docs.length > 0) {
      PostProduct.updateOne({ id: req.body.id }, product, function (
        err,
        result
      ) {
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
