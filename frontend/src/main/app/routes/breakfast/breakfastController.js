(function () {
    'use strict';

    // Controlador de la pantalla de login
    angular.module('kafhe.controllers')
        .controller('BreakfastController',
            ['$scope', '$mdDialog', '$translate', 'API', 'CONSTANTS',
                function ($scope, $mdDialog, $translate, API, CONSTANTS) {
                    var $this = this;

                    $scope.selection = {
                        meal: '',
                        drink: '',
                        ito: false
                    };
                    $scope.espiral = CONSTANTS.espiralTlfn;
                    $scope.gameStatuses = CONSTANTS.gameStatuses;

                    $scope.hasOrdered = fnHasOrdered;
                    $scope.hasOrderedPreviously = fnHasOrderedPreviously;

                    $scope.listEaters = [];
                    $scope.listOrders = {};
                    $scope.refreshListEaters = fnListEaters;
                    $scope.refreshListOrders = fnListOrders;

                    $scope.refreshListEaters();
                    $scope.refreshListOrders();

                    $scope.showOrderDetail = fnShowOrderDetail;

                    /* FUNCIONES */

                    function fnHasOrdered() {
                        if ($scope.global.user && $scope.global.user.game) {
                            return $scope.global.user.game.order.meal !== null || $scope.global.user.game.order.drink !== null;
                        }
                        return false;
                    }

                    function fnHasOrderedPreviously() {
                        if ($scope.global.user && $scope.global.user.game) {
                            return $scope.global.user.game.last_order.meal !== null || $scope.global.user.game.last_order.drink !== null;
                        }
                        return false;
                    }

                    // Actualizamos mis datos de partida en caso de que haga falta
                    $scope.updateGameData(function () {
                        if ($scope.global.user.game.order && $scope.global.user.game.order.meal) {
                            $scope.selection.meal = $scope.global.user.game.order.meal.id;
                        }

                        if ($scope.global.user.game.order && $scope.global.user.game.order.drink) {
                            $scope.selection.drink = $scope.global.user.game.order.drink.id;
                        }

                        if ($scope.global.user.game.order && $scope.global.user.game.order.ito) {
                            $scope.selection.ito = $scope.global.user.game.order.ito;
                        }
                    });

                    // Cambio de pedido
                    $scope.btnMakeOrder = function (event) {
                        if ($scope.selection.ito === false) {
                            // Si no es ITO pediré confirmación
                            var confirm = $mdDialog.confirm()
                                .title($translate.instant('textOrderNoItoTitle'))
                                .content($translate.instant('textOrderNoItoContent'))
                                .ok($translate.instant('textContinue'))
                                .cancel($translate.instant('textCancel'))
                                .targetEvent(event);

                            $mdDialog.show(confirm).then(function () {
                                // OK, envío el pedido
                                sendOrder();
                            }, function () {
                                $scope.growlNotification('info', 'textYaMeParecia');
                            });
                        } else {
                            sendOrder();
                        }

                    };

                    // Envía un pedido al API
                    function sendOrder() {
                        // He seleccionado cambiar el pedido
                        API.order()
                            .create({
                                meal: $scope.selection.meal,
                                drink: $scope.selection.drink,
                                ito: $scope.selection.ito
                            }, function (response) {
                                if (response) {
                                    // Me devuelve el objeto usuario actualizado
                                    $scope.updateUserObject(response.data.user);

                                    // Mensaje growl de OK
                                    $scope.growlNotification('success', 'textOrderChanged');

                                    $scope.refreshListEaters();
                                }
                            });
                    }

                    // Envío la petición de eliminar el pedido
                    $scope.btnRemoveOrder = function () {
                        API.order().delete(function (response) {
                            if (response) {
                                // Me devuelve el objeto usuario actualizado
                                $scope.updateUserObject(response.data.user);

                                // Mensaje growl de OK
                                $scope.growlNotification('success', 'textOrderChanged');

                                $scope.selection = {
                                    meal: '',
                                    drink: '',
                                    ito: false
                                };

                                $scope.refreshListEaters();
                            }
                        });
                    };

                    // Lo del otro día
                    $scope.btnLastDayOrder = function () {
                        if ($scope.global.user.game.last_order) {
                            if ($scope.global.user.game.last_order.meal) {
                                $scope.selection.meal = $scope.global.user.game.last_order.meal.id;
                            }

                            if ($scope.global.user.game.last_order.drink) {
                                $scope.selection.drink = $scope.global.user.game.last_order.drink.id;
                            }

                            if ($scope.global.user.game.last_order.ito) {
                                $scope.selection.ito = $scope.global.user.game.last_order.ito;
                            }
                        } else {
                            $scope.growlNotification('warning', 'textNoLastOrder');
                        }
                    };

                    // Filtro ITO
                    $scope.itoSelected = function (element) {
                        return !($scope.selection.ito && !element.ito);
                    };

                    function fnListEaters() {
                        API.order().status(function (response) {
                            if (response) {
                                $scope.listEaters = response.data.players;
                                console.log(response.data.players);
                            }
                        });
                    }

                    function fnListOrders() {
                        API.order().list(function (response) {
                            if (response) {
                                // Hago las cuentas
                                var itos = 0, noItos = 0, itoOrders = {meals: {}, drinks: {}},
                                    noItoOrders = {meals: {}, drinks: {}};
                                response.data.orders.forEach(function (order) {
                                    if (!order.meal && !order.drink) {
                                        return;
                                    }

                                    if (order.ito) {
                                        itos++;
                                        if (order.meal)
                                            itoOrders.meals[order.meal.name] = itoOrders.meals[order.meal.name] + 1 || 1;
                                        if (order.drink)
                                            itoOrders.drinks[order.drink.name] = itoOrders.drinks[order.drink.name] + 1 || 1;
                                    } else {
                                        noItos++;
                                        if (order.meal)
                                            noItoOrders.meals[order.meal.name] = noItoOrders.meals[order.meal.name] + 1 || 1;
                                        if (order.drink)
                                            noItoOrders.drinks[order.drink.name] = noItoOrders.drinks[order.drink.name] + 1 || 1;
                                    }
                                });

                                $scope.listOrders = {
                                    itos: itos,
                                    noItos: noItos,
                                    itoOrders: itoOrders,
                                    noItoOrders: noItoOrders
                                };
                            }
                        });
                    }

                    function fnShowOrderDetail(event) {
                        $mdDialog.show({
                            controller: 'OrderDetail',
                            templateUrl: 'app/components/dialogs/orderDetail/order-detail.html',
                            scope: $scope,
                            preserveScope: true,
                            clickOutsideToClose: true,
                            escapeToClose: true,
                            targetEvent: event
                        });
                    }

                }]);
})();
