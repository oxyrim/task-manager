const mongoose = require('mongoose');

const ItemsSchema = mongoose.Schema({
  name: {
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
module.exports.Items;
module.exports.ItemsSchema;
