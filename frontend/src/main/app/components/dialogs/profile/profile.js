(function () {
    'use strict';

    angular.module('kafhe.controllers')
        .controller('Profile',
            ['$scope', '$rootScope', '$translate', '$mdDialog', 'API', 'growl',
                function ($scope, $rootScope, $translate, $mdDialog, API, growl) {
                    $scope.user = {
                        alias: $scope.global.user.alias,
                        avatar: $scope.global.user.avatar
                    };

                    /*********************************************************************/
                    /*********************** FUNCIONES ***********************************/

                    $scope.saveUser = function () {
                        if ($scope.user.password !== $scope.user.repassword) {
                            growl.error($translate.instant('error'));
                            return;
                        }

                        // Calculo el password
                        var pass = $scope.user.password;
                        var shaObj = new jsSHA('SHA-512', 'TEXT');
                        shaObj.update(pass);
                        var hash = shaObj.getHash('HEX');

                        console.log(pass);
                        console.log(hash);

                        // Guardo el usuario
                        //password: la nueva contraseña codificada SHA512; alias; avatar
                        API.profile().update({
                            password: hash,
                            alias: $scope.user.alias,
                            avatar: $scope.user.avatar
                        }, function (response) {
                            if (response) {

                            }

                            $mdDialog.hide();
                        });
                    };

                    $scope.cancel = function cancel() {
                        $mdDialog.cancel();
                    };

                }
            ]);
})();
