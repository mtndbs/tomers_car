const express = require('express');
const Car = require('../models/carModel');
const router = express.Router();
const fs = require('fs');

router
  .route('/')
  .get(async (req, res) => {
    const allCars = await Car.find();

    res.status(200).json({
      status: 'success',
      result: allCars.length,
      data: { allCars }
    });
  })
  .post(async (req, res) => {
    try {
      console.log('recieved post');
      const newCar = await Car.create(req.body);
      res.status(201).json({ status: 'success', data: newCar });
    } catch (error) {
      console.log(error);
      res.status(404);
    }
  });

router.route('/:id/buy').get(async (req, res) => {
  try {
    let { id } = req.params;
    let carById = await Car.findById(id);
    console.log(carById);

    if (carById.quantity > 0) {
      let correntQuant = carById.quantity - 1;
      console.log(correntQuant);
      await Car.findByIdAndUpdate(id, { quantity: correntQuant });

      res.status(201).json({ status: 'success' });
    }
  } catch (error) {
    console.log(error);
    res.status(404);
  }
});

router.route('/init').get(async (req, res) => {
  await Car.collection.drop();
  fs.readFile(`./cars.json`, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    let parsedData = JSON.parse(data);

    // let parsedData = JSON.parse(data);
    // console.log(parsedData);
    Car.create(parsedData);
    res.status(200).json({ parsedData });
  });

  // let parseData = JSON.parse(jsonData);
});

module.exports = router;
