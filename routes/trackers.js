const express = require('express');
const router = express.Router();
const Tracker = require('../models/tracker');
const _ = require('lodash');

const history_count = 10

updateCallBack = function (err, tracker)  {
    console.log("Call back")

    socket.to('main').emit('message', { tracker: tracker });
}

function createRouter(socket){
    router.post('/track', (req, res, next) =>{
        // Parse boolean variables in request body
        if (req.body.battery.charging == "true"){
            charging = true;
        } else {
            charging = false;
        }

        // Check if tracker exists else create
        Tracker.getTrackerById(req.body.device.id, (err, tracker) => {
            if(tracker){ // Tracker exists update database
                // Add new history point
                let newHistoryPoint = {
                    _id: new Date(Number(req.body.position.time)),
                    position: {
                        accuracy: Number(req.body.position.accuracy),
                        altitude: Number(req.body.position.altitude),
                        lat: Number(req.body.position.lat),
                        lon: Number(req.body.position.lon),
                        speed: Number(req.body.position.speed)
                    },
                    battery: {
                        level: Number(req.body.battery.level),
                        charging: charging
                    }
                }
                tracker.history.push(newHistoryPoint)

                // sort history points by time
                tracker.history = _.sortBy(tracker.history, [function(h) { return h._id; }]);

                // Maintain history length
                if(tracker.history.length >= tracker.history_count) {
                    tracker.history = _.slice(tracker.history, 0, tracker.history_count)
                }

                // Update database
                Tracker.updateTracker(tracker, updateCallBack)
            } else { // Tracker does not exist create new
                let newTracker = new Tracker ({
                    _id: req.body.device.id,
                    pair_password: "None",
                    secret: req.body.device.secret,
                    public_key: "None",
                    history_count: history_count,
                    history: [{
                      _id: new Date(Number(req.body.position.time)),
                      position: {
                        accuracy: Number(req.body.position.accuracy),
                        altitude: Number(req.body.position.altitude),
                        lat: Number(req.body.position.lat),
                        lon: Number(req.body.position.lon),
                        speed: Number(req.body.position.speed)
                      },
                      battery: {
                        level: Number(req.body.battery.level),
                        charging: charging
                      }
                    }],
                });
                Tracker.addTracker(newTracker, updateCallBack)
            }
        })

        res.json('This is backend, Got your data !');
        
    
    });
    
    return router;
}











module.exports = createRouter;