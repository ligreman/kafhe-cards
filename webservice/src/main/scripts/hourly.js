'use strict';

// Hora en España
process.env.TZ = "Europe/Madrid";

var fecha = new Date(),
    hora = fecha.getHours(), //0-23
    dia = fecha.getDay(); //0-6 siendo 0 domingo

var basePath = process.env.OPENSHIFT_REPO_DIR || 'D:\\Workspace\\www\\kafhe_4.0\\development\\webservice\\';
var mongoose = require('mongoose');
var mongoHost = process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME || 'mongodb://localhost/kafhe';
mongoose.connect(mongoHost, {});

var config = require(basePath + 'src/main/modules/config'),
    gameDao = require(__dirname + '/modules/dao/gameDao'),
    userDao = require(__dirname + '/modules/dao/userDao'),
    events = require('events'),
    Q = require('q');

//Gestor de eventos
var eventEmitter = new events.EventEmitter();

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
 - Sube times de toda la gente
 - Al llamador se aplica el reset por llamar

 + Reseteo por llamar:
 - rank =1
 - calls +1
 - fame =0
 - packs =[]
 - collection =[]
 - unlocked =[]
 - talents =[]
 - Añadir a unlocked las capitales

 + Reseteo entre desayunos de usuario si se ha llamado:
 - Borro todas las de schedule.
 - Borra el journal
 - Borra rewards
 - Borra notifications de user
 - Order pasa a last order, y order se limpia

 + Reseteo entre desayunos de game tanto si se ha llamado como si no:
 - Borra notifications de game
 - Borra caller
 - Estado a weekend

 */


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
            Q.all([
                gameDao.gameUpdateAllByStatus(config.GAME_STATUS.weekend, config.GAME_STATUS.planning),
                userDao.usersDailyReset('all')
            ]).spread(function (result) {
                console.log('Partidas en estado weekend después del fin de semana se ponen en estado planning.');
                console.log('Jugadores de todos los grupos reseteados (daily).');
                salir();
            }).fail(function (error) {
                console.error(error);
            });
        }

        // 8:00 AM
        if (hora === 8) {
            Q.all([
                userDao.usersAFK('all', false)
            ]).spread(function (result) {
                console.log('Jugadores de todos los grupos afk=false.');
                salir();
            }).fail(function (error) {
                console.error(error);
            });
        }

        // 11:00 AM
        if (hora === 11) {
            Q.all([
                gameDao.gameUpdateAllByStatus(config.GAME_STATUS.planning, config.GAME_STATUS.explore)
            ]).spread(function (result) {
                console.log('Partidas en estado planning del lunes se ponen en estado explore.');
                salir();
            }).fail(function (error) {
                console.error(error);
            });
        }
        break;

    /**
     * MARTES, MIÉRCOLES y JUEVES
     *  - A la 1:00am cierro los juegos anteriores (pongo en estado planning los de estado explore) y reseteo diario
     *  - A las 11:00am inicio los segundos juegos de la semana, pongo el estado en explore
     */
    case 2:
    case 3:
    case 4:
        // 1:00 AM
        if (hora === 1) {
            Q.all([
                gameDao.gameUpdateAllByStatus(config.GAME_STATUS.explore, config.GAME_STATUS.planning),
                userDao.usersDailyReset('all')
            ]).spread(function (result) {
                console.log('Partidas en estado explore pasan a estado planning en la madrugada.');
                console.log('Jugadores de todos los grupos reseteados (daily).');
                salir();
            }).fail(function (error) {
                console.error(error);
            });
        }

        // 11:00 AM
        if (hora === 11) {
            Q.all([
                gameDao.gameUpdateAllByStatus(config.GAME_STATUS.planning, config.GAME_STATUS.explore)
            ]).spread(function (result) {
                console.log('Partidas en estado planning se ponen en estado explore.');
                salir();
            }).fail(function (error) {
                console.error(error);
            });
        }
        break;
    /**
     * VIERNES
     *  - A la 1:00am cierro los juegos anteriores (estado explore) y pongo las partidas en resolution
     *
     *  - Si se lanza el desayuno, se pone en estado cerrado (cerrar desayuno). Reseteo de todos los jugadores por desayuno finalizado,
     *      y reseteo del caller.
     *
     *  - A las 15:00 pongo las cerradas en weekend, si tienen el repeat. Limpio el caller y log.
     *    Pongo las que sigan en resolution (no se han lanzado) en modo weekend para jugar la semana siguiente.
     *    Reseteo entre desayunos de game.
     *
     */
    case 5:
        // 1:00 AM
        if (hora === 1) {
            Q.all([
                gameDao.gameUpdateAllByStatus(config.GAME_STATUS.explore, config.GAME_STATUS.resolution),
                userDao.usersDailyReset('all')
            ]).spread(function (result) {
                console.log('Partidas en estado explore pasan a estado resolution para el viernes.');
                salir();
            }).fail(function (error) {
                console.error(error);
            });
        }

        // 15:00 PM
        if (hora === 15) {
            Q.all([
                gameDao.gameBreakfastReset()
                // gameDao.gameUpdateAllByStatus(config.GAME_STATUS.resolution, config.GAME_STATUS.weekend)
            ]).spread(function (result) {
                console.log('Partidas finalizadas y no lanzadas puestas a weekend para la semana que viene.');
                salir();
            }).fail(function (error) {
                console.error(error);
            });
        }
        break;
    default:
        salir();
}


function salir() {
    mongoose.disconnect();
    process.exit();
}

