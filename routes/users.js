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
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exist.' });
      }

      user = new User({
        name,
        email,
        password,
      });

      const saltRounds = 10;

      user.password = await bcrypt.hash(password, saltRounds);
      await user.save((err) => {
        if (err) {
          throw err;
        }
      });
      //res.send('User save to DB');
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
