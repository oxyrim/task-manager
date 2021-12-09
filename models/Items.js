const mongoose = require('mongoose');

const ItemsSchema = mongoose.Schema({
  item_name: {
    //Task
    type: String,
    require: true,
  },
  // type: {
  //   //ToDO, Doing, Done
  //   type: String,
  // },
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
