(function () {
    'use strict';

    var app = angular.module('kafhe.directives');

    app.directive('kTalents', function () {
            var controller = ['$scope', 'CONSTANTS', '$mdDialog', '$timeout', '$log', 'KCommon',
                    function ($scope, CONSTANTS, $mdDialog, $timeout, $log, KCommon) {
                        var $this = this;

                        // Genero los arrays de talentos de las 3 ramas, por nivel
                        var nodes = new vis.DataSet([
                            {id: 'combat', label: 'combat', initialNode: true, level: -1, group: 'initialNode'},
                            {id: 'exploration', label: 'exploration', initialNode: true, level: -1, group: 'initialNode'},
                            {
                                id: 'survival', label: 'survival', initialNode: true, level: -1, group: 'initialNode',
                                title: '<ul><li>mmm</li><li>psppp</li></ul>'
                            }
                        ]), edges = new vis.DataSet();

                        $this.talentsArray = KCommon.objToArray($this.talents);

                        $this.userTotalTalents = $this.userTalents.survival.concat($this.userTalents.exploration, $this.userTalents.combat);

                        $this.talentsArray.forEach(function (talent) {
                            // Grupo o estado del nodo
                            var grupo = 'disabled';
                            if ($this.userTotalTalents.indexOf(talent.id) !== -1) {
                                // Lo tengo ya
                                grupo = 'adquired';
                            } else if (isAdquirable($this.talents[talent.id], $this.userTotalTalents)) {
                                grupo = 'adquirable';
                            }

                            // Creo el nodo
                            nodes.add({
                                id: talent.id,
                                // label: talent.name,
                                group: grupo,
                                shape: 'image',
                                image: 'assets/img/talents/' + talent.id + '.png',
                                shapeProperties: {
                                    // borderDashes: true, //[dash length, gap length]
                                    useBorderWithImage: true
                                },
                                borderWidth: 3,
                                level: talent.level,
                                data: {
                                    branch: talent.branch,
                                    description: talent.description,
                                    skills: talent.skills,
                                }
                            });

                            talent.required.forEach(function (relation) {
                                edges.add({from: relation, to: talent.id});
                            });

                            // Si el talento este no tiene required ninguno, es que es inicial,
                            // lo asocio al nodo "label" que describe la rama talentos
                            if (talent.required.length <= 0) {
                                edges.add({from: talent.branch, to: talent.id});
                            }
                        });


                        console.log($scope.talents);
                        $scope.talentClick = fnTalentClick;

                        // Id de los talentos
                        /*var nodes = new vis.DataSet([
                         {id: 1, label: 'Node 1'},
                         {id: 11, label: 'Node 11'},
                         {id: 121, label: 'Node 121'},
                         {id: 2, label: 'Node 2'},
                         {id: 3, label: 'Node 3'},
                         {id: 4, label: 'Node 4'},
                         {id: 5, label: 'Node 5'}
                         ]);

                         // Relaciones, por cada talento, from Requerido to id
                         var edges = new vis.DataSet([
                         {from: 1, to: 3},
                         {from: 1, to: 2},
                         {from: 2, to: 4},
                         {from: 2, to: 5}
                         ]);*/

                        // create a network
                        var container = document.getElementById('network');

                        // provide the data in the vis format
                        var options = {
                            autoResize: true,
                            height: '100%',
                            width: '100%',
                            // locale: 'en',
                            // locales: locales,
                            clickToUse: false,
                            layout: {
                                hierarchical: {
                                    enabled: true,
                                    direction: "UD",
                                    sortMethod: "directed"
                                }
                            },
                            interaction: {
                                dragNodes: false,
                                hover: true,
                                // hoverConnectedEdges: false,
                                selectable: false
                            },
                            physics: {
                                enabled: true
                            },
                            edges: {
                                /*arrows: {
                                 to: {enabled: true, type: 'circle'}
                                 },*/
                                hoverWidth: 0,
                                width: 3
                            },
                            nodes: {
                                font: {
                                    face: 'Noto Sans'
                                }
                            },
                            groups: {
                                useDefaultGroups: false,
                                initialNode: {
                                    borderWidth: 3,
                                    color: {
                                        border: 'green',
                                        background: 'red',
                                        hover: {
                                            border: 'green'
                                        }
                                    }
                                },
                                disabled: {
                                    color: {
                                        border: 'black',
                                        hover: {
                                            border: 'black'
                                        }
                                    }
                                },
                                adquirable: {
                                    color: {
                                        border: 'grey',
                                        hover: {
                                            border: 'yellow'
                                        }
                                    }
                                },
                                adquired: {
                                    color: {
                                        border: 'green',
                                        hover: {
                                            border: 'green'
                                        }
                                    }
                                }
                            }
                            /*configure: {...},    // defined in the configure module.
                             edges: {...},        // defined in the edges module.
                             nodes: {...},        // defined in the nodes module.
                             groups: {...},       // defined in the groups module.
                             layout: {...},       // defined in the layout module.
                             interaction: {...},  // defined in the interaction module.
                             manipulation: {...}, // defined in the manipulation module.
                             physics: {...},      // defined in the physics module.*/
                        };

                        // initialize your network!
                        $scope.network = new vis.Network(container, {nodes: nodes, edges: edges}, options);

                        // Listeners
                        $scope.network.on('selectNode', function (data) {
                            console.log(data);
                        });

                        /** FUNCIONES **/
                        function fnTalentClick(event, talent) {

                        }

                        /**
                         * Mira a ver si puedo adquirir el talento, ya que cumplo todos los requisitos
                         */
                        function isAdquirable(talent, userTalents) {
                            // Miro si todos los requisitos del talento están adquiridos
                            var noCumple = false;
                            talent.required.forEach(function (requisito) {
                                if (userTalents.indexOf(requisito) === -1) {
                                    noCumple = true;
                                }
                            });

                            return !noCumple;
                        }


                    }]
                ;

            return {
                restrict: 'E',
                replace: 'true',
                templateUrl: 'app/directives/ktalents/ktalents.html',
                scope: {},
                bindToController: {
                    talents: '=',
                    userTalents: '='
                },
                controller: controller,
                controllerAs: 'kt'
            };
        }
    );
})();
