(function () {
    'use strict';

    // Controlador de la pantalla de login
    angular.module('kafhe.controllers').controller('PlanningController',
        ['$scope', '$translate', 'API', '$log',
            function ($scope, $translate, API, $log) {

                // Actualizo los datos del juego si hace falta
                $scope.updateGameData();

                // Variables
                $scope.selectingOwn = {
                    weapon: [false],
                    armor: [false],
                    place: [false],
                    skill: [false, false, false]
                };
                $scope.selectingEnemy = {
                    weapon: [false],
                    armor: [false],
                    place: [false],
                    skill: [false, false, false]
                };

            }]);
})();
