(function () {
    'use strict';

    angular.module('kafhe.controllers')
        .controller('OpenPackage',
            ['$scope', '$rootScope', '$translate', '$mdDialog', 'CONSTANTS', 'API',
                function ($scope, $rootScope, $translate, $mdDialog, CONSTANTS, API) {



                    /*********************************************************************/
                    /*********************** FUNCIONES ***********************************/

                    $scope.accept = function accept() {
                        API.collection().
                        $mdDialog.hide();
                    };

                }
            ]);
})();
