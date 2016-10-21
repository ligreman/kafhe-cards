(function () {
    'use strict';

    // Controlador de la pantalla de login
    angular.module('kafhe.controllers')
        .controller('ExploreController',
            ['$scope', '$translate', 'API', '$mdSidenav', '$log', '$timeout',
                function ($scope, $translate, API, $mdSidenav, $log, $timeout) {

                    $scope.toggle = fnBuildToggler;
                    $scope.close = fnClose;

                    // Actualizo los datos del juego si hace falta
                    $scope.updateGameData(updateDone);

                    function updateDone() {
                        // Calculo el ancho del div contenedor #map-container
                        $timeout(function () {
                            console.log(document.getElementById('map-container').offsetWidth);
                            console.log(document.getElementById('map-container').offsetHeight);
                        }, 0);

                        //TODO centrarlo en la posición del jugador
                        /*var map = L.map('mapid', {
                         // center: [51.505, -0.09],
                         maxBounds: [[5, -180], [-80, 85]],
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

                         marker = L.marker([5, -180]).addTo(map);*/

                        /*var polyline = L.polyline([...]).addTo(map);
                         var decorator = L.polylineDecorator(polyline, {
                         patterns: [
                         // defines a pattern of 10px-wide dashes, repeated every 20px on the line
                         {offset: 0, repeat: 20, symbol: L.Symbol.dash({pixelSize: 10})}
                         ]
                         }).addTo(map);*/
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
