#!/usr/bin/env node

'use strict';

// Hora en España
process.env.TZ = "Europe/Madrid";

var fecha = new Date(),
    hora = fecha.getHours(), //0-23
    dia = fecha.getDay(); //0-6 siendo 0 domingo

var basePath = process.env.OPENSHIFT_REPO_DIR || 'D:\\Workspace\\www\\kafhe_4.0_cards\\development\\webservice\\src\\main';
basePath += '/';


var mongoose = require('mongoose');
var mongoHost = process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME || 'mongodb://localhost/kafhe';
mongoose.connect(mongoHost, {});
mongoose.Promise = require('q').Promise;

require(basePath + 'models/createModels')(mongoose);

var config = require(basePath + 'modules/config'),
    gameDao = require(basePath + 'modules/dao/gameDao'),
    userDao = require(basePath + 'modules/dao/userDao'),
    lockFile = basePath + 'maintenance.lock',
    // events = require('events'),
    fs = require('fs'),
    Q = require('q');

// Array de acciones durante la semana
var weekActions = [
    '1#1', // 0
    '1#8',
    '1#11',
    '2#1',
    '2#11',
    '3#1',
    '3#11',
    '4#1',
    '4#11',
    '5#1',
    '5#15' // 11
];

// Compruebo el fichero de lock
var existsLockFile = fs.existsSync(lockFile);

if (!existsLockFile) {
    fs.writeFileSync(lockFile, '');
}

// Leo el fichero
var lastActionMade = fs.readFileSync(lockFile);
var actionsToDo = [];

var ahora = dia + '#' + hora;
var ahoraAction = weekActions.indexOf(ahora);

// Si hay lastaction, ahoraAction y no son la misma
if ((lastActionMade !== '') && (ahoraAction !== -1) && (lastActionMade !== ahoraAction)) {
    lastActionMade = parseInt(lastActionMade);

    // Compruebo qué dia y hora es la última ejecución que he realizado
    // Si está a -1, hago como si es la última
    var previousAction = ahoraAction - 1;
    if (previousAction < 0) {
        previousAction = 11;
    }

    // Voy a ver si la acción anterior a la actual es la última realizada
    if (previousAction !== lastActionMade) {
        // Me he colado acciones, tendré que recuperar estado
        do {
            lastActionMade++;
            // Si me voy a pasar de largo
            if (lastActionMade >= weekActions.length) {
                lastActionMade = 0;
            }

            actionsToDo.push(weekActions[lastActionMade]);
        } while (lastActionMade !== previousAction);
    }
}

// Sea como sea tengo que ejecutar la acción de ahora, si es que hay acción
if (ahoraAction !== -1) {
    actionsToDo.push(weekActions[ahoraAction]);
}

if (actionsToDo.length > 0) {
    // voy creando promises
    var promises = [];

    actionsToDo.forEach(function (action) {
        var datos = action.split('#');
        promises.push(maintain(datos[0], datos[1]));
    });

    if (promises.length > 0) {
        //Lanzo las promises
        Q.all(promises).spread(function (result) {
            console.log('---- FIN ----');

            // Escribo el fichero de lock con la última acción
            fs.writeFileSync(lockFile, ahoraAction);

            salir();
        }).fail(function (error) {
            console.error(error);
            salir();
        });
    } else {
        salir();
    }
} else {
    salir();
}

//Gestor de eventos
// var eventEmitter = new events.EventEmitter();

// Esto se ejecutará a la 1 de la mañana
// hora = 1;
/*if (hora !== 1) {
 salir();
 }*/
// dia = 6;
/*
 + Reseteo para juegos diario:
 - Borro todas las de schedule.
 - Borro todas las de collection de tipo 'place::capital', 'place::town' y 'skill'
 - Añado una carta por cada una en unlocked, que se compone de 'place' de tipo capital y town y 'skill'
 - Limpiar el journal
 - Dar recompensas

 + Al cerrar el game (lanzar el desayuno):
 - Sube de rank de toda la gente
 - Se da punto de talento a toda la gente
 - Sube times de toda la gente
 - Al llamador se aplica el reset por llamar

 + Reseteo por llamar:
 - rank =1
 - calls +1
 - fame =0
 - packs =[]
 - collection =[]
 - unlocked =[]
 - talents =[resetear]
 - Añadir a unlocked las capitales

 + Reseteo entre desayunos de usuario si se ha llamado:
 - Borro todas las de schedule.
 - Borra el journal y notification
 - Borra rewards
 - Order pasa a last order, y order se limpia

 + Reseteo entre desayunos de game tanto si se ha llamado como si no:
 - Borra notifications de game
 - Borra caller
 - Estado a weekend

 */

// dia = 5;
// hora = 15;

function maintain(dia, hora) {
    var deferred = Q.defer();

    switch (dia) {
        /**
         * LUNES
         *  - A la 1:00am pongo las partidas en estado planning, las que están en estado weekend y reseteo diario
         *  - A las 8:00am pongo a todos afk = false
         *  - A las 11:00am inicio los primeros juegos de la semana, pongo el estado en explore
         */
        case 1:
            // 1:00 AM
            if (hora === 1) {
                console.log('LUNES - 1AM');
                Q.all([
                    gameDao.gameUpdateAllByStatus(config.GAME_STATUS.weekend, config.GAME_STATUS.planning),
                    userDao.usersDailyReset('all')
                ]).spread(function (result) {
                    console.log(result);
                    console.log('Partidas en estado weekend después del fin de semana se ponen en estado planning.');
                    console.log('Jugadores de todos los grupos reseteados (daily).');
                    deferred.resolve();
                }).fail(function (error) {
                    console.error(error);
                    deferred.reject(new Error(error));
                });
            }

            // 8:00 AM
            if (hora === 8) {
                console.log('LUNES - 8AM');
                Q.all([
                    userDao.usersAFK('all', false)
                ]).spread(function (result) {
                    console.log(result);
                    console.log('Jugadores de todos los grupos afk=false.');
                    deferred.resolve();
                }).fail(function (error) {
                    console.error(error);
                    deferred.reject(new Error(error));
                });
            }

            // 11:00 AM
            if (hora === 11) {
                console.log('LUNES - 11AM');
                Q.all([
                    gameDao.gameUpdateAllByStatus(config.GAME_STATUS.planning, config.GAME_STATUS.explore)
                ]).spread(function (result) {
                    console.log(result);
                    console.log('Partidas en estado planning del lunes se ponen en estado explore.');
                    deferred.resolve();
                }).fail(function (error) {
                    console.error(error);
                    deferred.reject(new Error(error));
                });
            }
            break;

        /**
         * MARTES, MIÉRCOLES y JUEVES
         *  - A la 1:00am cierro los juegos anteriores (pongo en estado planning los de estado explore) y reseteo diario
         *  - A las 11:00am inicio los segundos juegos de la semana, pongo el estado en explore
         */
        case 2:
            console.log('MARTES');
        case 3:
            console.log('MIÉRCOLES');
        case 4:
            console.log('JUEVES');
            // 1:00 AM
            if (hora === 1) {
                console.log('1AM');
                Q.all([
                    gameDao.gameUpdateAllByStatus(config.GAME_STATUS.explore, config.GAME_STATUS.planning),
                    userDao.usersDailyReset('all')
                ]).spread(function (result) {
                    console.log(result);
                    console.log('Partidas en estado explore pasan a estado planning en la madrugada.');
                    console.log('Jugadores de todos los grupos reseteados (daily).');
                    deferred.resolve();
                }).fail(function (error) {
                    console.error(error);
                    deferred.reject(new Error(error));
                });
            }

            // 11:00 AM
            if (hora === 11) {
                console.log('11AM');
                Q.all([
                    gameDao.gameUpdateAllByStatus(config.GAME_STATUS.planning, config.GAME_STATUS.explore)
                ]).spread(function (result) {
                    console.log(result);
                    console.log('Partidas en estado planning se ponen en estado explore.');
                    deferred.resolve();
                }).fail(function (error) {
                    console.error(error);
                    deferred.reject(new Error(error));
                });
            }
            break;
        /**
         * VIERNES
         *  - A la 1:00am cierro los juegos anteriores (estado explore) y pongo las partidas en resolution
         *
         *  - Si se lanza el desayuno, se pone en estado cerrado (cerrar desayuno).
         *
         *  - A las 15:00 pongo las cerradas en weekend, si tienen el repeat. Limpio el caller y log.
         *    Pongo las que sigan en resolution (no se han lanzado) en modo weekend para jugar la semana siguiente.
         *    Reseteo entre desayunos de game.
         *
         */
        case 5:
            // 1:00 AM
            if (hora === 1) {
                console.log('VIERNES - 1AM');
                Q.all([
                    gameDao.gameUpdateAllByStatus(config.GAME_STATUS.explore, config.GAME_STATUS.resolution),
                    userDao.usersDailyReset('all')
                ]).spread(function (result) {
                    console.log(result);
                    console.log('Partidas en estado explore pasan a estado resolution para el viernes.');
                    console.log('Jugadores de todos los grupos reseteados (daily).');
                    deferred.resolve();
                }).fail(function (error) {
                    console.error(error);
                    deferred.reject(new Error(error));
                });
            }

            // 15:00 PM
            if (hora === 15) {
                console.log('VIERNES - 15PM');
                // Respetar el orden de ejecución
                Q.all([
                    userDao.usersBreakfastReset('all')
                ]).spread(function (result) {
                    console.log(result);
                    console.log('Jugadores de todos los grupos de partidas finalizadas reseteados (breakfast).');

                    Q.all([
                        gameDao.gameBreakfastReset(),
                        gameDao.gameUpdateAllByStatus(config.GAME_STATUS.resolution, config.GAME_STATUS.weekend)
                    ]).spread(function (result) {
                        console.log(result);
                        console.log('Partidas finalizadas: reseteadas y puestas a weekend para la semana que viene.');
                        console.log('Partidas no lanzadas: puestas a weekend para la semana que viene.');
                        deferred.resolve();
                    }).fail(function (error) {
                        console.error(error);
                        deferred.reject(new Error(error));
                    });
                }).fail(function (error) {
                    console.error(error);
                    deferred.reject(new Error(error));
                });
            }
            break;
        default:
            deferred.resolve();
    }

    return deferred.promise;
}

function salir() {
    mongoose.disconnect();
    process.exit();
}

