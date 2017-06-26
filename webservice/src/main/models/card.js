'use strict';

module.exports = function (mongoose) {
    var StatsSchema = mongoose.Schema({
        attack: {type: Number, default: 0},
        defense: {type: Number, default: 0},
        speed: {type: Number, default: 0},
        precision: {type: Number, default: 0},
        health: {type: Number, default: 0}, // Si te cura o hace daño
        special: {type: String, default: ''},
        description: {type: String, default: ''}
    }, {versionKey: false});

    var CardSchema = mongoose.Schema({
        id: {type: String, index: true},
        name: {type: String, default: ''},
        'type': {type: String, enum: ['weapon', 'armor', 'skill', 'place'], required: true},
        contained_in_packs: [{
            category: String,
            frequency: String
        }],
        element: {type: String, enum: ['none', 'fire', 'ice', 'poison', 'electricity'], default: 'none'},
        effects: [String],
        data: {
            place: {
                description: {type: String, default: ''},
                lat: Number,
                long: Number,
                region: String,
                level: Number,
                pack_reward: String,
                exploration: {
                    nothing: {type: Number, default: 50},
                    chest: {type: Number, default: 25},
                    combat: {type: Number, default: 25}
                },
                'type': {type: String, enum: ['town', 'capital', 'zone', 'dungeon']},
                subtype: {type: String, enum: ['forest', 'mountain', 'lake', 'desert', 'swamp']},
                adjacent_places: [String],
                capital: String
            },
            weapon: {
                alias: String,
                'type': {type: String, enum: ['bladed', 'piercing', 'blunt']},
                stats: {1: StatsSchema, 2: StatsSchema, 3: StatsSchema}
            },
            armor: {
                alias: String,
                stats: {1: StatsSchema, 2: StatsSchema, 3: StatsSchema}
            },
            skill: {
                uses: Number,
                target: {type: String, enum: ['self', 'enemy']},
                stats: {1: StatsSchema, 2: StatsSchema, 3: StatsSchema}
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
