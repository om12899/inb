const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchuser = require("../middleware/Fetchuser");


const JWT_Secret = 'omissexy';
//Route 1 : Signup
router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Enter a valid name").isLength({ min: 2 }),
    body("password", "Password must be at least 6 characters long").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Sorry, the email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const securedPassword = await bcrypt.hash(req.body.password, salt);

      user = new User({
        name: req.body.name,
        password: securedPassword,
        email: req.body.email,
      });
      const data = {
        user : {
          id: user.id
        }
      }
       const AuthToken =  jwt.sign(data,JWT_Secret)
      // console.log(AuthToken);
      res.json({AuthToken})
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error error occurred");
    }
  }
);


//Route 2 : Login
router.post('/verifyuser', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ errors: 'Please try to login with correct credentials' });
    }

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ errors: 'Please try to login with correct credentials' });
    }

    const payload = {
      user: {
        id: user.id
      }
    };
    const authToken = jwt.sign(payload, JWT_Secret);
    res.json({ authToken });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server error occurred");
  }
}); 

//ROute 3 : Get User from JWT : Login required
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    console.log('User ID from token:', req.user.id);
    var userid = req.user.id;
    const user = await User.findById(userid).select('-password');
    if (!user) {
      console.log('User not found in the database');
      return res.status(404).send('User not found');
    }
    console.log('User data retrieved:', user);
    res.json(user);
  } catch (error) {
    console.log('Error in route:', error.message);
    res.status(500).send('Internal Server error occurred');
  }
});
module.exports = router;