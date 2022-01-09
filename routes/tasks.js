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
  [
    auth,
    [
      body('list_name').notEmpty(),
      //body('item_name').notEmpty()
    ],
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ add: false, message: errors.array() });
    }

    const { item: update_item, list_name, index, user_id } = req.body;
    // { due_date, item_name } = item;
    console.log(user_id);

    try {
      List.findOne({ list_name, user_id: null }, (error, foundList) => {
        if (!error) {
          if (!foundList) {
            const list = new List({
              user: req.user.id,
              list_name,
            });
            list.save();
            return res.json(list);
          }
        }
      });
      List.findOne({ list_name, user_id }, (error, foundList) => {
        if (!error) {
          if (foundList !== null) {
            if (index !== null) {
              const item = new Items({
                user: req.user.id,
                item_name: update_item.item_name,
                due_date: update_item.due_date,
              });
              foundList.items.splice(index, 0, item);
              foundList.save();
              res.json(foundList);
            } else {
              const { due_date, item_name } = req.body.item;
              const item = new Items({
                user: req.user.id,
                item_name,
                due_date,
              });
              foundList.items.push(item);
              foundList.save();
              res.json(foundList);
            }
          }
        }
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ add: false, message: 'error' });
    }
  }
);

// @route       PUT api/tasks/:list_id/:item_id?(optional)
// @desc        Update task
// @access      Private
router.put('/:list_id/:item_id?', auth, async (req, res) => {
  const { list_name, item_name, due_date } = req.body;

  try {
    let list = await List.findById(req.params.list_id);
    if (!list) {
      return res.status(404).json({ list: false, message: 'List not found' });
    }

    //Check if the user is the owner if list
    if (list.user.toString() !== req.user.id) {
      return res.status(401).json({ auth: false, message: 'Not authorized.' });
    }

    //Check if the list_name is provided
    if (list_name) {
      list = await List.findByIdAndUpdate(
        req.params.list_id,
        { $set: { list_name: list_name } },
        { new: true }
      );
    }

    //Check if the item_name is provided
    if (item_name) {
      list = await List.findOneAndUpdate(
        {
          _id: req.params.list_id,
          'items._id': req.params.item_id,
        },
        { $set: { 'items.$.item_name': item_name } },
        { new: true }
      );
    }

    //Check if the due_date is provided
    if (due_date) {
      list = await List.findOneAndUpdate(
        {
          _id: req.params.list_id,
          'items._id': req.params.item_id,
        },
        { $set: { 'items.$.due_date': due_date } },
        { new: true }
      );
    }
    res.json(list);
    //if (due_date) listFields.items.due_date = due_date;
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ add: false, message: 'error' });
  }
});

// @route       DELETE api/tasks/:id
// @desc        Delete task
// @access      Private
router.delete('/:list_id/:item_id', auth, async (req, res) => {
  try {
    let list = await List.findById(req.params.list_id);
    if (!list) return res.status(400).json({ message: 'Item not found.' });

    //Check if the user owns the item
    if (list.user.toString() !== req.user.id) {
      return res.status(401).json({ auth: false, message: 'Not authorized.' });
    }
    list = await List.findOneAndUpdate(
      {
        _id: req.params.list_id,
      },
      { $pull: { items: { _id: req.params.item_id } } }
    );

    res.status(200).json({ message: 'Item removed.' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ add: false, message: 'error' });
  }
});

module.exports = router;
