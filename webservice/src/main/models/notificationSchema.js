'use strict';

module.exports = function (mongoose) {
    var NotificationSchema = mongoose.Schema({
        message: String,
        params: String,
        source: String,
        'type': {type: String, enum: ['system', 'skill'], required: true}, // combat, exploration,
        timestamp: Number
    }, {versionKey: false});

    return NotificationSchema;
};
