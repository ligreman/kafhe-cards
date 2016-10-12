(function () {
    'use strict';

    var app = angular.module('kafhe.directives');

    app.directive('kCollection', function () {
        /*var link = function (scope, element, attrs) {
         console.log("Manolo");
         console.log(scope.collection);
         };*/

        var controller = ['$scope', 'CONSTANTS', '$mdDialog', function ($scope, CONSTANTS, $mdDialog) {
            $scope.roman = CONSTANTS.roman;
            console.log($scope.roman[2]);
            console.log($scope.collection);
            $scope.a = 987;

            $scope.isPlace = fnIsPlace;
            $scope.showCardDialog = fnShowCardDialog;

            /** FUNCIONES **/

            function fnIsPlace(card) {
                return card.type === CONSTANTS.cardTypes.place;
            }

            function fnShowCardDialog(event) {
                $mdDialog.show({
                    locals: {},
                    controller: 'ShowCard',
                    templateUrl: 'app/components/dialogs/showCard/show-card.html',
                    scope: $scope,
                    preserveScope: true,
                    clickOutsideToClose: true,
                    escapeToClose: true,
                    targetEvent: event
                });
            }

            // var cardsDB = TAFFY($scope.cardsDatabase);
        }];

        return {
            restrict: 'E',
            replace: 'true',
            templateUrl: 'app/directives/kcollection/kcollection.html',
            scope: {
                collection: '=cardCollection'
            },
            controller: controller
            // link: link
        };
    });
})();
