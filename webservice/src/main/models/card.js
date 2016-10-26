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
                subtype: {type: String, enum: ['forest', 'mountain', 'lake', 'desert', 'swamp']},
                adjacent_places: [String],
                capital: String
            }
        }
    }, {versionKey: false});

    // contained_in_packs indica en qué tipos de sobres sale y con qué frecuencia. Si el id es 'all' es que sale en cualquier sobre.
    // las 'zonas' no salen en ningún sobre, porque no son cartas como tal, aunque se almacenen como si fueran.
    // Tampoco las capitales ya que las tienes siempre

    // pack_reward indica qué tipos de sobres de recompesa da.
    // el String de adjacent_places es el id de la carta de lugar adyacente

    return mongoose.model('Card', CardSchema);
};
