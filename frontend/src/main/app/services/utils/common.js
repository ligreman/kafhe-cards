(function () {
    'use strict';

    var commonModule = angular.module('kafhe.services');

    /**
     * Servicio para compartir información entre controladores, y de gestión de eventos
     */
    commonModule.factory('KCommon', [
        function () {
            function objToArray(obj) {
                if (!obj) {
                    return null;
                }

                return Object.keys(obj).map(function (key) {
                    return obj[key];
                });
            }

            //Expongo los métodos del servicio
            return {
                objToArray: objToArray
            };
        }
    ]);


})();
