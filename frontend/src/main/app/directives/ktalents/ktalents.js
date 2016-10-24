(function () {
    'use strict';

    var app = angular.module('kafhe.directives');

    app.directive('kTalents', function () {
        /*var link = function (scope, element, attrs) {
         console.log("Manolo");
         console.log(scope.collection);
         };*/

        var controller = ['$scope', 'CONSTANTS', '$mdDialog', '$timeout', '$log', '$location', 'ROUTES',
            function ($scope, CONSTANTS, $mdDialog, $timeout, $log, $location, ROUTES) {
                $scope.fullWideMode = ($location.path() === ROUTES.character);

                // Genero los arrays de talentos de las 3 ramas, por nivel
                var gameTalents = {
                    combat: {},
                    exploration: {},
                    survival: {}
                };

                $scope.$watch($scope.talents, function (newV) {
                    $scope.talents.forEach(function (talent) {
                        gameTalents[talent.branch][talent.level] = talent;
                    });
                    console.log("......");
                    console.log(newV);
                }, 1220);


                $scope.talentClick = fnTalentClick;


                /** FUNCIONES **/
                function fnTalentClick(event, talent) {

                }

                function fnShowCardDialog(event, card) {
                    $mdDialog.show({
                        controller: 'ShowCard',
                        templateUrl: 'app/components/dialogs/showCard/show-card.html',
                        scope: $scope,
                        preserveScope: true,
                        clickOutsideToClose: true,
                        escapeToClose: true,
                        locals: {
                            card: card
                        },
                        targetEvent: event
                    });
                }
            }];

        return {
            restrict: 'E',
            replace: 'true',
            templateUrl: 'app/directives/ktalents/ktalents.html',
            scope: {
                talents: '=',
                userTalents: '='
            },
            controller: controller
            // link: link
        };
    });
})();
