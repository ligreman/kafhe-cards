(function () {
    'use strict';

    // Controlador de la pantalla de login
    angular.module('kafhe.controllers')
        .controller('ExploreController',
            ['$scope', '$translate', 'API', '$mdSidenav', '$log',
                function ($scope, $translate, API, $mdSidenav, $log) {

                    $scope.toggle = fnBuildToggler;
                    $scope.close = fnClose;

                    // Actualizo los datos del juego si hace falta
                    $scope.updateGameData(updateDone);

                    function updateDone() {
                        //TODO centrarlo en la posición del jugador
                        var map = L.map('mapid', {
                            // center: [51.505, -0.09],
                            sleep: true,
                            sleepTime: 750,
                            wakeTime: 750,
                            sleepNote: true,
                            // should hovering wake the map? (non-touch devices only)
                            hoverToWake: false,
                            // a message to inform users about waking the map
                            wakeMessage: 'Click to Wake',
                            // a constructor for a control button
                            // sleepButton: L.Control.sleepMapControl,
                            // opacity for the sleeping map
                            sleepOpacity: .7
                        }).setView([-70, -80], 3);

                        L.tileLayer('assets/img/map/{z}/{x}/{y}.jpg', {
                            minZoom: 3,
                            maxZoom: 6,
                            tms: true
                        }).addTo(map);

                        var marker = L.marker([-47.5, 0]).addTo(map);
                        marker = L.marker([-57.5, 0]).addTo(map);
                        marker = L.marker([-67.5, 0]).addTo(map);
                        marker = L.marker([-77.5, 0]).addTo(map);
                        marker = L.marker([-87.5, 0]).addTo(map);
                    }

                    /**
                     * Build handler to open/close a SideNav
                     */
                    function fnBuildToggler(navID) {
                        // Component lookup should always be available since we are not using `ng-if`
                        $mdSidenav(navID).toggle();
                    }

                    /**
                     * Cierra el panel
                     */
                    function fnClose(side) {
                        // Component lookup should always be available since we are not using `ng-if`
                        $mdSidenav(side).close();
                    }
                }])
        .controller('LeftCtrl', ['$scope', '$log', function ($scope, $log) {
        }])
        .controller('RightCtrl', ['$scope', '$log', function ($scope, $log) {
        }]);
})();
