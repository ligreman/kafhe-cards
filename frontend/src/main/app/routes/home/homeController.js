(function () {
    'use strict';

    //Controlador de la pantalla de login
    angular.module('kafhe.controllers').controller('HomeController',
        ['$scope', 'API', '$mdDialog', '$translate', '$q', 'CONSTANTS',
            function ($scope, API, $mdDialog, $translate, $q, CONSTANTS) {
                // Variables
                var $this = this;
                $scope.updateGameData(fnAfterUpdate);
                $scope.gameStatuses = CONSTANTS.gameStatuses;

                // Funciones
                $scope.getNotifications = fnGetNotifications;
                $scope.launchBreakfast = fnLaunchBreakfast;
                $scope.players = {};
                $this.generateProbabilities = fnGenerateProbabilities;
                $this.generateRanksAndFame = fnGenerateRanksAndFame;
                // $this.generateFames = fnGenerateFames;

                /**
                 * Una vez he terminado de actualizar los datos
                 */
                function fnAfterUpdate() {
                    // Pido las estadísticas y datos de partida
                    $q.all([
                        API.game().stats().$promise,
                        API.user().list().$promise
                    ]).then(function (results) {
                        console.log(results);
                        if (results[0] && results[1]) {
                            var stats = results[0].data.probabilities;
                            var ranks = results[0].data.ranking;
                            var fames = results[0].data.fame;

                            results[1].data.players.forEach(function (user) {
                                $scope.players[user._id] = user.alias;
                            });

                            console.log($scope.players);
                            console.info(stats);

                            $this.generateProbabilities(stats);
                            $this.generateRanksAndFame(ranks, fames);
                            // $this.generateFames(fames);
                        }
                    });
                }

                function fnGenerateProbabilities(stats) {
                    var data = [];
                    console.log("+++++++++++");
                    console.log(stats);
                    for (var ix in stats) {
                        if (stats.hasOwnProperty(ix)) {
                            console.log(ix);
                            console.log($scope.players);
                            data.push([$scope.players[ix], parseFloat(stats[ix])]);
                        }
                    }
                    console.log(data);
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
                            json: json,
                            type: 'bar',
                            keys: {
                                x: 'name',
                                value: ['rank', 'fame']
                            },
                            axes: {
                                fame: 'y2',
                                rank: 'y'
                            },
                            colors: {
                                fame: '#673AB7',
                                rank: '#2E7D32'
                            },
                            names: {
                                fame: txtFame,
                                rank: txtRank
                            },
                            order: function (d1, d2) {
                                console.info(d1);
                                console.info(d2);
                                return d1.values.value;
                            }
                        },
                        axis: {
                            rotated: true,
                            x: {
                                type: 'category'
                            },
                            y: {
                                label: txtFame
                            },
                            y2: {
                                show: true,
                                label: txtRank
                            }
                        }
                        /*,
                         title: {
                         text: 'Fama y rango'
                         }*/
                    });
                }

                function fnGenerateFames(fames) {
                }

                //TODO la gráfica de fama que sea histórico
                // TODO histórico de rangos en el tiempo, durante toda la vida de una partida

                /**
                 * Obtiene las notificaciones
                 */
                function fnGetNotifications() {
                    API.user()
                        .me({}, function (response) {
                            if (response) {
                                $scope.updateUserObject(response.data.user);
                            }
                        });
                }

                function fnLaunchBreakfast() {
                }

            }]);
})();
