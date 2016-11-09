(function () {
    'use strict';

    angular.module('kafhe.controllers')
        .controller('CardLevelUp',
            ['$scope', '$rootScope', '$translate', 'CONSTANTS',
                function ($scope, $rootScope, $translate, CONSTANTS) {

                    $scope.candidates = [];

                    // Actualizo los datos del juego si hace falta
                    $scope.updateGameData(afterUpdate);

                    function afterUpdate() {
                        var yaTengo = [];

                        // Saco de collection las cartas que son candidatas a subir de nivel
                        $scope.global.user.game.collection.forEach(function (card) {
                            var tag = card.id + card.level;
                            console.log(tag);
                            // Si no ha aparecido aún la añado a las que ya aparecieron
                            if (yaTengo.indexOf(tag) === -1) {
                                yaTengo.push(tag);
                            } else {
                                // Si ya apareció, miro si el nivel es máximo y no podría subir más
                                if (card.level < $scope.global.system.maxCardLevel) {
                                    // es candidata ya que tengo al menos dos copias y level correcto
                                    $scope.candidates.push(card);
                                }
                            }
                        });
                    }
                }
            ]);
})();
