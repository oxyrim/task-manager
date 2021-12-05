// login, authentication and route check to logged in users
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

// @route       GET api/auth
// @desc        Get logged in users
// @access      Private
router.get('/', (req, res) => {
  res.send('Get logged in users');
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
          config.get('JWT_SECRET'),
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
