const express = require("express");
const router = express.Router();
const auth = require("../midddleware/auth");
const PostOrder = require("../modal/PostOrder");
router.get("/", [auth], async (req, res) => {
  try {
    const result = await PostOrder.find({
      userId: req.user.userId,
      shopId: req.query.shopId,
      productId: req.query.productId,
      status: req.query.status,
    });
    if (result.length > 0) {
      res.json(result[0].quantity);
    } else {
      res.json("0");
    }
  } catch (error) {
    console.log(error);
    res.json(0);
  }
});
router.post("/", [auth], async (req, res) => {
  const OrderData = {
    userId: req.user.userId, //body==user
    shopId: req.body.shopId,
    productId: req.body.productId,
    quantity: 1,
    status: false,
  };
  PostOrder.find(
    {
      userId: req.user.userId, //body==user
      shopId: req.body.shopId,
      productId: req.body.productId,
      status: false,
    },
    async (err, docs) => {
      if (docs.length <= 0) {
        const post = new PostOrder(OrderData);
        try {
          const savedPost = await post.save();
          res.json("1");
        } catch (error) {
          console.log(error);
        }
      } else {
        if (req.body.what) {
          PostOrder.updateOne(
            {
              userId: req.user.userId, //body==user
              shopId: req.body.shopId,
              productId: req.body.productId,
              status: false,
            },
            { quantity: docs[0].quantity + 1 }, //incrementing quantity
            function (err, result) {
              if (err) {
                console.log(err);
              } else {
                res.json(docs[0].quantity + 1);
              }
            }
          );
        } else if (!req.body.what) {
          if (docs[0].quantity > 1) {
            PostOrder.updateOne(
              {
                userId: req.user.userId, //body==user
                shopId: req.body.shopId,
                productId: req.body.productId,
              },
              { quantity: docs[0].quantity - 1 }, //decrementing quantity
              function (err, result) {
                if (err) {
                  console.log(err);
                } else {
                  res.json(docs[0].quantity - 1);
                }
              }
            );
          } else if (docs[0].quantity == 1) {
            const result = await PostOrder.deleteOne({
              userId: req.user.userId, //body==user
              shopId: req.body.shopId,
              productId: req.body.productId,
              status: false,
            });
            res.json("0");
          } else {
            res.send("cannot remove from 0 product");
          }
        } else {
          res.send(".|.");
        }
      }
    }
  );
});

module.exports = router;
