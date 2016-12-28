(function () {
    'use strict';

    //Defino el módulo para importarlo como dependencia donde se requiera
    var authModule = angular.module('kafhe.services');

    //Defino el servicio concreto del Game
    authModule.factory('KGame',
        ['$rootScope', '$cookies', '$location', '$translate', 'API', '$q', 'CONSTANTS',
            function ($rootScope, $cookies, $location, $translate, API, $q, CONSTANTS) {
                /**
                 * Pide al webservice los datos de la partida y la información de pedidos y habilidades
                 * @param callback Función callback. Se le pasa la info de: user, meals, drinks, skills
                 * @returns {*}
                 */
                var getGameData = function (callback) {
                    // Saco los datos de llamadas al api
                    return $q.all([
                        API.user().me().$promise,
                        API.game().data().$promise
                    ]).then(function (results) {
                        // Proceso los datos
                        var meals = {};
                        results[1].data.meals.forEach(function (meal) {
                            meals[meal.id] = meal;
                        });
                        var drinks = {};
                        results[1].data.drinks.forEach(function (drink) {
                            drinks[drink.id] = drink;
                        });
                        // var skills = {};
                        // results[1].data.skills.forEach(function (skill) {
                        //     skills[skill.id] = skill;
                        // });
                        var talents = {};
                        results[1].data.talents.forEach(function (talent) {
                            talents[talent.id] = talent;
                        });
                        // var places = {};
                        // results[1].data.places.forEach(function (place) {
                        //     places[place.id] = place;
                        // });
                        var cards = {};
                        results[1].data.cards.forEach(function (card) {
                            cards[card.id] = card;
                        });

                        callback(
                            results[0].data.user,
                            meals,
                            drinks,
                            // skills,
                            talents,
                            // places,
                            cards,
                            results[1].data.system
                        );
                    });
                };

                /**
                 * Obtiene la imagen del tipo de carta
                 * @param card Objeto carta
                 */
                var cardTypeImage = function (card) {
                    var tipo = '';
                    if (card.type === CONSTANTS.cardTypes.place) {
                        tipo = card.data.place.type;

                        if (card.data.place.subtype) {
                            tipo += card.data.place.subtype;
                        }
                    } else {
                        tipo = card.type;
                    }

                    return tipo;
                };

                /**
                 * Obtiene el texto para traducciones a partir de una carta y su tipo
                 * @param card
                 */
                var cardTextType = function (card) {
                    var texto = '';
                    if (card.type === CONSTANTS.cardTypes.place) {
                        texto = card.data.place.type;

                        if (card.data.place.subtype) {
                            texto += card.data.place.subtype;
                        }
                    } else {
                        texto = card.type;
                    }

                    return 'text' + texto.capitalizeFirstLetter();
                };

                //Expongo los métodos del servicio
                return {
                    getGameData: getGameData,
                    cardTypeImage: cardTypeImage,
                    cardTextType: cardTextType
                };
            }
        ]);
})();
