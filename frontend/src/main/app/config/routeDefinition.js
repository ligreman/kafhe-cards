(function () {
    'use strict';

    angular.module('kafhe.config')
        .constant('ROUTES', {
            login: '/',
            loginValidation: '/login',
            error: '/error',
            home: '/home',
            planning: '/planning',
            explore: '/explore',
            character: '/character',
            breakfast: '/breakfast'
        });
})();
