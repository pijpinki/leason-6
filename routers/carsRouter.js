const express = require('express');
const { CarModel } = require('../database/models/CarModel');
const { wrapper } = require('../wrapper');

const router = express.Router();

router.get('/', wrapper(async (req, res) => {
  const cars = await CarModel.find()
    .populate('crashes');

  res.send({ cars });
}));

router.post('/sample', wrapper(async (req, res) => {
  const sample = new CarModel({ model: "tesla" });

  sample.addOwner({ name: 'kok' });

  await sample.save();

  res.send();
}))

router.post('/', wrapper(async (req, res) => {
  const { model, power, carType } = req.body;

  const car = await CarModel.create({ model, power, carType });

  res.send({ car });
}));

router.put('/:id', async (req, res) => {
  const { name, age, email } = req.body;

  const car = await CarModel.findById(req.params.id);

  if (!car) throw new Error('Car not found');

  await car.addOwner({ name, age, email });

  res.send({ car });
});

router.delete('/:id', async (req, res) => {
  const car = await CarModel.findById(req.params.id);

  if (!car) throw new Error('Car not found');

  await car.delete();

  res.send();
});

exports.carsRouter = router;
