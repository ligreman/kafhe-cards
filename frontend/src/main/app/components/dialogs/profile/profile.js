(function () {
    'use strict';

    angular.module('kafhe.controllers')
        .controller('Profile',
            ['$scope', '$rootScope', '$translate', '$mdDialog', 'API', 'growl', '$timeout', 'CONSTANTS',
                function ($scope, $rootScope, $translate, $mdDialog, API, growl, $timeout, CONSTANTS) {
                    $scope.user = {
                        alias: $scope.global.user.alias,
                        avatar: $scope.global.user.avatar
                    };
                    $scope.maxAvatarNumber = CONSTANTS.maxAvatarNumber;

                    $scope.selectAvatar = fnSelectAvatar;

                    $timeout(function () {
                        // Selecciono el avatar ya que de inicio no me lo hace el ng-class
                        angular.element('#avatar' + $scope.user.avatar).triggerHandler('click');
                    }, 0);


                    /*********************************************************************/
                    /*********************** FUNCIONES ***********************************/

                    $scope.saveUser = function () {
                        if ($scope.user.password !== $scope.user.repassword) {
                            growl.error($translate.instant('error'));
                            return;
                        }

                        // Calculo el password
                        var pass = $scope.user.password, hash = '';
                        console.log(pass);
                        if (pass && pass !== '') {
                            var shaObj = new jsSHA('SHA-512', 'TEXT');
                            shaObj.update(pass);
                            var hash = shaObj.getHash('HEX');
                        }

                        // Guardo el usuario
                        //password: la nueva contraseña codificada SHA512; alias; avatar
                        API.profile().update({
                            password: hash,
                            alias: $scope.user.alias,
                            avatar: $scope.user.avatar
                        }, function (response) {
                            if (response) {
                                $scope.growlNotification('success', 'OK');
                                $scope.global.user.alias = $scope.user.alias;
                                $scope.global.user.avatar = $scope.user.avatar;
                            }

                            $mdDialog.hide();
                        });
                    };

                    $scope.cancel = function cancel() {
                        $mdDialog.cancel();
                    };

                    $scope.range = function (min, max, step) {
                        step = step || 1;
                        var input = [];
                        for (var i = min; i <= max; i += step) {
                            input.push(i);
                        }
                        return input;
                    };

                    function fnSelectAvatar(id) {
                        $scope.user.avatar = id;
                    }
                }
            ]);
})();
