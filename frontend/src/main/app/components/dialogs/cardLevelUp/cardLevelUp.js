(function () {
    'use strict';

    angular.module('kafhe.controllers')
        .controller('CardLevelUp',
            ['$scope', '$rootScope', '$translate', '$mdDialog',  'CONSTANTS',
                function ($scope, $rootScope, $translate, $mdDialog,  CONSTANTS) {

                    $scope.roman = CONSTANTS.roman;
                    // $scope.card = card;
                    $scope.isPlace = fnIsPlace;
                    $scope.isWeapon = fnIsWeapon;
                    $scope.isArmor = fnIsArmor;
                    $scope.isSkill = fnIsSkill;
                    $scope.isEncounter = fnIsEncounter;
                    $scope.isEvent = fnIsEvent;

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
