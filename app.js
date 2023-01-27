const express = require('express');
const app = express();
const port = 3005;
app.use(express.json());
const carRouter = require('./router/carRouter');
const mongoose = require('mongoose');
mongoose
  .connect('mongodb://localhost:27017/cars', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('connected to mongoose 😁');
  });

app.use('/api/cars', carRouter);
app.listen(port, () => {
  console.log('connected successfully');
});

app.route('/').get((req, res) => {
  res.status(200).json({
    status: 'success'
  });
});
