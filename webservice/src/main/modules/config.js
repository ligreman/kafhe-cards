'use strict';

var SERVER = {
    // Contraseña por defecto de los usuarios
    default_password: '1234',
    censure_user: true //TODO activar en PRO
};


var REGEXP = {
    str_valid_regexp: /[a-zA-Z0-9ÑñáéíóúÁÉÍÓÚüÜ\-_ ]+/
};

/*************/

// Valores por defecto
var DEFAULTS = {
    toast_points: 10,
    reputation_to_tostolares_conversion: 100, // 100 de repu = 1 tostólar,

    // Personajes
    character: {
        stats_starting_value: 5,
        hire_cost: 1000 // Tostólares que cuesta
    },

    // Límites de cartas por personaje
    schedule_limits: {
        // A tu personaje
        weapon: 1,
        armor: 1,
        skill: 3,
        place: 1,
        // Pones al enemigo
        encounter: 1,
        event: 1
    },

    // Colección de cartas
    collection: {
        card_max_level: 3,
        pack_categories: ['']
    }
};

// Tabla de estados de partida
var GAME_STATUS = {
    weekend: 0,// fin de semana. Se pone así cuando se crea una partida nueva.
    planning: 1,// durante la semana, tiempo de espera entre juegos. Permite contratar. También meter y modificar tu pedido.
    explore: 2,// durante la semana, mientras se ejecutan los juegos. También meter y modificar tu pedido.
    resolution: 3,// una vez lanzado el desayuno, se muestran los resultados. No puedes hacer nada, ni modificar pedido, ni forja, habilidades...
    closed: 4// el viernes a las tantas se cierra la partida y se crea una nueva si era "recursiva"
};

var CARD_TYPES = ['weapon', 'armor', 'skill', 'place', 'encounter', 'event'];


//Exporto las funciones de la librería utils para que puedan accederse desde fuera
module.exports = {
    SERVER: SERVER,
    GAME_STATUS: GAME_STATUS,
    DEFAULTS: DEFAULTS,
    CARD_TYPES: CARD_TYPES,
    REGEXP: REGEXP
};

