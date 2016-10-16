(function () {
    'use strict';

    // Controlador de la pantalla de login
    angular.module('kafhe.controllers').controller('PlanningController',
        ['$scope', '$translate', 'API', '$log', 'KShare',
            function ($scope, $translate, API, $log, KShare) {
                $scope.selectionOwn = {};
                $scope.selectingOwn = {};
                $scope.selectionEnemy = {};
                $scope.selectingEnemy = {};
                $scope.enemies = [];

                $scope.cardSelection = fnCardSelection;

                // Actualizo los datos del juego si hace falta
                $scope.updateGameData(afterUpdate());

                // Escucho el seleccionado de carta
                KShare.listenData('card-scheduled', $scope, function (data) {
                    // Llamo al API con estos datos y si va todo bien termino la selección de la carta
                    API.character().schedule({
                        username: data.username,
                        cardId: data.cardId
                    }, function (response) {
                        if (response) {
                            // Me devuelve el objeto usuario actualizado
                            $scope.updateUserObject(response.data.user);

                            // He de actualizar los objetos de los enemigos
                            afterUpdate();

                            // Finalizo la selección
                            if (data.username === $scope.global.user.username) {
                                $scope.selectingOwn[data.type][data.index] = false;
                            } else {
                                $scope.selectingEnemy[data.username][data.type][data.index] = false;
                            }

                            // Mensaje growl de OK
                            $scope.growlNotification('success', 'Carta asignada');
                        }
                    });
                });

                function afterUpdate() {
                    // Recupero del API los datos de todos los jugadores
                    API.user().list({}, function (response) {
                        if (response) {
                            $scope.updateUserObject(response.data.user);
                            $scope.enemies = response.data.players;
                            processData(response.data);
                        }
                    });
                }

                function processData(data) {
                    // Cojo los enemigos
                    data.players.forEach(function (player) {
                        if (player.username === $scope.global.user.username) {
                            $scope.selectionOwn = {
                                weapon: player.game.schedule.weapon,
                                armor: player.game.schedule.armor,
                                place: player.game.schedule.place,
                                skill: player.game.schedule.skill
                            };
                            $scope.selectingOwn = {
                                weapon: [false],
                                armor: [false],
                                place: [false],
                                skill: [false, false, false]
                            };
                        } else {
                            // enemigos.push(player);
                            $scope.selectionEnemy[player.username] = {
                                encounter: player.game.schedule.encounter,
                                event: player.game.schedule.event
                            };
                            $scope.selectingEnemy[player.username] = {
                                encounter: [false, false],
                                event: [false]
                            };
                        }
                    });
                }

                /**
                 * Envía evento de seleccion de cartas a la directiva collection
                 */
                function fnCardSelection(username, type, index) {
                    if (username === $scope.global.user.username) {
                        // Si ya estoy seleccionando una carta, "deselecciono"
                        if ($scope.selectingOwn[type][index]) {
                            $scope.selectingOwn[type][index] = false;
                            KShare.sendData('card-deselection', {});
                        } else {
                            $scope.selectingOwn[type][index] = true;
                            KShare.sendData('card-selection', {"type": type, "username": username, "index": index});
                        }
                    } else {
                        // Si ya estoy seleccionando una carta, "deselecciono"
                        if ($scope.selectingEnemy[username][type][index]) {
                            $scope.selectingEnemy[username][type][index] = false;
                            KShare.sendData('card-deselection', {});
                        } else {
                            $scope.selectingEnemy[username][type][index] = true;
                            KShare.sendData('card-selection', {"type": type, "username": username, "index": index});
                        }
                    }
                }
            }]);
})();
