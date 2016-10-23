(function () {
    'use strict';

    // Controlador de la pantalla de login
    angular.module('kafhe.controllers')
        .controller('ExploreController',
            ['$scope', '$translate', 'API', '$mdSidenav', '$log', '$timeout', '$location', 'CONSTANTS',
                function ($scope, $translate, API, $mdSidenav, $log, $timeout, $location, CONSTANTS) {

                    $scope.toggle = fnToggle;
                    $scope.close = fnClose;

                    // Actualizo los datos del juego si hace falta
                    $scope.updateGameData(updateDone);

                    function updateDone() {
                        // Si no estoy en modo explore salgo de aquí y voy a home
                        if ($scope.global.gamedata.status !== CONSTANTS.gameStatuses.explore) {
                            //TODO activar
                            // $location.path("/home");
                            // return;
                        }

                        // Calculo el ancho del div contenedor #map-container
                        $timeout(function () {
                            var w = document.getElementById('map-container').offsetWidth,
                                h = document.getElementById('map-container').offsetHeight;

                            // Pongo al div del mapa el tamaño correcto
                            document.getElementById('mapid').style.width = w + 'px';
                            document.getElementById('mapid').style.height = h + 'px';

                            var marker1 = L.marker([-67.5, 0]);
                            var marker2 = L.marker([-77.5, 0]);
                            var marker3 = L.marker([-87.5, 0]);
                            var cities = L.layerGroup([marker1, marker2, marker3]);

                            var mapaBase = L.tileLayer('assets/img/map/{z}/{x}/{y}.jpg', {
                                minZoom: 3,
                                maxZoom: 6,
                                tms: true
                            });

                            var map = L.map('mapid', {
                                // center: [51.505, -0.09],
                                maxBounds: [[5, -180], [-81, 65]],
                                layers: [mapaBase, cities],
                                zoomControl: false
                                // sleep: false
                                /*sleep: true,
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
                                 sleepOpacity: .7*/
                            }).setView([-70, -80], 3);

                            var baseMaps = {"Jare": mapaBase};
                            var overlayMaps = {"Cities": cities};
                            L.control.layers({}, overlayMaps).setPosition('bottomright').addTo(map);

                            //add zoom control with your options
                            L.control.zoom({
                                position: 'bottomleft'
                            }).addTo(map);


                            var greenIcon = L.icon({
                                iconUrl: 'assets/img/leaflet/b.png',
                                shadowUrl: 'assets/img/leaflet/marker-shadow.png',
                                iconSize: [25, 41], // size of the icon
                                shadowSize: [41, 41], // size of the shadow
                                iconAnchor: [12, 40], // point of the icon which will correspond to marker's location
                                shadowAnchor: [12, 41],  // the same for the shadow
                                popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
                            });
                            var greenIcon2 = L.icon({
                                iconUrl: 'assets/img/leaflet/c.png',
                                shadowUrl: 'assets/img/leaflet/marker-shadow.png',
                                iconSize: [25, 41], // size of the icon
                                shadowSize: [41, 41], // size of the shadow
                                iconAnchor: [12, 40], // point of the icon which will correspond to marker's location
                                shadowAnchor: [12, 41],  // the same for the shadow
                                popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
                            });

                            // var marker = L.marker([-47.5, 0]).addTo(map);

                            var marker = L.marker([-57.5, 0], {
                                icon: greenIcon,
                                title: 'manolo',
                                opacity: 0.9,
                                zIndexOffset: 100
                            }).addTo(map).bindPopup("I am a green leaf.");

                            marker = L.marker([-47.5, 0], {
                                icon: greenIcon2,
                                title: 'manolo',
                                opacity: 0.9,
                                zIndexOffset: 100
                            }).addTo(map).bindPopup("I am a green leaf.");

                            marker = L.marker([5, -180]).addTo(map);
                        }, 0);

                        //TODO centrarlo en la posición del jugador


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
                    function fnToggle(navID) {
                        // Component lookup should always be available since we are not using `ng-if`
                        fnClose('left');
                        fnClose('right');
                        $mdSidenav(navID).toggle();
                    }

                    /**
                     * Cierra el panel
                     */
                    function fnClose(side) {
                        // Component lookup should always be available since we are not using `ng-if`
                        $mdSidenav(side).close();
                    }

                    /**
                     * Crea los iconos de los lugares
                     */
                    function createPlacesIcons() {
                        var baseUrl = 'assets/img/leaflet/';

                        var MyLeafIcon = L.Icon.extend({
                            options: {
                                shadowUrl: baseUrl + 'marker-shadow.png',
                                iconSize: [25, 41], // size of the icon
                                shadowSize: [41, 41], // size of the shadow
                                iconAnchor: [12, 40], // point of the icon which will correspond to marker's location
                                shadowAnchor: [12, 41],  // the same for the shadow
                                popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
                            }
                        });

                        var icons = {
                            capital: new LeafIcon({iconUrl: baseUrl + 'place-capital.png'}),
                            town: new LeafIcon({iconUrl: baseUrl + 'place-town.png'}),
                            dungeon: new LeafIcon({iconUrl: baseUrl + 'place-dungeon.png'})
                        };

                        return icons;
                    }
                }])
        .controller('LeftCtrl', ['$scope', '$log', function ($scope, $log) {
        }])
        .controller('RightCtrl', ['$scope', '$log', function ($scope, $log) {
        }]);
})();
