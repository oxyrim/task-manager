// Register Route
const express = require('express');
const router = express.Router();
const User = require('../models/User');
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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send('passed');
  }
);

module.exports = router;
