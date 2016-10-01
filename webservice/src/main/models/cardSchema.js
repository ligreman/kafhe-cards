'use strict';

module.exports = function (mongoose) {
    var CardSchema = mongoose.Schema({
        id: {type: String, index: true},
        title: {type: String, required: true},
        'type': {type: String, enum: ['weapon', 'armor', 'skill', 'place', 'encounter', 'event'], required: true},
        element: {type: String, enum: ['fire', 'water', 'earth', 'air'], required: true},
        level: {type: Number, default: 1},
        effects: [String]
    }, {versionKey: false});

    return CardSchema;
};
