const express = require('express');
const router = express.Router();
const Tracker = require('../models/tracker');
const _ = require('lodash');

const history_count = 5



function createRouter(socket){
    updateCallBack = function (err, tracker)  {
        console.log("Call back")     
    }

    sendDataToSocket = function (tracker){
        socket.to('main').emit('tracker update', { tracker });
    }
    
    router.post('/track', (req, res, next) =>{
        console.log(req.body)
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
                _.reverse(tracker.history);

                // Maintain history length
                if(tracker.history.length >= tracker.history_count) {
                    tracker.history = _.slice(tracker.history, 0, tracker.history_count)
                }

                // Send new data 
                sendDataToSocket(tracker)
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
                // Send new data 
                sendDataToSocket(newTracker)
                // Update Database
                Tracker.addTracker(newTracker, updateCallBack)
            }
        })

        res.json('This is backend, Got your data !');
        
    
    });

    router.get('/',(req, res, next) =>{
        console.log("sending all trackers")
        Tracker.getAllTrackers((err, trackers) =>{
            for (t of trackers) {
                sendDataToSocket(t)
            }
        })
        res.json('Trackers on the way');
    
    });
    
    return router;
}











module.exports = createRouter;