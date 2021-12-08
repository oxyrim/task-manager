// CRUD functionality
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Task = require('../models/Task');
const { Items } = require('../models/Items');

// @route       GET api/tasks
// @desc        Get all users tasks
// @access      Private
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json({ auth: true, tasks });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
});

// @route       POST api/tasks
// @desc        Add new task
// @access      Private
router.post('/', (req, res) => {
  res.send('Add task');
});

// @route       PUT api/tasks/:id
// @desc        Update task
// @access      Private
router.put('/:id', (req, res) => {
  res.send('Update task');
});

// @route       DELETE api/tasks/:id
// @desc        Delete task
// @access      Private
router.delete('/:id', (req, res) => {
  res.send('Delete task');
});

module.exports = router;
