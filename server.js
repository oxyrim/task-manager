const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

const app = express();

app.use(cors());

// Connect mongoDB
connectDB();

//Init Middleware/bodyparser
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  //res.send('<h1>Hello World</h1>');
  res.json({ message: 'Welcome! Task Manager API' });
});

// Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
