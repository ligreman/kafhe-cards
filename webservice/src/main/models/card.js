'use strict';

module.exports = function (mongoose) {
    var CardSchema = mongoose.Schema({
        id: {type: String, index: true},
        name: {type: String, required: true},
        'type': {type: String, enum: ['weapon', 'armor', 'skill', 'place', 'encounter', 'event'], required: true},
        contained_in_packs: [{
            category: String,
            frequency: Number
        }],
        element: {type: String, enum: ['none', 'fire', 'ice', 'poison', 'electricity'], default: 'none'},
        effects: [String],
        data: {
            place: {
                lat: Number,
                long: Number,
                region: String,
                level: Number,
                pack_reward: String,
                'type': {type: String, enum: ['town', 'capital', 'zone', 'dungeon']},
                adjacent_places: [String]
            }
        }
    }, {versionKey: false});

    // el String de adjacent_places es el id de la carta de lugar adyacente

    return mongoose.model('Card', CardSchema);
};
