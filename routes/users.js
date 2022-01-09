// Register Route
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { body, validationResult } = require('express-validator');

// @route       POST api/users
// @desc        Register a user
// @access      Public
router.post(
  '/',
  //validation of name, eamil, password with express-validator
  [
    body('name', 'Name cannot be empty').notEmpty(),
    body('email', 'Enter valid email').isEmail(),
    body('password', 'Password should have minimun of 5 characters').isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //Check if the user already exist
      let user = await User.findOne({ email });
      //If user found
      if (user) {
        return res.status(400).json({ message: 'User already exist.' });
      }
      //If user not found create a new user
      user = new User({
        name,
        email,
        password,
      });

      const saltRounds = 10;
      //hash the password
      user.password = await bcrypt.hash(password, saltRounds);

      //Save new user in DB
      await user.save((err) => {
        if (err) {
          throw err;
        }
      });

      //And create token and respond with token
      jwt.sign(
        { user: { id: user.id } },
        process.env.JWT_SECRET,
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;
