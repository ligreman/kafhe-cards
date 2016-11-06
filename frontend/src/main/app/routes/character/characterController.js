(function () {
    'use strict';

    // Controlador de la pantalla de login
    angular.module('kafhe.controllers').controller('CharacterController',
        ['$scope', '$translate', 'API', '$log', 'KShare', '$location', 'CONSTANTS',
            function ($scope, $translate, API, $log, KShare, $location, CONSTANTS) {
                $scope.viewing = 'talents';

                $scope.toggle = fnToggle;

                // Actualizo los datos del juego si hace falta
                $scope.updateGameData(afterUpdate);


                function afterUpdate() {
                }

                function processData(data) {


                }

                function fnToggle() {
                    if ($scope.viewing === 'collection') {
                        $scope.viewing = 'talents';
                    } else {
                        $scope.viewing = 'collection';
                    }
                }


            }]);
})();
