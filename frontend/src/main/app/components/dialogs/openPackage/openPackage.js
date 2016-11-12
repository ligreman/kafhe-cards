(function () {
    'use strict';

    angular.module('kafhe.controllers')
        .controller('OpenPackage',
            ['$scope', '$rootScope', '$translate', '$mdDialog', 'CONSTANTS', 'API',
                function ($scope, $rootScope, $translate, $mdDialog, CONSTANTS, API) {



                    /*********************************************************************/
                    /*********************** FUNCIONES ***********************************/

                    $scope.open = function open(category) {
                        API.pack().open({
                            category: category
                        }, function (response) {
                        });
                    };

                    $scope.accept = function () {
                        $mdDialog.hide();
                    };

                }
            ]);
})();
