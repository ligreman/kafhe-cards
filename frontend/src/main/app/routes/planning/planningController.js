(function () {
    'use strict';

    // Controlador de la pantalla de login
    angular.module('kafhe.controllers').controller('PlanningController',
        ['$scope', '$translate', 'API', '$log', 'KShare', '$location', 'CONSTANTS',
            function ($scope, $translate, API, $log, KShare, $location, CONSTANTS) {
                $scope.selectionOwn = {};
                $scope.selectingOwn = {};
                $scope.selectionEnemy = {};
                $scope.selectingEnemy = {};
                $scope.enemies = [];

                $scope.cardSelection = fnCardSelection;

                // Actualizo los datos del juego si hace falta
                $scope.updateGameData(afterUpdate);

                // Escucho el seleccionado de carta
                KShare.listenData('card-scheduled', $scope, function (data) {
                    console.log(data);
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

                            // Finalizo la selección aquí
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
                    // Si el estado de la partida no es planning, redirijo a home
                    if ($scope.global.gamedata.status !== CONSTANTS.gameStatuses.planning) {
                        //TODO activar
                        // $location.path("/home");
                    } else {
                        // Recupero del API los datos de todos los jugadores
                        API.user().list({}, function (response) {
                            if (response) {
                                processData(response.data);
                            }
                        });
                    }
                }

                function processData(data) {
                    $scope.enemies = [];

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
                            $scope.enemies.push(player);

                            $scope.selectionEnemy[player.username] = {
                                encounter: player.game.schedule.encounter,
                                event: player.game.schedule.event
                            };
                            $scope.selectingEnemy[player.username] = {
                                encounter: [false, false],
                                event: [false]
                            };
                            console.log($scope.selectionEnemy);
                        }
                    });
                }

                /**
                 * Envía evento de seleccion de cartas a la directiva collection
                 */
                function fnCardSelection(username, type, index) {
                    // Selecciono si no estoy seleccionando el mismo de nuevo (en cuyo caso quería deseleccionar)
                    if (username === $scope.global.user.username) {
                        if (!$scope.selectingOwn[type][index]) {
                            //primero he de deseleccionar todo
                            deselectAll();
                            $scope.selectingOwn[type][index] = true;
                            KShare.sendData('card-selection', {"type": type, "username": username, "index": index});
                        } else {
                            deselectAll();
                        }
                    } else {
                        if (!$scope.selectingEnemy[username][type][index]) {
                            //primero he de deseleccionar todo
                            deselectAll();
                            $scope.selectingEnemy[username][type][index] = true;
                            KShare.sendData('card-selection', {"type": type, "username": username, "index": index});
                        } else {
                            deselectAll();
                        }
                    }
                }

                /**
                 * Deselecciona todo
                 */
                function deselectAll() {
                    KShare.sendData('card-deselection', {});
                    $scope.selectingOwn = {
                        weapon: [false],
                        armor: [false],
                        place: [false],
                        skill: [false, false, false]
                    };

                    for (var enemy in $scope.selectingEnemy) {
                        if ($scope.selectingEnemy.hasOwnProperty(enemy)) {
                            $scope.selectingEnemy[enemy] = {encounter: [false, false], event: [false]};
                        }
                    }
                }
            }]);
})();
