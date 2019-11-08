const mongoose = require('mongoose');

const TrackerSchema = mongoose.Schema ({
  _id: String,
  pair_password: String,
  secret: String,
  public_key: String,
  history_count: Number,
  history: [{
    _id: Date,
    position: {
      accuracy: Number,
      altitude: Number,
      lat: Number,
      lon: Number,
      speed: Number
    },
    battery: {
      level: Number,
      charging: Boolean
    }
  }],
});

const Tracker = module.exports = mongoose.model('tracker', TrackerSchema);

module.exports.getTrackerById = function(id, callback) {
  Tracker.findById(id, callback);
}

module.exports.addTracker = function(newTracker, callback) {
  newTracker.save(callback);
}

module.exports.updateTracker = function(newTracker, callback) {
  Tracker.updateOne(newTracker, callback);
}