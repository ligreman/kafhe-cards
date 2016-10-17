'use strict';

//Módulo para un modelo de Mongoose. Hay que pasarle el objeto mongoose ya creado antes.
module.exports = function (mongoose) {
    // var skillSchema = require('./skillSchema')(mongoose);
    var notificationSchema = require('./notificationSchema')(mongoose);

    //Modelo para los usuarios, coleccion Users
    var UserSchema = mongoose.Schema({
        username: {type: String, unique: true, required: true},
        password: {type: String, select: false, required: true},
        group: {type: Number, required: true},
        alias: {type: String, default: ''},
        leader: {type: Boolean, default: false},
        times: {type: Number, default: 0},
        calls: {type: Number, default: 0},
        avatar: {type: String, default: ''},
        game: {
            gamedata: {type: mongoose.Schema.Types.ObjectId, ref: 'Game', default: null},
            rank: {type: Number, default: 1},
            tostolares: {type: Number, default: 0},
            fame: {type: Number, default: 0},
            packs: [{
                amount: {type: Number, default: 0},
                category: {type: String, default: 0}
            }],
            collection: [{
                card: {type: String, default: null},
                level: Number
            }],
            schedule: {
                weapon: [{
                    card: {type: String, default: null},
                    level: Number
                }],
                armor: [{
                    card: {type: String, default: null},
                    level: Number
                }],
                skill: [{
                    card: {type: String, default: null},
                    level: Number
                }],
                place: [{
                    card: {type: String, default: null},
                    level: Number
                }],
                encounter: [{
                    player: {type: String, default: null},
                    card: {type: String, default: null},
                    level: Number
                }],
                event: [{
                    player: {type: String, default: null},
                    card: {type: String, default: null},
                    level: Number
                }]
            },
            journal: [{
                date: Number,
                place: {
                    id: String,
                    latitude: Number,
                    longitude: Number
                },
                skills: [Boolean],
                log: [String]
            }],
            rewards: {
                packs: [{
                    amount: {type: Number, default: 0},
                    category: {type: String, default: 0}
                }],
                tostolates: Number,
                fame: Number
            },
            afk: {type: Boolean, default: false},
            last_activity: {type: Number, default: 0},
            order: {
                meal: {type: mongoose.Schema.Types.ObjectId, ref: 'Meal', default: null},
                drink: {type: mongoose.Schema.Types.ObjectId, ref: 'Drink', default: null},
                ito: {type: Boolean, default: false}
            },
            last_order: {
                meal: {type: mongoose.Schema.Types.ObjectId, ref: 'Meal', default: null},
                drink: {type: mongoose.Schema.Types.ObjectId, ref: 'Drink', default: null},
                ito: {type: Boolean, default: false}
            },
            notifications: [notificationSchema]
        }
    }, {versionKey: false});

    //Declaro y devuelvo el modelo
    return mongoose.model('User', UserSchema);
};
