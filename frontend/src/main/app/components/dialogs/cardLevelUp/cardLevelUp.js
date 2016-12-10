(function () {
    'use strict';

    angular.module('kafhe.controllers')
        .controller('CardLevelUp',
            ['$scope', 'CONSTANTS', 'KGame', '$mdDialog', 'API',
                function ($scope, CONSTANTS, KGame, $mdDialog, API) {

                    var $this = this;

                    $scope.candidates = [];
                    $scope.selected = null;
                    $this.idAssociate = {};

                    $scope.roman = CONSTANTS.roman;
                    $scope.cardTypeImage = KGame.cardTypeImage;
                    $scope.cardClick = fnCardClick;
                    $scope.cardClass = fnCardClass;


                    cardCollector();

                    $scope.accept = function () {
                        // recupero los _id de dos cartas con el id selected
                        if ($this.idAssociate[$scope.selected] && $this.idAssociate[$scope.selected].length > 1) {
                            // Mando al API
                            API.collection().fusion({
                                cardIdA: $this.idAssociate[$scope.selected][0],
                                cardIdB: $this.idAssociate[$scope.selected][1]
                            }, function (response) {
                                if (response) {
                                    $scope.updateUserObject(response.data.user);

                                    $scope.growlNotification('success', 'textCardLevelUpSucceed');
                                    $mdDialog.hide();
                                }
                            });
                        }
                    };

                    $scope.cancel = function () {
                        $scope.selected = null;
                        $scope.levelSelected = null;
                        $mdDialog.hide();
                    };

                    function cardCollector() {
                        var yaTengo = [];

                        // Saco de collection las cartas que son candidatas a subir de nivel
                        $scope.global.user.game.collection.forEach(function (card) {
                            // Paso de las cartas que no pueden subirse de nivel
                            if (card.type === CONSTANTS.cardTypes.place) {
                                return;
                            }

                            // Si ya apareció, miro si el nivel es máximo y no podría subir más
                            if (card.level >= $scope.global.system.maxCardLevel) {
                                return;
                            }

                            if (!$this.idAssociate[card.id]) {
                                $this.idAssociate[card.id] = [card._id];
                            } else {
                                $this.idAssociate[card.id].push(card._id);
                            }

                            var tag = card.id + card.level;

                            // Si no ha aparecido aún la añado a las que ya aparecieron
                            if (yaTengo.indexOf(tag) === -1) {
                                yaTengo.push(tag);
                            } else {
                                // es candidata ya que tengo al menos dos copias y level correcto
                                $scope.candidates.push(card);
                            }
                        });
                    }

                    function fnCardClick(event, card) {
                        $scope.selected = card.id;
                        $scope.levelSelected = card.level;
                    }

                    function fnCardClass(card) {
                        var clase = card.element;

                        if (card.id === $scope.selected) {
                            clase += ' selected';
                        }

                        return clase;
                    }
                }
            ]);
})();
