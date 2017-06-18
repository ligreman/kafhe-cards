(function () {
    'use strict';

    //Controlador de la pantalla de login
    angular.module('kafhe.controllers').controller('HomeController',
        ['$scope', 'API', '$translate', '$q', 'CONSTANTS', '$window', '$mdDialog', '$timeout', '$mdSidenav', 'KCommon', '$log', '$location',
            function ($scope, API, $translate, $q, CONSTANTS, $window, $mdDialog, $timeout, $mdSidenav, KCommon, $log, $location) {
                // Variables
                var $this = this;
                $scope.players = {};
                $scope.gameStatuses = CONSTANTS.gameStatuses;
                $scope.callerMe = false;

                // Funciones
                $scope.getNotifications = fnGetNotifications;
                $scope.launchBreakfast = fnLaunchBreakfast;
                $scope.getNotificationIcon = fnGetNotificationIcon;
                $this.generateProbabilities = fnGenerateProbabilities;
                $this.generateRanksAndFame = fnGenerateRanksAndFame;

                $scope.toggle = fnToggle;
                $scope.close = fnClose;
                $this.getPlaceMarkers = fnGetPlaceMarkers;
                $this.getPlayerMarkers = fnGetPlayerMarkers;
                $this.generatePlaceIcon = fnGeneratePlaceIcon;
                $this.generatePlayerIcon = fnGeneratePlayerIcon;
                $this.users = null;

                // Actualizo los datos del juego si hace falta
                $scope.updateGameData(fnAfterUpdate);

                /**
                 * Una vez he terminado de actualizar los datos
                 */
                function fnAfterUpdate() {
                    // Pido las estadísticas y datos de partida si el estado no es cerrado
                    if ($scope.global.gamedata.status === CONSTANTS.gameStatuses.planning ||
                        $scope.global.gamedata.status === CONSTANTS.gameStatuses.explore ||
                        $scope.global.gamedata.status === CONSTANTS.gameStatuses.resolution) {
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

                        // Lista de usuarios
                        API.user().list({}, function (response) {
                            if (response) {
                                $this.users = response.data.players;
                                updateDone();
                            }
                        });

                        // Saco los stats también
                        API.character().stats(function (response) {
                            if (response && response.data) {
                                $scope.stats = {
                                    combat: convertToStars(response.data.combat),
                                    endurance: convertToStars(response.data.endurance),
                                    skill: convertToStars(response.data.skill),
                                    reflexes: convertToStars(response.data.reflexes),
                                    luck: convertToStars(response.data.luck),
                                    vigor: convertToStars(response.data.vigor),
                                    health: response.data.health
                                };
                            }
                        });
                    }

                    // Si está cerrado muestro el resultado
                    if ($scope.global.gamedata.status === CONSTANTS.gameStatuses.closed) {
                        $q.all([
                            API.user().list().$promise
                        ]).then(function (results) {
                            if (results[0]) {
                                results[0].data.players.forEach(function (user) {
                                    $scope.players[user._id] = user.alias;
                                });

                                var txt1 = $translate.instant('textSacrifice');
                                var txt2 = $scope.players[$scope.global.gamedata.caller];

                                $("#resultCaller").typed({
                                    // Waits 1000ms after typing "First"
                                    strings: [txt1 + ' ^2000<br><br>' + txt2],
                                    typeSpeed: 100,
                                    showCursor: false,
                                    callback: function () {
                                        $scope.callerMe = true;
                                    }
                                });
                            }
                        });
                    }
                }

                function fnGenerateProbabilities(stats) {
                    var data = [];

                    for (var ix in stats) {
                        if (stats.hasOwnProperty(ix)) {
                            data.push([$scope.players[ix], parseFloat(stats[ix])]);
                        }
                    }

                    $timeout(function () {


                        var element = $('#sidenav-right');
                        console.log("W: " + element.clientWidth);
                        var chart = c3.generate({
                            bindto: '#chart-probabilities',
                            data: {
                                columns: data,
                                type: 'donut'

                            },
                            donut: {
                                title: 'Probabilidades'
                            },
                            size: {
                                width: 300
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
                    }, 2000);
                    /*// Resize
                     $timeout(function () {
                     chart.resize({
                     height: element.clientWidth,
                     width: element.clientWidth
                     });
                     }, 0);*/
                }

                function fnGenerateRanksAndFame(dataRank, dataFame) {
                    var txtRank = $translate.instant('rank');
                    var txtFame = $translate.instant('fame');
                    return;
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
                            axes: {fame: 'y', rank: 'y2'},
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

                    // Resize
                    var element = angular.element('#chart-ranking');
                    $timeout(function () {
                        chart.resize({
                            height: element.clientWidth,
                            width: element.clientWidth
                        });
                    }, 0);
                }


                //TODO la gráfica de fama que sea histórico de fama en el tiempo,
                // durante toda la vida de una partida

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

                function convertToStars(value) {
                    var stars = 5;
                    if (value <= 35) {
                        stars = 4;
                    }
                    if (value <= 27) {
                        stars = 3;
                    }
                    if (value <= 18) {
                        stars = 2;
                    }
                    if (value <= 9) {
                        stars = 1;
                    }
                    return stars;
                }

                function updateDone() {
                    // Si no estoy en modo explore salgo de aquí y voy a home
                    if ($scope.global.gamedata.status === CONSTANTS.gameStatuses.planning) {
                        $location.path("/planning");
                        return;
                    } else if ($scope.global.gamedata.status !== CONSTANTS.gameStatuses.explore) {
                        $location.path("/home");
                        return;
                    }

                    // Calculo el ancho del div contenedor #map-container
                    $timeout(function () {
                        var w = document.getElementById('map-container').offsetWidth,
                            h = document.getElementById('map-container').offsetHeight;

                        // Pongo al div del mapa el tamaño correcto
                        document.getElementById('mapid').style.width = w + 'px';
                        document.getElementById('mapid').style.height = h + 'px';

                        // Creo la capa de marcadores de ciudades
                        var cities = L.layerGroup($this.getPlaceMarkers());

                        // La capa del mapa base
                        var mapaBase = L.tileLayer('assets/img/map/{z}/{x}/{y}.jpg', {
                            minZoom: 3,
                            maxZoom: 6,
                            tms: true
                        });

                        // Capa con los marcadores de los jugadores
                        var players = L.layerGroup($this.getPlayerMarkers());

                        // Creo el objeto map
                        var map = L.map('mapid', {
                            // center: [51.505, -0.09],
                            maxBounds: [[5, -180], [-81, 65]],
                            layers: [mapaBase, players],
                            zoomControl: false,
                            fullscreenControl: true,
                            fullscreenControlOptions: {
                                position: 'bottomleft'
                            }
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


                        // var baseMaps = {"Jare": mapaBase};
                        // Control de capas
                        var a = $translate.instant('textCities'),
                            b = $translate.instant('textPlayers');

                        var overlayMaps = {};
                        overlayMaps[a] = cities;
                        overlayMaps[b] = players;
                        L.control.layers({}, overlayMaps).setPosition('bottomright').addTo(map);

                        //add zoom control with your options
                        L.control.zoom({
                            position: 'bottomleft'
                        }).addTo(map);


                        /* var greenIcon = L.icon({
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
                         }).addTo(map).bindPopup("I am a green leaf.");*/

                        // var marker = L.marker([-51.82, -105.21]).addTo(map);

                        // Mi ruta seguida
                        var ruta = [];
                        if ($scope.global.user.game.journal.length > 1) {
                            var dbRuta = TAFFY($scope.global.user.game.journal);
                            var rutaSeguida = dbRuta().order('date asec').get();
                            rutaSeguida.forEach(function (punto) {
                                var carta = $scope.global.gamedata.cards[punto.place];
                                ruta.push([carta.data.place.lat, carta.data.place.long]);
                            });

                            L.polylineDecorator(ruta, {
                                patterns: [
                                    // defines a pattern of 10px-wide dashes, repeated every 20px on the line
                                    {
                                        offset: 12,
                                        repeat: 25,
                                        symbol: L.Symbol.dash({
                                            pixelSize: 10,
                                            pathOptions: {color: '#616161', weight: 4}
                                        })
                                    },
                                    {
                                        offset: 0,
                                        repeat: 25,
                                        symbol: L.Symbol.dash({
                                            pixelSize: 0,
                                            pathOptions: {color: '#1B5E20', weight: 4}
                                        })
                                    }
                                ]
                            }).addTo(map);
                        }
                    }, 0);
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
                 * Crea los marcadores de los lugares
                 */
                function fnGetPlaceMarkers() {
                    var db = TAFFY(KCommon.objToArray($scope.global.gamedata.cards));
                    var places = db({'type': CONSTANTS.cardTypes.place}).get();

                    var marker, markers = [];
                    places.forEach(function (card) {
                        var tipo = card.data.place.type;

                        if (tipo === CONSTANTS.placeTypes.zone) {
                            tipo += '-' + card.data.place.subtype;
                        }

                        // HTML
                        var html = '<strong>' + card.name + '</strong>';
                        html += '<p class="no-margin">' + $translate.instant('textLevel') + ': ' + card.data.place.level + '</p>';
                        html += '<p class="no-margin">' + $translate.instant('textRegion') + ': ' + card.data.place.region + '</p>';

                        marker = L.marker([card.data.place.lat, card.data.place.long], {
                            icon: $this.generatePlaceIcon(tipo),
                            title: card.name,
                            opacity: 0.9,
                            zIndexOffset: 100
                        }).bindPopup(html);

                        markers.push(marker);
                    });

                    return markers;
                }

                /**
                 * Crea los iconos de los lugares
                 */
                function fnGeneratePlaceIcon(place) {
                    var baseUrl = 'assets/img/leaflet/';

                    var MyLeafIcon = L.Icon.extend({
                        options: {
                            shadowUrl: baseUrl + 'marker-shadow.png',
                            iconSize: [25, 41], // size of the icon
                            shadowSize: [41, 41], // size of the shadow
                            iconAnchor: [12, 40], // point of the icon which will correspond to marker's location
                            shadowAnchor: [12, 41],  // the same for the shadow
                            popupAnchor: [0, -45] // point from which the popup should open relative to the iconAnchor
                        }
                    });

                    return new MyLeafIcon({iconUrl: baseUrl + 'place-' + place + '.png'});
                }

                /**
                 * Genera los marcadores de los jugadores
                 */
                function fnGetPlayerMarkers() {
                    var marker, markers = [];
                    $this.users.forEach(function (user) {
                        if (!user.game.schedule.place || user.game.schedule.place.length === 0) {
                            return;
                        }

                        var lugar = user.game.schedule.place[0].card,
                            carta = $scope.global.gamedata.cards[lugar],
                            enemy = true;

                        //Si soy yo o no
                        if (user.username === $scope.global.user.username) {
                            enemy = false;
                        }

                        // HTML
                        var html = '<strong>' + user.alias + '</strong>';
                        html += '<p class="no-margin">' + $translate.instant('rank') + ': ' + user.game.rank + '</p>';

                        var extra = [];
                        if (user.leader) {
                            extra.push($translate.instant('textLeader'));
                        }
                        if (user.game.afk) {
                            extra.push('AFK');
                        }
                        html += '<p class="no-margin text-italic">' + extra.join(' - ') + '</p>';

                        marker = L.marker([carta.data.place.lat, carta.data.place.long], {
                            icon: $this.generatePlayerIcon(user.avatar, enemy),
                            title: user.alias + ' ' + $translate.instant('textIsIn') + ' ' + carta.name,
                            opacity: 0.9,
                            zIndexOffset: 90
                        }).bindPopup(html);
                        console.log(marker);
                        markers.push(marker);
                    });

                    return markers;
                }

                function fnGeneratePlayerIcon(avatar, enemy) {
                    var baseUrl = 'assets/img/leaflet/', extra = '';

                    if (enemy) {
                        extra = '-enemy';
                    }

                    var MyLeafIcon = L.Icon.extend({
                        options: {
                            shadowUrl: baseUrl + 'marker-shadow-player' + extra + '.png',
                            iconSize: [48, 48], // size of the icon
                            shadowSize: [36, 36], // size of the shadow
                            iconAnchor: [24, 66], // point of the icon which will correspond to marker's location
                            shadowAnchor: [18, 26],  // the same for the shadow
                            popupAnchor: [0, -66] // point from which the popup should open relative to the iconAnchor
                        }
                    });

                    return new MyLeafIcon({iconUrl: 'assets/img/avatars/' + avatar + '.png'});
                }

            }]).controller('LeftCtrl', ['$scope', '$log', function ($scope, $log) {
    }])
        .controller('RightCtrl', ['$scope', '$mdDialog', 'CONSTANTS', 'KGame',
            function ($scope, $mdDialog, CONSTANTS, KGame) {
                $scope.showCardDialog = fnShowCardDialog;
                $scope.cardTypeImage = KGame.cardTypeImage;
                $scope.roman = CONSTANTS.roman;
                $scope.getNumber = fnGetNumber;

                function fnGetNumber(num) {
                    if (num > 0) {
                        return new Array(num);
                    } else {
                        return [];
                    }
                }

                function fnShowCardDialog(event, card, level) {
                    card.level = level;

                    if (card.type === CONSTANTS.cardTypes.place) {
                        card.data['place']['level'] = level;
                    }

                    $mdDialog.show({
                        controller: 'ShowCard',
                        templateUrl: 'app/components/dialogs/showCard/show-card.html',
                        scope: $scope,
                        preserveScope: true,
                        clickOutsideToClose: true,
                        escapeToClose: true,
                        fullscreen: true,
                        locals: {
                            card: card
                        },
                        targetEvent: event
                    });
                }
            }]);
})();
