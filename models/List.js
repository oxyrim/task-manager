const mongoose = require('mongoose');
const { ItemsSchema } = require('./Items');

const ListSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  list_name: {
    type: String,
    require: true,
  },
  items: {
    type: [ItemsSchema],
  },
});

//Export model
module.exports = mongoose.model('list', ListSchema);
