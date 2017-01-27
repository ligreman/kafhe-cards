'use strict';

//Módulo para un modelo de Mongoose. Hay que pasarle el objeto mongoose ya creado antes.
module.exports = function (mongoose) {

    //Modelo para los usuarios, coleccion Users
    var TalentSchema = mongoose.Schema({
        id: {type: String, unique: true, required: true},
        name: {type: String, required: true},
        description: {type: String, required: true},
        branch: {type: String, required: true, enum: ['combat', 'exploration', 'survival']},
        skills: [String], // Array de ids de skills que otorga este talento
        stats: {
            combat: {type: Number, default: 0},
            endurance: {type: Number, default: 0},
            skill: {type: Number, default: 0},
            reflexes: {type: Number, default: 0},
            luck: {type: Number, default: 0},
            vigor: {type: Number, default: 0},
            special: {type: String, default: ''},
            description: {type: String, default: ''}
        },
        level: {type: Number, required: true}, // Nivel del talento en la rama
        cost: {type: Number, default: 1},  // Coste en puntos de talento
        required: [String] // Array de ids de talentos requeridos
    }, {versionKey: false});

    //Declaro y devuelvo el modelo
    return mongoose.model('Talent', TalentSchema);
};
