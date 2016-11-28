(function () {
    'use strict';

    angular.module('kafhe.controllers')
        .controller('OrderDetail',
            ['$scope', '$translate', '$mdDialog', 'API',
                function ($scope, $translate, $mdDialog, API) {

                    $scope.comensales = [];

                    // Cojo los datos
                    API.order().list(function (response) {
                        if (response) {
                            $scope.comensales = response.data.orders;
                        }
                    });

                    /*********************************************************************/
                    /*********************** FUNCIONES ***********************************/

                    $scope.accept = function accept() {
                        $mdDialog.hide();
                    };


                }
            ]);
})();
