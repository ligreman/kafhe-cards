(function () {
    'use strict';

    var app = angular.module('kafhe.directives');

    app.directive('kHeader', [function () {
        return {
            restrict: 'E',
            replace: 'true',
            scope: true,
            templateUrl: 'app/directives/kheader/kheader.html',
            controller: ['$scope', 'API', 'KSession', 'CONSTANTS', '$mdDialog', '$interval',
                function ($scope, API, KSession, CONSTANTS, $mdDialog, $interval) {

                    // Variables publicadas
                    var $this = this;
                    $scope.gameStatuses = CONSTANTS.gameStatuses;

                    // Funciones publicadas
                    $scope.btnProfile = fnBtnProfile;
                    $scope.logout = fnLogout;
                    $scope.convertDate = fnConvertDate;

                    // Tiempo
                    var ahora = new Date();
                    console.log("Ahora:");
                    console.log(ahora);
                    // Fecha de inicio de los juegos
                    var dest = new Date();
                    dest.setHours(19, 0, 0);
                    console.log(dest);

                    $this.intervalPlanning = null;
                    $this.intervalExplore = null;
                    // Tiempo hasta inicio
                    $scope.timePlanning = dest.getTime() - ahora.getTime();
                    console.log($scope.timePlanning);

                    if (!$this.intervalPlanning) {
                        $this.intervalPlanning = $interval(function () {
                            $scope.timePlanning -= 1000;

                            if ($scope.timePlanning <= 0) {
                                $interval.cancel($this.intervalPlanning);
                            }
                        }, 1000);
                    }

                    // Tiempo desde inicio
                    $scope.timeExplore = ahora.getTime() - dest.getTime();

                    if (!$this.intervalExplore) {
                        $this.intervalExplore = $interval(function () {
                            $scope.timeExplore += 1000;
                        }, 1000);
                    }

                    $scope.$on('$destroy', function () {
                        if ($this.intervalPlanning) {
                            $interval.cancel($this.intervalPlanning);
                        }
                        if ($this.intervalExplore) {
                            $interval.cancel($this.intervalExplore);
                        }
                    });


                    /*********************************************************************/
                    /*********************** FUNCIONES ***********************************/


                    /**
                     * Botón para mostrar u ocultar el menú profile
                     */
                    function fnBtnProfile($event) {
                        $mdDialog.show({
                            locals: {},
                            controller: 'Profile',
                            templateUrl: 'app/components/dialogs/profile/profile.html',
                            scope: $scope,
                            preserveScope: true,
                            clickOutsideToClose: true,
                            escapeToClose: true,
                            targetEvent: $event
                        }).then(function (result) {

                        });
                    }

                    // Llamo al API para resetear la base de datos
                    $scope.resetBBDD = function () {
                        API.dev()
                            .resetmongo({}, function (response) {
                                if (response) {
                                    // Mensaje growl de OK
                                    $scope.growlNotification('success', 'OK');
                                }
                            });
                    };

                    // Llamo al API para cambiar el estado de la partida
                    $scope.gameStatus = function (estado) {
                        API.dev()
                            .gamestatus({
                                status: estado
                            }, function (response) {
                                if (response) {
                                    // Mensaje growl de OK
                                    $scope.growlNotification('success', 'OK');
                                }
                            });
                    };

                    function fnLogout() {
                        API.session().logout(function (response) {
                            if (response && response.data.logout) {
                                $scope.growlNotification('success', 'Logout correcto');

                                // Hago logout
                                KSession.logout(true);
                            }
                        })
                    }

                    function fnConvertDate(time) {
                        // quito milisegundos
                        time = Math.floor(time / 1000);
                        console.log(time);

                        var minutos = Math.floor(time / 60);
                        var segundos = Math.floor(time % 60);

                        console.log("Minutos " + minutos);
                        console.log("Segundo " + segundos);

                        // Horas
                        var horas = 0;
                        if (minutos > 59) {
                            horas = Math.floor(minutos / 60);
                            minutos = minutos % 60;
                        }

                        if (horas.toString().length === 1) {
                            horas = '0' + horas;
                        }
                        if (minutos.toString().length === 1) {
                            minutos = '0' + minutos;
                        }
                        if (segundos.toString().length === 1) {
                            segundos = '0' + segundos;
                        }

                        return horas + ':' + minutos + ':' + segundos;
                    }
                }

            ]
        };
    }]);
})();
