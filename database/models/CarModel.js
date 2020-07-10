const mongoose = require('mongoose');

const CarSchema = mongoose.Schema({
  model: { type: String, required: true },
  power: {
    type: Number,
    min: 1,
  },
  carType: {
    type: String,
    enum: ['sedan', 'universal'],
    required: true,
  },
  owners: [
    {
      name: String,
      age: Number,
      email: {
        type: String,
        validate: (value) => {
          if (!value.includes('@')) throw 'Error not email';

          return true;
        }
      }
    },
  ],
  crashes: [{ type: mongoose.Schema.ObjectId, ref: 'Crash' }],
  created: { type: Date, default: Date.now },
  updated: Date,
});

CarSchema.static('addSample', function () {
  return this.create({
    model: Math.random().toString(),
    power: 100,
    carType: 'sedan',
  });
});

CarSchema.method('addOwner', function (owner) {
  this.owners.push(owner);
  return this.save();
});

CarSchema.pre('save', function (next) {
  this.updated = new Date();

  next();
});


exports.CarModel = mongoose.model('Car', CarSchema);
