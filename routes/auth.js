// login, authentication and route check to logged in users
const express = require('express');
const router = express.Router();

// @route       GET api/auth
// @desc        Get logged in users
// @access      Private
router.get('/', (req, res) => {
  res.send('Get logged in users');
});

// @route       POST api/auth
// @desc        Authenticate user and get token
// @access      Public
router.post('/', (req, res) => {
  res.send('Login user');
});

module.exports = router;
