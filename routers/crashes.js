const express = require('express');
const { CrashModel, CarModel } = require('../database');
const { wrapper } = require('../wrapper');

const router = express.Router();

router.get('/', async (req, res) => {
  const crashes = await CrashModel.find()
    .populate('carId');

  res.send({ crashes });
});

router.post('/', wrapper(async (req, res) => {
  const { carId, message } = req.body;

  const car = await CarModel.findById(carId);

  if (!car) throw new Error('Car not found');

  const crash = await CrashModel.create({
    message,
    carId: car._id,
  });

  car.crashes = [...(car.crashes || []), crash._id];

  await car.save();

  res.send(crash);
}));

exports.crashRouter = router;
