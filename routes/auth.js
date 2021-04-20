const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../model/User");
const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
  // Validate before make  a user
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checking if the user is already in the databse
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exist.");

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    // const savedUser = await user.save();
    // res.send(savedUser);
    const { name, email } = await user.save();
    res.send({ name, email });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
