const express = require('express');

const app = express();

app.get('/', (req, res) => {
  //res.send('<h1>Hello World</h1>');
  res.json({ message: 'Welcome! Task Manager API' });
});

// Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
