(function () {
    'use strict';

    var app = angular.module('kafhe.directives');

    app.directive('kCollection', function () {
        /*var link = function (scope, element, attrs) {
         console.log("Manolo");
         console.log(scope.collection);
         };*/

        var controller = ['$scope', 'CONSTANTS', '$mdDialog', 'KShare', 'KGame', '$log', '$location', 'ROUTES', '$translate',
            function ($scope, CONSTANTS, $mdDialog, KShare, KGame, $log, $location, ROUTES, $translate) {
                $scope.fullWideMode = ($location.path() === ROUTES.character);
                $scope.collectionViewAsGrid = true;

                $scope.roman = CONSTANTS.roman;

                $scope.isPlace = fnIsPlace;
                $scope.isWeapon = fnIsWeapon;
                $scope.isArmor = fnIsArmor;
                $scope.isSkill = fnIsSkill;
                $scope.isEncounter = fnIsEncounter;
                $scope.isEvent = fnIsEvent;
                $scope.cardTypeImage = KGame.cardTypeImage;
                $scope.getNumber = fnGetNumber;
                $scope.toggleView = fnToggleView;

                $scope.cardClick = fnCardClick;
                $scope.showCardDialog = fnShowCardDialog;
                $scope.showing = 'all';
                $scope.selecting = false;
                $scope.selectingData = null;

                // Listener de eventos
                KShare.listenData('card-selection', $scope, function (data) {
                    //{"type": type, "username": username, "index": index}
                    $scope.showing = data.type;
                    $scope.selecting = true;
                    $scope.selectingData = data;
                    $log.debug("Collection - selection mode");
                });
                KShare.listenData('card-deselection', $scope, function () {
                    $scope.showing = 'all';
                    $scope.selecting = false;
                    $scope.selectingData = null;
                    $log.debug("Collection - exit selection mode");
                });

                /** FUNCIONES **/

                function fnIsPlace(card) {
                    return card.type === CONSTANTS.cardTypes.place;
                }

                function fnIsWeapon(card) {
                    return card.type === CONSTANTS.cardTypes.weapon;
                }

                function fnIsArmor(card) {
                    return card.type === CONSTANTS.cardTypes.armor;
                }

                function fnIsSkill(card) {
                    return card.type === CONSTANTS.cardTypes.skill;
                }

                function fnIsEncounter(card) {
                    return card.type === CONSTANTS.cardTypes.encounter;
                }

                function fnIsEvent(card) {
                    return card.type === CONSTANTS.cardTypes.event;
                }

                function fnGetNumber(num) {
                    if (num > 0) {
                        return new Array(num);
                    } else {
                        return [];
                    }
                }

                function fnCardClick(event, card) {
                    // Si estoy seleccionando en página de planning, hago una cosa y si no otra
                    if ($scope.selecting) {
                        //Confirmo que quiero seleccionar esta carta
                        var confirm = $mdDialog.confirm()
                            .title($translate.instant('selectCardTitle'))
                            .textContent($translate.instant('selectCardContent', {card: card.name}))
                            .targetEvent(event)
                            .ok($translate.instant('textAssignCard'))
                            .cancel($translate.instant('textCancel'));

                        $mdDialog.show(confirm).then(function () {
                            // Le digo a planning que he elegido esto
                            KShare.sendData('card-scheduled', {
                                "type": $scope.selectingData.type,
                                "username": $scope.selectingData.username,
                                "index": $scope.selectingData.index,
                                "cardId": card._id
                            });

                            // termino la selección
                            $scope.showing = 'all';
                            $scope.selecting = false;
                            $scope.selectingData = null;
                        }, function () {
                        });
                    } else {
                        fnShowCardDialog(event, card);
                    }
                }

                function fnShowCardDialog(event, card) {
                    $mdDialog.show({
                        controller: 'ShowCard',
                        templateUrl: 'app/components/dialogs/showCard/show-card.html',
                        scope: $scope,
                        preserveScope: true,
                        clickOutsideToClose: true,
                        fullscreen: true,
                        escapeToClose: true,
                        locals: {
                            card: card
                        },
                        targetEvent: event
                    });
                }

                function fnToggleView() {
                    $scope.collectionViewAsGrid = !$scope.collectionViewAsGrid;
                }
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
