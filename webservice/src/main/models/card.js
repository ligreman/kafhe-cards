'use strict';

module.exports = function (mongoose) {
    var CardSchema = mongoose.Schema({
        id: {type: String, index: true},
        name: {type: String, default: ''},
        description: {type: String, default: ''},
        'type': {type: String, enum: ['weapon', 'armor', 'skill', 'place', 'encounter', 'event'], required: true},
        contained_in_packs: [{
            category: String,
            frequency: String
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
            },
            weapon: {
                alias: String,
                'type': {type: String, enum: ['bladed', 'piercing', 'blunt']},
                stats: {
                    1: {attack: Number, damage: Number, special: String, description: String},
                    2: {attack: Number, damage: Number, special: String, description: String},
                    3: {attack: Number, damage: Number, special: String, description: String}
                }
            },
            armor: {
                alias: String,
                'type': {type: String, enum: ['mail', 'scale', 'padded']},
                stats: {
                    1: {parry: Number, defense: Number, speed: Number, special: String, description: String},
                    2: {parry: Number, defense: Number, speed: Number, special: String, description: String},
                    3: {parry: Number, defense: Number, speed: Number, special: String, description: String}
                }
            },
            skill: {
                uses: Number,
                target: {type: String, enum: ['self', 'enemy']},
                stats: {
                    1: {
                        attack: Number,
                        damage: Number,
                        parry: Number,
                        defense: Number,
                        speed: Number,
                        life: Number,
                        special: String,
                        description: String
                    },
                    2: {
                        attack: Number,
                        damage: Number,
                        parry: Number,
                        defense: Number,
                        speed: Number,
                        life: Number,
                        special: String,
                        description: String
                    },
                    3: {
                        attack: Number,
                        damage: Number,
                        parry: Number,
                        defense: Number,
                        speed: Number,
                        life: Number,
                        special: String,
                        description: String
                    }
                }
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
