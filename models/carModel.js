const mongoose = require('mongoose');

/*
"type": "Hatchback",
    "model": "VW Golf GTI",
    "year": 2016,
    "color": "Yellow",
    "price": 25000,
    "acceleration": 6.5,
    "maximum_speed": 230,
    "description": "The VW Golf GTI is a sporty and fun-to-drive hatchback that offers a perfect blend of per
*/

const carSchema = mongoose.Schema({
  type: {
    type: String,
    require: true
  },
  model: {
    type: String,
    require: true
  },
  year: {
    type: Number,
    require: true
  },
  color: {
    require: false,
    type: String
  },
  price: {
    type: Number,
    require: true
  },
  acceleration: {
    type: Number,
    require: false
  },
  maximum_speed: {
    type: Number,
    require: false
  },
  description: {
    type: String,
    require: false
  },
  quantity:{
    type:Number,
    
  }
});

const Car = mongoose.model('car', carSchema, 'cars');

module.exports = Car;
