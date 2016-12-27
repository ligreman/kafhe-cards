(function () {
    'use strict';

    var app = angular.module('kafhe.directives');

    app.directive('kTalents', function () {
        var controller = ['$scope', 'CONSTANTS', '$mdDialog', '$timeout', '$log', 'KCommon', '$translate', 'API', '$window',
            function ($scope, CONSTANTS, $mdDialog, $timeout, $log, KCommon, $translate, API, $window) {
                // Variables
                var $this = this;
                $this.talentClick = fnTalentClick;

                // Cuando tenga los bindings del scope hechos ya tendré en $this los talents y demás
                $this.$onInit = function () {
                    // Genero los arrays de talentos de las 3 ramas, por nivel
                    $this.nodes = new vis.DataSet([
                        {
                            id: 'combat', initialNode: true, level: -1, group: 'initialNode',
                            label: $translate.instant('combat').toUpperCase()
                        },
                        {
                            id: 'exploration', initialNode: true, level: -1, group: 'initialNode',
                            label: $translate.instant('exploration').toUpperCase()
                        },
                        {
                            id: 'survival', initialNode: true, level: -1, group: 'initialNode',
                            label: $translate.instant('survival').toUpperCase()
                        }
                    ]);
                    var edges = new vis.DataSet();

                    $this.talentsArray = KCommon.objToArray($this.talents);
                    $this.userTotalTalents = $this.userTalents.survival.concat($this.userTalents.exploration, $this.userTalents.combat);
                    $scope.points = $this.userTalents.points;

                    $this.talentsArray.forEach(function (talent) {
                        // Grupo o estado del nodo
                        var grupo = 'disabled', img = 'block';
                        if ($this.userTotalTalents.indexOf(talent.id) !== -1) {
                            // Lo tengo ya
                            grupo = 'adquired';
                            img = talent.id;
                        } else if (isAdquirable($this.talents[talent.id], $this.userTotalTalents)) {
                            grupo = 'adquirable';
                            img = talent.id + '_bw'
                        }

                        // Creo el nodo
                        $this.nodes.add({
                            id: talent.id,
                            // label: talent.name,
                            group: grupo,
                            shape: 'image',
                            image: 'assets/img/talents/' + img + '.png',
                            shapeProperties: {
                                useBorderWithImage: true
                            },
                            borderWidth: 3,
                            borderWidthSelected: 3,
                            title: generateTitle(talent),
                            level: talent.level,
                            data: {
                                name: talent.name,
                                branch: talent.branch,
                                description: talent.description,
                                cost: talent.cost,
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
                            selectable: true
                        },
                        physics: {
                            enabled: false
                        },
                        edges: {
                            hoverWidth: 0,
                            selectionWidth: 0,
                            width: 3
                        },
                        nodes: {
                            labelHighlightBold: false,
                            color: {
                                background: '#000000',
                                hover: {background: '#000000'},
                                highlight: {background: '#000000'}
                            },
                            font: {face: 'Noto Sans'}
                        },
                        groups: {
                            useDefaultGroups: false,
                            initialNode: {
                                borderWidth: 0,
                                color: {
                                    background: '#303030',
                                    border: '#4CAF50',
                                    hover: {border: '#4CAF50', background: '#303030'},
                                    highlight: {border: '#4CAF50', background: '#303030'}
                                },
                                shape: 'box',
                                font: {color: '#F5F5F5', size: 24}
                            },
                            disabled: {
                                color: {
                                    border: '#000000',
                                    hover: {border: '#000000'},
                                    highlight: {border: '#000000'}
                                }
                            },
                            adquirable: {
                                color: {
                                    border: '#9E9E9E',
                                    hover: {border: '#FDD835'},
                                    highlight: {border: '#FDD835'}
                                }
                            },
                            adquired: {
                                color: {
                                    border: '#4CAF50',
                                    hover: {border: '#4CAF50'},
                                    highlight: {border: '#4CAF50'}
                                }
                            }
                        }
                    };

                    // initialize your network!
                    $scope.network = new vis.Network(container, {nodes: $this.nodes, edges: edges}, options);

                    // Listeners
                    $scope.network.on('doubleClick', function (data) {
                        if (data.nodes.length === 1) {
                            var nodo = $this.nodes.get(data.nodes[0]);

                            // Si no es nodo inicial, pregunto si quieres adquirilo, si tienes puntos
                            if ($scope.points > 0) {
                                if (!nodo.initialNode && nodo.group === 'adquirable') {
                                    $this.talentClick($this.talents[nodo.id], nodo, nodo.event);
                                }
                            } else {
                                $this.growlNotification('waning', 'textNoMoreTalentPoints');
                            }
                        }
                    });
                };


                /** FUNCIONES **/
                function fnTalentClick(talent, nodo, event) {
                    var confirm = $mdDialog.confirm()
                        .title($translate.instant('textTalentAddTitle'))
                        .textContent($translate.instant('textTalentAdd', {name: nodo.data.name}))
                        .ok($translate.instant('textContinue'))
                        .cancel($translate.instant('textCancel'))
                        .targetEvent(event);

                    $mdDialog.show(confirm).then(function () {
                        // OK, asigno el talento
                        API.character().talent({
                            talent: talent.id
                        }, function (response) {
                            if (response) {
                                $this.callback(response.data.user);
                                // Actualizo las variables "locales"
                                $scope.points--;
                                // nodo.group = 'adquired';
                                // nodo.image = 'assets/img/talents/' + nodo.id + '.png';
                                // $this.nodes.update(nodo);
                                // $scope.network.redraw();
                                $window.location.reload();
                            }
                        });
                    }, function () {
                    });
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

                /**
                 * Genera el HTML del título
                 */
                function generateTitle(talent) {
                    var html = '';
                    console.log(talent);

                    html += '<div>' +
                        '<p class="text-bold text-center">' + talent.name + '</p>' +
                        '<p class="tooltip-block-quote">' + talent.description + '</p>';

                    if (talent.cost > 1) {
                        html += '<p class="tooltip-block-p">' + $translate.instant('textCostTalent') + ': ' + talent.cost + '</p>';
                    }

                    html += '</div>';

                    return html;
                }
            }];

        return {
            restrict: 'E',
            templateUrl: 'app/directives/ktalents/ktalents.html',
            scope: {},
            bindToController: {
                talents: '=',
                userTalents: '=',
                callback: '=',
                growlNotification: '='
            },
            controller: controller,
            controllerAs: 'kt'
        };
    });
})();
