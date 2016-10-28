(function () {
    'use strict';

    angular.module('kafhe.controllers')
        .controller('ShowCard',
            ['$scope', '$rootScope', '$translate', '$mdDialog', 'card', 'CONSTANTS',
                function ($scope, $rootScope, $translate, $mdDialog, card, CONSTANTS) {

                    $scope.roman = CONSTANTS.roman;
                    $scope.card = card;

                    /*********************************************************************/
                    /*********************** FUNCIONES ***********************************/

                    $scope.accept = function accept() {
                        $mdDialog.hide();
                    };

                    $scope.isPlace = function (card) {
                        return card.type === CONSTANTS.cardTypes.place;
                    }
                }
            ]);
})();
