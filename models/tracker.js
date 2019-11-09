const mongoose = require('mongoose');

const TrackerSchema = mongoose.Schema ({
  _id: String,
  pair_password: String,
  secret: String,
  public_key: String,
  history_count: Number,
  history: [{
    _id: Number,
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

// module.exports.updateTracker = function(conditions, update, callback) {
//   Tracker.findOneAndUpdate(conditions, update, {}, callback);
// }
module.exports.updateTracker = function(conditions, newTracker, callback) {
  Tracker.remove(conditions, function (err) {
    console.log("deleting")
    if (err) {
      console.log("error")
      console.log(err)
    };
    console.log("deleted")
    console.log(newTracker)
    callback()
    // deleted at most one tank document
    // newTracker.save(callback);
  });
}



module.exports.getAllTrackers = function(callback) {
  Tracker.find({}, callback);
}

module.exports.deleteAllTrackers = function() {
  Tracker.collection.drop();
}
