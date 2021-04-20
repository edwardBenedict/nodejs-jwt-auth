const router = require("express").Router();
const verify = require("./verifyToken");

router.get("/", verify, (req, res) => {
  res.json({
    posts: { title: "my post title", description: "my post description" },
  });
  //   res.send(req.user);
});

module.exports = router;
