(function () {
    'use strict';

    angular.module('kafhe.controllers')
        .controller('Profile',
            ['$scope', '$rootScope', '$translate', '$mdDialog',
                function ($scope, $rootScope, $translate, $mdDialog) {

                    $scope.targetsSelected = [];


                    /*********************************************************************/
                    /*********************** FUNCIONES ***********************************/

                    $scope.accept = function accept() {
                        $mdDialog.hide({targets: $scope.targetsSelected});
                    };

                    $scope.cancel = function cancel() {
                        $mdDialog.cancel();
                    };

                    $scope.filterTargets = function (player) {
                        var retorno = true;

                        // Si soy yo no lo muestro
                        if (player.username === $rootScope.kUserLogged) {
                            retorno = false;
                        }

                        // Si está afk no lo muestro
                        if (player.game.afk) {
                            retorno = false;
                        }

                        return retorno;
                    };

                    $scope.checkSelect = function (playerId) {
                        // Si no lo tengo ya en el array de targets lo añado, si no lo quito
                        var position = $scope.targetsSelected.indexOf(playerId);
                        if (position === -1) {
                            $scope.targetsSelected.push(playerId);
                        } else {
                            $scope.targetsSelected.splice(position, 1);
                        }
                    };
                }
            ]);
})();
