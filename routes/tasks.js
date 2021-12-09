// CRUD functionality
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const User = require('../models/User');
const List = require('../models/List');
const { Items, ItemsSchema } = require('../models/Items');

// @route       GET api/tasks
// @desc        Get all users tasks
// @access      Private
router.get('/', auth, async (req, res) => {
  try {
    const list = await List.find({ user: req.user.id });
    res.json({ auth: true, list });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
});

// @route       POST api/tasks
// @desc        Add new task
// @access      Private
router.post(
  '/',
  [auth, [body('list_name').notEmpty(), body('item_name').notEmpty()]],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ add: false, message: errors.array() });
    }

    const { due_date, item_name, list_name } = req.body;

    List.findOne({ list_name }, (error, foundList) => {
      if (!error) {
        if (!foundList) {
          const list = new List({
            user: req.user.id,
            list_name,
          });
          list.save();
          return res.json(list);
        } else {
          //res.json({ message: 'List already exists' });
          const item = new Items({
            item_name,
            due_date,
          });
          foundList.items.push(item);
          foundList.save();
          //res.json(foundList);
          res.json(item);
        }
      }
    });
    try {
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ add: false, message: 'error' });
    }
  }
);

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
