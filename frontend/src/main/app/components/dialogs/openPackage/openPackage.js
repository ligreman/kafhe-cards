(function () {
    'use strict';

    angular.module('kafhe.controllers')
        .controller('OpenPackage',
            ['$scope', '$rootScope', '$translate', '$mdDialog', 'CONSTANTS', 'API',
                function ($scope, $rootScope, $translate, $mdDialog, CONSTANTS, API) {

                    $scope.cartasSobre = [];


                    /*********************************************************************/
                    /*********************** FUNCIONES ***********************************/

                    $scope.open = function open(category) {
                        API.pack().open({
                            category: category
                        }, function (response) {
                            // Actualizo usuario
                            $scope.updateUserObject(response.data.user);

                            // Muestro un pop con las cartas nuevas
                            $scope.cartasSobre = response.data.extra;


                        });
                    };

                    $scope.accept = function () {
                        $mdDialog.hide();
                    };

                }
            ]);
})();
