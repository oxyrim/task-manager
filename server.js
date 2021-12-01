const express = require('express');

const app = express();

app.get('/', (req, res) => {
  //res.send('<h1>Hello World</h1>');
  res.json({ message: 'Welcome! Task Manager API' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
