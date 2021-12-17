// login, authentication and route check to logged in users
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

// @route       GET api/auth
// @desc        Get logged in users
// @access      Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'server error' });
  }
});

// @route       POST api/auth
// @desc        Authenticate user and get token
// @access      Public
router.post(
  '/',
  [
    body('email', 'Please enter email').isEmail(),
    body('password', 'Please enter password').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let foundUser = await User.findOne({ email });
      if (!foundUser) {
        return res.status(400).json({ message: 'Invalid email/password' });
      }
      bcrypt.compare(password, foundUser.password, (error, result) => {
        if (!result) {
          return res.status(400).json({ message: 'Invalid email/password' });
        }

        jwt.sign(
          { user: { id: foundUser.id } },
          process.env.JWT_SECRET,
          (error, token) => {
            if (error) throw error;
            res.json({ token });
          }
        );
      });
    } catch (error) {
      console.log(error.message);
      res.stauts(500).send('Server error');
    }
  }
);

module.exports = router;
