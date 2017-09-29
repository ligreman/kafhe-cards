(function () {
    'use strict';

    angular.module('kafhe.config')
        .constant('ROUTES', {
            login: '/',
            loginValidation: '/login',
            error: '/error',
            home: '/home',
            homeLite: '/homelite',
            planning: '/planning',
            explore: '/explore',
            character: '/character',
            breakfast: '/breakfast'
        });
})();
