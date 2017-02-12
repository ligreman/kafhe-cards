(function () {
    'use strict';

    // Controlador de la pantalla de login
    angular.module('kafhe.controllers').controller('CharacterController',
        ['$scope', '$log', 'KShare', '$mdDialog', '$timeout', '$document', 'API', 'CONSTANTS', '$translate',
            function ($scope, $log, KShare, $mdDialog, $timeout, $document, API, CONSTANTS, $translate) {
                var $this = this;

                $scope.viewing = 'character';
                $scope.statsCollected = null;

                $scope.toggle = fnToggle;
                $scope.cardLevelUpDialog = fnCardLevelUpDialog;
                $scope.openPackageDialog = fnOpenPackageDialog;
                $scope.updateUser = fnUpdateUser;
                $this.drawStats = fnDrawStats;

                // Actualizo los datos del juego si hace falta
                $scope.updateGameData();

                // Pido al api los datos del jugador
                API.character().stats(function (response) {
                    if (response && response.data) {
                        $this.drawStats(response.data);
                        $scope.statsCollected = response.data;
                    }
                });


                function fnDrawStats(stats) {
                    $timeout(function () {
                        // Calculo el ancho y alto del sitio donde voy a pintar
                        var lienzo = $document[0].getElementById('lienzo');

                        var w, h;
                        w = h = Math.min(lienzo.clientWidth, lienzo.clientHeight) - 150;

                        //Data
                        var d = [[]];

                        for (var stat in stats) {
                            if (stats.hasOwnProperty(stat)) {
                                if (CONSTANTS.stats.indexOf(stat) !== -1) {
                                    var valor = stats[stat] / CONSTANTS.maxStatValue;

                                    d[0].push({
                                        axis: $translate.instant('stat-' + stat),
                                        value: valor
                                    });
                                }
                            }
                        }

                        //Options for the Radar chart, other than default
                        var mycfg = {
                            w: w,
                            h: h,
                            maxValue: 1,
                            levels: 5,
                            ExtraWidthX: 150,
                            ExtraWidthY: 150
                        };

                        //Call function to draw the Radar chart
                        //Will expect that data is in %'s
                        RadarChart.draw("#chart-stats", d, mycfg);

                        d3.selectAll("#chart-stats text.legend").style("fill", "rgba(0,0,0,0)");
                        d3.selectAll("#chart-stats g.axis text").style("fill", "#FFF");
                        d3.selectAll("#chart-stats path").style("fill", "red");

                        // La graph de barras
                        var barras = c3.generate({
                            bindto: '#chart-bars',
                            data: {
                                columns: [
                                    [
                                        'Valor',
                                        stats.attack,
                                        stats.parry,
                                        stats.damage,
                                        stats.defense,
                                        stats.critic,
                                        stats.evade,
                                        stats.ambush
                                    ]
                                ],
                                color: function (color, d) {
                                    return '#2E7D32';
                                },
                                type: 'bar'
                            },
                            axis: {
                                rotated: true,
                                x: {
                                    type: 'category',
                                    categories: [
                                        $translate.instant('stat-attack'),
                                        $translate.instant('stat-parry'),
                                        $translate.instant('stat-damage'),
                                        $translate.instant('stat-defense'),
                                        $translate.instant('stat-critic'),
                                        $translate.instant('stat-evade'),
                                        $translate.instant('stat-ambush')
                                    ]
                                }
                            },
                            legend: {
                                show: false
                            }
                        });
                    }, 0);
                }

                function fnToggle(donde) {
                    $scope.viewing = donde;

                    // Si voy a character pinto el grafico de nuevo
                    if (donde === 'character') {
                        $this.drawStats($scope.statsCollected);
                    }
                }

                function fnCardLevelUpDialog(event) {
                    $mdDialog.show({
                        controller: 'CardLevelUp',
                        templateUrl: 'app/components/dialogs/cardLevelUp/card-level-up.html',
                        scope: $scope,
                        preserveScope: true,
                        clickOutsideToClose: true,
                        escapeToClose: true,
                        fullscreen: true,
                        locals: {},
                        targetEvent: event
                    });
                }

                function fnOpenPackageDialog(event) {
                    $mdDialog.show({
                        controller: 'OpenPackage',
                        templateUrl: 'app/components/dialogs/openPackage/open-package.html',
                        scope: $scope,
                        preserveScope: true,
                        clickOutsideToClose: true,
                        escapeToClose: true,
                        fullscreen: true,
                        locals: {},
                        targetEvent: event
                    });
                }

                /**
                 * Pasarela para la directiva para acceder al update user
                 */
                function fnUpdateUser(data) {
                    $scope.updateUserObject(data);
                }

            }]);
})();
