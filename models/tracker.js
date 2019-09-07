const mongoose = require('mongoose');

const TrackerSchema = mongoose.Schema ({
  _id: String,
  pair_password: String,
  secret: String,
  public_key: String,
  history_count: Number,
  history: [{
    time: Date,
    data: {
      location: {
        lat: Number,
        lon: Number
      },
    }
  }],
});

const Tracker = module.exports = mongoose.model('user', TrackerSchema);

module.exports.getTrackerById = function(id, callback) {
  Tracker.findById(id, callback);
}

module.exports.addTracker = function(newTracker, callback) {
  newTracker.save(callback);
}

module.exports.updateTracker = function(newTracker, callback) {
  Tracker.updateOne(newTracker, callback);
}