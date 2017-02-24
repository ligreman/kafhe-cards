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
    '1#1',  //0 - Partidas weekend -> planning. Reinicio diario usuarios.
    '1#8',  //1 - Usuarios des-afk
    '1#11', //2 - Partidas planning -> explore
    '2#1',  //3 - Partidas explore -> planning. Reinicio diario usuarios.
    '2#11', //4 - Partidas planning -> explore
    '3#1',  //5 - Partidas explore -> planning. Reinicio diario usuarios.
    '3#11', //6 - Partidas planning -> explore
    '4#1',  //7 - Partidas explore -> planning. Reinicio diario usuarios.
    '4#11', //8 - Partidas planning -> explore
    '5#1',  //9 - Partidas explore -> resolution. Reinicio diario usuarios.
    '5#15'  //10 - Reseteo desayuno usuarios + partida. Partidas resolution -> weekend
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

console.log("Dia - hora: " + dia + " " + hora);
console.log("Ahora action " + ahoraAction);
console.log("Last action " + lastActionMade);

salir();

// Parseo
lastActionMade = parseInt(lastActionMade);

// Si hay lastaction, ahoraAction y no son la misma
if (!isNaN(lastActionMade) && (ahoraAction !== -1)) {
    // Si ahora y last son la misma no tengo que hacer nada, ya estoy en ese estado
    if (lastActionMade === ahoraAction) {
        console.log('Ahora y Last actions son la misma');
        salir();
    }

    // Si ahora = last+1 es el flujo normal, así que ejecuto ahora
    if (ahoraAction === (lastActionMade + 1)) {
        console.log('Ahora = Last+1; flujo normal');
        actionsToDo.push(weekActions[ahoraAction]);
    } else {
        // No es flujo normal y tengo que recuperar
        var accionesRecuperar = calculateActionsToDo(lastActionMade, ahoraAction, weekActions);
        actionsToDo = actionsToDo.concat(accionesRecuperar);
    }

    /*// Compruebo qué dia y hora es la última ejecución que he realizado
     // Si está a -1, hago como si es la última
     var previousAction = ahoraAction - 1;
     if (previousAction < 0) {
     previousAction = 10;
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
     }*/
} else if (ahoraAction !== -1) {
    // Si no hay lastAction, ejecuto la acción actual
    actionsToDo.push(weekActions[ahoraAction]);
} else {
    salir();
}

// Sea como sea tengo que ejecutar la acción de ahora, si es que hay acción
/*if (ahoraAction !== -1) {
 actionsToDo.push(weekActions[ahoraAction]);
 }*/


if (actionsToDo.length > 0) {
    // voy creando promises
    var promises = [];

    // Genero los promises
    actionsToDo.forEach(function (action) {
        var datos = action.split('#');
        promises.push(maintain(datos[0], datos[1]));
    });

    if (promises.length > 0) {
        //Lanzo las promises secuencialmente
        launchPromises(promises, lockFile, ahoraAction);

        /*// TODO debería lanzarlas en orden, no todas ahí a lo loco. Van ordenadas
         //TODO casi mejor establecer un sistema de recuperación, pero que no ejecute todas
         // dependiendo de lo que falte por hacer y cuál sea el estado destino, hará X o Y
         Q.all(promises).spread(function (result) {
         console.log('---- FIN ----');

         // Escribo el fichero de lock con la última acción
         fs.writeFileSync(lockFile, ahoraAction);

         salir();
         }).fail(function (error) {
         console.error(error);
         salir();
         });*/
    } else {
        salir();
    }
} else {
    salir();
}

function launchPromises(arrPromises, lockFile, ahoraAction) {
    var unaPromise = arrPromises.shift();

    Q.all(unaPromise)
        .then(function (result) {
            // Escribo el fichero de lock con la última acción
            fs.writeFileSync(lockFile, ahoraAction);

            // Si quedan más, lanzo la siguiente
            if (arrPromises.length > 0) {
                launchPromises(arrPromises);
            } else {
                //Si no hay más, finalizo
                console.log('---- FIN ----');
                salir();
            }
        })
        .fail(function (error) {
            console.error(error);
            salir();
        });
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

    dia = parseInt(dia);
    hora = parseInt(hora);

    if (isNaN(dia) || isNaN(hora)) {
        deferred.reject(new Error("Dia u hora no son valores válidos"));
    }

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


/**
 * Genera las acciones a realizar
 */
function calculateActionsToDo(lastAction, ahoraAction, weekActions) {
    var actions = [];

    switch (lastAction) {
        case 0:
            switch (ahoraAction) {
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                    actions.push(weekActions[1]);
                    actions.push(weekActions[ahoraAction]);
                    break;
                case 9:
                    actions.push(weekActions[8]);
                    actions.push(weekActions[9]);
                    break;
                case 10:
                    actions.push(weekActions[8]);
                    actions.push(weekActions[9]);
                    actions.push(weekActions[10]);
                    break;
            }
            break;
        case 1:
            switch (ahoraAction) {
                case 0:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                    actions.push(weekActions[ahoraAction]);
                    break;
                case 9:
                    actions.push(weekActions[8]);
                    actions.push(weekActions[9]);
                    break;
                case 10:
                    actions.push(weekActions[8]);
                    actions.push(weekActions[9]);
                    actions.push(weekActions[10]);
                    break;
            }
            break;
        case 2:
            switch (ahoraAction) {
                case 0:
                    actions.push(weekActions[3]);
                    break;
                case 1:
                    actions.push(weekActions[3]);
                    actions.push(weekActions[1]);
                    break;
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                    actions.push(weekActions[ahoraAction]);
                    break;
                case 10:
                    actions.push(weekActions[9]);
                    actions.push(weekActions[10]);
                    break;
            }
            break;
        case 3:
            switch (ahoraAction) {
                case 0:
                case 1:
                case 2:
                case 5:
                case 6:
                case 7:
                case 8:
                    actions.push(weekActions[ahoraAction]);
                    break;
                case 9:
                    actions.push(weekActions[8]);
                    actions.push(weekActions[9]);
                    break;
                case 10:
                    actions.push(weekActions[8]);
                    actions.push(weekActions[9]);
                    actions.push(weekActions[10]);
                    break;
            }
            break;
        case 4:
            switch (ahoraAction) {
                case 0:
                    actions.push(weekActions[3]);
                    break;
                case 1:
                    actions.push(weekActions[3]);
                    actions.push(weekActions[1]);
                    break;
                case 2:
                case 3:
                case 6:
                case 7:
                case 8:
                case 9:
                    actions.push(weekActions[ahoraAction]);
                    break;
                case 10:
                    actions.push(weekActions[9]);
                    actions.push(weekActions[10]);
                    break;
            }
            break;
        case 5:
            switch (ahoraAction) {
                case 0:
                case 1:
                case 7:
                case 8:
                    actions.push(weekActions[ahoraAction]);
                    break;
                case 2:
                case 3:
                case 4:
                    actions.push(weekActions[1]);
                    actions.push(weekActions[ahoraAction]);
                    break;
                case 9:
                    actions.push(weekActions[8]);
                    actions.push(weekActions[9]);
                    break;
                case 10:
                    actions.push(weekActions[8]);
                    actions.push(weekActions[9]);
                    actions.push(weekActions[10]);
                    break;
            }
            break;
        case 6:
            switch (ahoraAction) {
                case 0:
                    actions.push(weekActions[3]);
                    break;
                case 1:
                    actions.push(weekActions[3]);
                    actions.push(weekActions[1]);
                    break;
                case 2:
                case 3:
                case 4:
                case 5:
                case 8:
                case 9:
                    actions.push(weekActions[ahoraAction]);
                    break;
                case 10:
                    actions.push(weekActions[9]);
                    actions.push(weekActions[10]);
                    break;
            }
            break;
        case 7:
            switch (ahoraAction) {
                case 0:
                case 1:
                    actions.push(weekActions[ahoraAction]);
                    break;
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                    actions.push(weekActions[1]);
                    actions.push(weekActions[ahoraAction]);
                    break;
                case 9:
                    actions.push(weekActions[8]);
                    actions.push(weekActions[9]);
                    break;
                case 10:
                    actions.push(weekActions[8]);
                    actions.push(weekActions[9]);
                    actions.push(weekActions[10]);
                    break;
            }
            break;
        case 8:
            switch (ahoraAction) {
                case 0:
                    actions.push(weekActions[3]);
                    break;
                case 1:
                    actions.push(weekActions[3]);
                    actions.push(weekActions[1]);
                    break;
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    actions.push(weekActions[ahoraAction]);
                    break;
                case 10:
                    actions.push(weekActions[9]);
                    actions.push(weekActions[10]);
                    break;
            }
            break;
        case 9:
            switch (ahoraAction) {
                case 0:
                    actions.push(weekActions[10]);
                    actions.push(weekActions[0]);
                    break;
                case 1:
                    actions.push(weekActions[10]);
                    actions.push(weekActions[0]);
                    actions.push(weekActions[1]);
                    break;
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                    actions.push(weekActions[10]);
                    actions.push(weekActions[0]);
                    actions.push(weekActions[1]);
                    actions.push(weekActions[ahoraAction]);
                    break;
            }
            break;
        case 10:
            switch (ahoraAction) {
                case 1:
                    actions.push(weekActions[0]);
                    actions.push(weekActions[1]);
                    break;
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                    actions.push(weekActions[0]);
                    actions.push(weekActions[1]);
                    actions.push(weekActions[ahoraAction]);
                    break;
                case 9:
                    actions.push(weekActions[0]);
                    actions.push(weekActions[1]);
                    actions.push(weekActions[8]);
                    actions.push(weekActions[9]);
                    break;
            }
            break;
    }

    return actions;
}
