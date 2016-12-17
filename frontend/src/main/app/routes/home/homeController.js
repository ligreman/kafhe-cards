(function () {
    'use strict';

    //Controlador de la pantalla de login
    angular.module('kafhe.controllers').controller('HomeController',
        ['$scope', 'API', '$translate', '$q', 'CONSTANTS', '$window', '$mdDialog',
            function ($scope, API, $translate, $q, CONSTANTS, $window, $mdDialog) {
                // Variables
                var $this = this;
                $scope.players = {};
                $scope.gameStatuses = CONSTANTS.gameStatuses;

                // Funciones
                $scope.getNotifications = fnGetNotifications;
                $scope.launchBreakfast = fnLaunchBreakfast;
                $scope.getNotificationIcon = fnGetNotificationIcon;
                $this.generateProbabilities = fnGenerateProbabilities;
                $this.generateRanksAndFame = fnGenerateRanksAndFame;

                $scope.updateGameData(fnAfterUpdate);

                /**
                 * Una vez he terminado de actualizar los datos
                 */
                function fnAfterUpdate() {
                    // Pido las estadísticas y datos de partida
                    $q.all([
                        API.game().stats().$promise,
                        API.user().list().$promise
                    ]).then(function (results) {
                        if (results[0] && results[1]) {
                            var stats = results[0].data.probabilities;
                            var ranks = results[0].data.ranking;
                            var fames = results[0].data.fame;

                            results[1].data.players.forEach(function (user) {
                                $scope.players[user._id] = user.alias;
                            });

                            $this.generateProbabilities(stats);
                            $this.generateRanksAndFame(ranks, fames);
                        }
                    });
                }

                function fnGenerateProbabilities(stats) {
                    var data = [];

                    for (var ix in stats) {
                        if (stats.hasOwnProperty(ix)) {
                            data.push([$scope.players[ix], parseFloat(stats[ix])]);
                        }
                    }

                    var chart = c3.generate({
                        bindto: '#chart-probabilities',
                        data: {
                            columns: data,
                            type: 'donut'

                        },
                        donut: {
                            title: 'Probabilidades'
                        },
                        tooltip: {
                            format: {
                                title: function (x) {
                                    return 'Probabilidad de ser elegido';
                                },
                                value: function (value, ratio, id, index) {
                                    return value + '%';
                                }
                            }
                        }
                    });
                }

                function fnGenerateRanksAndFame(dataRank, dataFame) {
                    var txtRank = $translate.instant('rank');
                    var txtFame = $translate.instant('fame');

                    var json = [];
                    dataRank.forEach(function (r) {
                        // Busco la fama de este tipo
                        dataFame.forEach(function (f) {
                            if (f.name === r.name) {
                                var valor = {
                                    name: r.name,
                                    rank: r.rank,
                                    fame: f.fame
                                };
                                json.push(valor);
                            }
                        });
                    });

                    var chart = c3.generate({
                        bindto: '#chart-ranking',
                        data: {
                            json: json, type: 'bar',
                            keys: {x: 'name', value: ['rank', 'fame']},
                            axes: {fame: 'y2', rank: 'y'},
                            colors: {fame: '#673AB7', rank: '#2E7D32'},
                            names: {fame: txtFame, rank: txtRank},
                            order: function (d1, d2) {
                                return d1.values.value;
                            }
                        },
                        axis: {
                            rotated: true,
                            x: {type: 'category'},
                            y: {label: txtFame},
                            y2: {show: true, label: txtRank}
                        }
                    });
                }


                //TODO la gráfica de fama que sea histórico de fama en el tiempo, durante toda la vida de una partida

                /**
                 * Obtiene las notificaciones
                 */
                function fnGetNotifications() {
                    API.user().me({}, function (response) {
                        if (response) {
                            $scope.updateUserObject(response.data.user);
                        }
                    });
                }

                function fnLaunchBreakfast() {
                    // Pido confirmación del lanzado
                    var confirm = $mdDialog.confirm()
                        .title($translate.instant('textLaunchDialogTitle'))
                        .textContent($translate.instant('textLaunchDialogContent'))
                        .ok($translate.instant('textStartVoting'))
                        .cancel($translate.instant('textCancel'))
                        .targetEvent(event);

                    $mdDialog.show(confirm).then(function () {
                        // OK, envío el pedido
                        API.game().launchBreakfast({}, function (response) {
                            if (response) {
                                // Refrescamos la página porque ha cambiado el estado de la partida
                                $window.location.reload();
                            }
                        });
                    });
                }

                function fnGetNotificationIcon(type) {
                    return type;
                }

            }]);
})();
