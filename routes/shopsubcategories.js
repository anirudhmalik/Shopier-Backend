const express = require("express");
const router = express.Router();
const PostSubCategories = require("../modal/PostSubCategories");
const getSubCategories = require("../modal/GetSubCategories");
const PostProduct = require("../modal/PostProduct");
const auth = require("../midddleware/auth");

router.get("/", [auth], async (req, res) => {
  try {
    if (req.user.userType != "buyer") {
      const subcategories = await PostSubCategories.find({
        userId: req.user.userId,
        id: req.query.id,
      });
      if (subcategories.length > 0) {
        const result = await getSubCategories.find({
          id: subcategories[0].itemId,
        });
        res.json(result);
      } else {
        res.json();
      }
    } else {
      const subcategories = await PostSubCategories.find({
        userId: req.query.shopId,
        id: req.query.id,
      });
      if (subcategories.length > 0) {
        const result = await getSubCategories.find({
          id: subcategories[0].itemId,
        });
        res.json(result);
      } else {
        res.json();
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/", [auth], async (req, res) => {
  const subcategory = {
    userId: req.user.userId,
    id: req.body.id,
    itemId: req.body.itemId,
  };
  PostSubCategories.find(
    { userId: req.user.userId, id: req.body.id },
    async (err, docs) => {
      if (docs.length <= 0) {
        const post = new PostSubCategories(subcategory);
        try {
          const savedPost = await post.save();
          res.send("Success");
        } catch (error) {
          console.log(error);
        }
      } else if (docs.length > 0) {
        PostSubCategories.updateOne(
          { userId: req.user.userId, id: req.body.id },
          subcategory,
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
    const result = await PostSubCategories.deleteOne({
      userId: req.user.userId,
      id: req.body.id,
    });
    const regexp = new RegExp("^" + req.body.id + "(.*)$");
    await PostProduct.deleteMany({
      userId: req.user.userId,
      id: { $regex: regexp },
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
