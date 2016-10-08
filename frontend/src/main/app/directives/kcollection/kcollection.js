(function () {
    'use strict';

    var app = angular.module('kafhe.directives');

    app.directive('kCollection', function () {
        /*var link = function (scope, element, attrs) {
         console.log("Manolo");
         console.log(scope.collection);
         };*/

        var controller = ['$scope', 'CONSTANTS', function ($scope, CONSTANTS) {
            console.log($scope.collection);
            $scope.a = 987;

            $scope.isPlace = function (card) {
                return card.type === CONSTANTS.cardTypes.place;
            };


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
