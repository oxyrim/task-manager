const mongoose = require('mongoose');
const { ItemsSchema } = require('./Items');

const TaskSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  type: {
    type: String,
    require: true,
  },
  items: {
    type: [ItemsSchema],
  },
});

//Export model
module.exports = mongoose.model('task', TaskSchema);
