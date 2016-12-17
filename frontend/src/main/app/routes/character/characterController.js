(function () {
    'use strict';

    // Controlador de la pantalla de login
    angular.module('kafhe.controllers').controller('CharacterController',
        ['$scope', '$log', 'KShare', '$mdDialog',
            function ($scope, $log, KShare, $mdDialog) {
                $scope.viewing = 'talents';

                $scope.toggle = fnToggle;
                $scope.cardLevelUpDialog = fnCardLevelUpDialog;
                $scope.openPackageDialog = fnOpenPackageDialog;
                $scope.updateUser = fnUpdateUser;

                // Actualizo los datos del juego si hace falta
                $scope.updateGameData();

                function fnToggle() {
                    if ($scope.viewing === 'collection') {
                        $scope.viewing = 'talents';
                    } else {
                        $scope.viewing = 'collection';
                    }
                }

                function fnCardLevelUpDialog(event) {
                    $mdDialog.show({
                        controller: 'CardLevelUp',
                        templateUrl: 'app/components/dialogs/cardLevelUp/card-level-up.html',
                        scope: $scope,
                        preserveScope: true,
                        clickOutsideToClose: true,
                        escapeToClose: true,
                        fullscreen: true,
                        locals: {},
                        targetEvent: event
                    });
                }

                function fnOpenPackageDialog(event) {
                    $mdDialog.show({
                        controller: 'OpenPackage',
                        templateUrl: 'app/components/dialogs/openPackage/open-package.html',
                        scope: $scope,
                        preserveScope: true,
                        clickOutsideToClose: true,
                        escapeToClose: true,
                        fullscreen: true,
                        locals: {},
                        targetEvent: event
                    });
                }

                /**
                 * Pasarela para la directiva para acceder al update user
                 */
                function fnUpdateUser(data) {
                    $scope.updateUserObject(data);
                }

            }]);
})();
