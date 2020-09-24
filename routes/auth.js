const express = require("express");
const router = express.Router();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const Post = require("../modal/PostUser");
const PostBuyer = require("../modal/PostBuyer");
router.post("/", (req, res) => {
  const { phone, password } = req.body;

  if (req.body.id == "seller") {
    Post.find({ phone: req.body.phone }, async (err, docs) => {
      if (docs.length > 0) {
        try {
          if (docs[0].password !== password)
            return res
              .status(400)
              .send({ error: "Invalid email or password." });
        } catch (error) {
          return res.status(400).send({ error: "Invalid email or password." });
        }
        const token = jwt.sign(
          {
            userId: docs[0].id,
            userType: docs[0].user,
            name: docs[0].name,
            phone,
          },
          "jwtPrivateKey"
        );
        res.send(token);
      }
      if (docs.length <= 0) {
        return res.status(400).send({ error: "Please SignUp" });
      }
    });
  } else if (req.body.id == "buyer") {
    PostBuyer.find({ phone: req.body.phone }, async (err, docs) => {
      if (docs.length > 0) {
        try {
          if (docs[0].password !== password)
            return res
              .status(400)
              .send({ error: "Invalid email or password." });
        } catch (error) {
          return res.status(400).send({ error: "Invalid email or password." });
        }
        const token = jwt.sign(
          {
            userId: docs[0].id,
            userType: docs[0].user,
            name: docs[0].name,
            phone,
          },
          "jwtPrivateKey"
        );
        res.send(token);
      }
      if (docs.length <= 0) {
        return res.status(400).send({ error: "Please SignUp" });
      }
    });
  }
});

module.exports = router;
