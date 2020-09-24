const express = require("express");
const router = express.Router();
const PostProduct = require("../modal/PostProduct");
const getProducts = require("../modal/GetProducts");
const auth = require("../midddleware/auth");

router.get("/", [auth], async (req, res) => {
  const regexp = new RegExp("^" + req.query.id + "(.*)$");
  try {
    if (req.user.userType != "buyer") {
      const products = await PostProduct.find({
        userId: req.user.userId,
        id: { $regex: regexp },
      });

      if (products.length > 0) {
        var i = 0;
        var data = [];
        while (i < products.length) {
          const result = await getProducts.find({
            id: products[i].itemId,
          });
          data.push(result[0]);
          i++;
        }
        res.json(data);
      } else {
        res.json();
      }
    } else {
      //buyer
      const products = await PostProduct.find({
        userId: req.query.shopId,
        id: { $regex: regexp },
      });

      if (products.length > 0) {
        var i = 0;
        var data = [];
        while (i < products.length) {
          const result = await getProducts.find({
            id: products[i].itemId,
          });
          data.push(result[0]);
          i++;
        }
        res.json(data);
      } else {
        res.json();
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/", [auth], async (req, res) => {
  const product = {
    userId: req.user.userId,
    id: req.body.id,
    itemId: req.body.itemId,
  };
  PostProduct.find(
    { userId: req.user.userId, id: req.body.id },
    async (err, docs) => {
      if (docs.length <= 0) {
        const post = new PostProduct(product);
        try {
          const savedPost = await post.save();
          res.send("Success");
        } catch (error) {
          console.log(error);
        }
      } else if (docs.length > 0) {
        PostProduct.updateOne(
          { userId: req.user.userId, id: req.body.id },
          product,
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

router.put("/", [auth], async (req, res) => {
  try {
    const result = await PostProduct.deleteOne({
      userId: req.user.userId,
      id: req.body.id,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
