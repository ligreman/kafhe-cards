'use strict';

module.exports = function (mongoose) {
    var CardSchema = mongoose.Schema({
        id: {type: String, index: true},
        title: {type: String, required: true},
        'type': {type: String, enum: ['weapon', 'armor', 'skill', 'place', 'encounter', 'event'], required: true},
        element: {type: String, enum: ['fire', 'water', 'earth', 'air'], required: true},
        level: {type: Number, default: 1},
        effects: [String],
        data: {
            place: {
                name: String,
                lat: Number,
                long: Number,
                region: String,
                'type': {type: String, enum: ['town', 'city', 'zone', 'dungeon']},
                adjacent_places: [String]
            }
        }
    }, {versionKey: false});

    // el String de adjacent_places es el id de la carta de lugar adyacente

    return mongoose.model('Card', CardSchema);
};
