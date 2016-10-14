(function () {
    'use strict';

    var app = angular.module('kafhe.directives');

    app.directive('kHeader', [function () {
        return {
            restrict: 'E',
            replace: 'true',
            scope: true,
            templateUrl: 'app/directives/kheader/kheader.html',
            controller: ['$scope', 'API', 'KSession', 'CONSTANTS', '$mdDialog',
                function ($scope, API, KSession, CONSTANTS, $mdDialog) {

                    // Variables publicadas
                    $scope.gameStatuses = CONSTANTS.gameStatuses;

                    // Funciones publicadas
                    $scope.btnProfile = fnBtnProfile;
                    $scope.logout = fnLogout;


                    /*********************************************************************/
                    /*********************** FUNCIONES ***********************************/


                    /**
                     * Botón para mostrar u ocultar el menú profile
                     */
                    function fnBtnProfile($event) {
                        $mdDialog.show({
                            locals: {},
                            controller: 'Profile',
                            templateUrl: 'app/components/dialogs/profile/profile.html',
                            scope: $scope,
                            preserveScope: true,
                            clickOutsideToClose: true,
                            escapeToClose: true,
                            targetEvent: $event
                        }).then(function (result) {

                        });
                    }

                    // Llamo al API para resetear la base de datos
                    $scope.resetBBDD = function () {
                        API.dev()
                            .resetmongo({}, function (response) {
                                if (response) {
                                    // Mensaje growl de OK
                                    $scope.growlNotification('success', 'OK');
                                }
                            });
                    };

                    // Llamo al API para cambiar el estado de la partida
                    $scope.gameStatus = function (estado) {
                        API.dev()
                            .gamestatus({
                                status: estado
                            }, function (response) {
                                if (response) {
                                    // Mensaje growl de OK
                                    $scope.growlNotification('success', 'OK');
                                }
                            });
                    };

                    function fnLogout() {
                        API.session().logout(function (response) {
                            if (response && response.data.logout) {
                                $scope.growlNotification('success', 'Logout correcto');

                                // Hago logout
                                KSession.logout(true);
                            }
                        })
                    }
                }

            ]
        };
    }]);
})();
