const mongoose = require('mongoose');
const config = require('../config');

class Connection {
  constructor() {
    this.connection = null;
  }

  async init() {
    this.connection = await mongoose.connect(config.mongoose.connectionUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
  }
}

exports.connection = new Connection();
