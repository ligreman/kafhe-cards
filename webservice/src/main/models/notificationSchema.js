'use strict';

module.exports = function (mongoose) {
    var NotificationSchema = mongoose.Schema({
        message: String,
        params: String,
        source: String,
        'type': {
            type: String,
            enum: ['system', 'explore', 'encounter', 'defeat', 'move', 'combat', 'victory', 'skill', 'reward', 'adversity'],
            required: true
        },
        timestamp: Number
    }, {versionKey: false});

    return NotificationSchema;
};
