const mongoose = require('mongoose');

const ItemsSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  item_name: {
    //Task
    type: String,
    require: true,
  },
  due_date: {
    type: Date,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//Export model
const Items = mongoose.model('items', ItemsSchema);
exports.Items = Items;
exports.ItemsSchema = ItemsSchema;
