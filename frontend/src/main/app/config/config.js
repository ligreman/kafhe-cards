(function () {
    'use strict';

    // módulo que contiene Strings de configuración
    angular.module('kafhe.config')
        .constant('CONFIG', {
            //webServiceUrl: 'http://okapi-lovehinaesp.rhcloud.com/',
            webServiceUrl: 'http://localhost:8080/api/',

            // IDIOMAS
            defaultLanguage: 'es',
            fallbackLanguage: 'es',
            languages: {
                spanish: 'es',
                english: 'en'
            },

            // Seguridad
            sessionCookieName: 'KAFHE',
            //Códigos de error de sesión, que provocarán que se eche al usuario a la página de login
            errorCodesSession: [
                'errUserPassNotValid', 'errSession'
            ],

            // CONSTANTES
            constReputationToToastProportion: 100,
            constCommonSkills: 'common'
        })
        .constant('CONSTANTS', {
            gameStatuses: {
                weekend: 0,// fin de semana. Se pone así cuando se crea una partida nueva.
                planning: 1,// durante la semana, tiempo de espera entre juegos. Permite contratar. También meter y modificar tu pedido.
                explore: 2,// durante la semana, mientras se ejecutan los juegos. También meter y modificar tu pedido.
                resolution: 3,// una vez lanzado el desayuno, se muestran los resultados. No puedes hacer nada, ni modificar pedido, ni forja, habilidades...
                closed: 4 //
            },
            cardTypes: {
                place: 'place',
                weapon: 'weapon',
                armor: 'armor',
                skill: 'skill',
                encounter: 'encounter',
                event: 'event'
            },
            roman: {
                1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI', 7: 'VII', 8: 'VIII', 9: 'IX', 10: 'X'
            }
        });
})();
