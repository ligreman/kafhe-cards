(function () {
    'use strict';

    angular.module('kafhe.controllers')
        .controller('ShowCard',
            ['$scope', '$rootScope', '$translate', '$mdDialog', 'card', 'CONSTANTS', 'KGame',
                function ($scope, $rootScope, $translate, $mdDialog, card, CONSTANTS, KGame) {

                    $scope.roman = CONSTANTS.roman;
                    $scope.card = card;
                    $scope.cardTextType = KGame.cardTextType;
                    $scope.isPlace = fnIsPlace;
                    $scope.isWeapon = fnIsWeapon;
                    $scope.isArmor = fnIsArmor;
                    $scope.isSkill = fnIsSkill;
                    $scope.isEncounter = fnIsEncounter;
                    $scope.isEvent = fnIsEvent;
                    console.info(card);
                    /*********************************************************************/
                    /*********************** FUNCIONES ***********************************/

                    $scope.accept = function accept() {
                        $mdDialog.hide();
                    };

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
                }
            ]);
})();
