(function () {
    'use strict';

    //Idioma español
    angular.module('kafhe').config(['$translateProvider', function ($translateProvider) {
        var espanol = {
            // MENU
            'menuGames': 'Juegos',
            'menuExplore': 'Explorar',
            'menuCollection': 'Colección',
            'menuCharacter': 'Personaje',
            'menuPlanning': 'Preparativos',
            'menuShop': 'Tienda',
            'menuBreakfast': 'Cafetería',
            'menuProfile': 'Cuenta',

            // TEXTOS - GENERAL
            'textError': 'Error',
            'textErrors': 'Errores',
            'textCancel': 'Cancelar',
            'textSave': 'Guardar',
            'textAccept': 'Aceptar',
            'textClose': 'Cerrar',
            'textBuyPacks': 'Comprar sobres',
            'textAssignCard': 'Asignar carta',
            'textContinue': 'Continuar',
            'textYes': 'Sí',
            'textNo': 'No',
            'fame': 'Fama',
            'rank': 'Rango',
            'tostolares': 'Tostólares',
            'textWeapon': 'Arma',
            'textWeapons': 'Armas',
            'textArmor': 'Vestimenta',
            'textArmors': 'Vestimentas',
            'textSkill': 'Habilidad',
            'textSkills': 'Habilidades',
            'textEvent': 'Adversidad',
            'textEvents': 'Adversidades',
            'textEncounter': 'Encuentro',
            'textEncounters': 'Encuentros',
            'textPlace': 'Lugar',
            'textPlaces': 'Lugares',
            'textTown': 'Ciudad',
            'textCapital': 'Capital',
            'textDungeon': 'Mazmorra',
            'textZonedesert': 'Desierto',
            'textZoneforest': 'Bosque',
            'textZonelake': 'Lago',
            'textZonemountain': 'Montaña',
            'textZoneswamp': 'Pantano',
            'textDifficulty': 'Dificultad',
            'textCardDetail': 'Detalle de la carta',
            'textLevelUp': 'Subir de nivel',
            'textPackDetail': 'Sobres de cartas',
            'textPacksSource': 'Sobre de',
            'textPacksAmount': 'Tienes',
            'textPacksOpen': 'Abrir',
            'textRefresh': 'Refrescar',
            'textSacrifice': 'El público ha decidido que le toca pringar a...',
            'textCall': 'Llamar a',
            'textWeekendMessage': 'Tomaos el merecido descanso, hasta el lunes...',
            'textStats': 'Clasificación actual',
            'textActivity': 'Últimas noticias',
            'textSort': 'Votaciones',
            'textEnd': 'Finalizado',
            'textWeekend': 'Fin de semana',
            'textWaiting': 'Esperando al inicio de los juegos',
            'textGames': 'Juegos en progreso',
            'textLaunch': '¡Iniciar la votación!',
            'textCities': 'Ciudades',
            'textPlayers': 'Jugadores',
            'textLevel': 'Nivel',
            'textRegion': 'Región',
            'textDisconnect': 'Desconectar',
            'textLeader': 'Líder',
            'textLeaderGroup': 'Líder de grupo',
            'textCostTalent': 'Puntos requeridos',
            'textNoMoneyToFusion': 'No tienes suficientes tostólares',
            'textLevelUpCard': 'Subir a nivel',
            'textCallTimes': 'Has participado {{times}} veces y llamado {{calls}}',
            'textIsIn': 'esta en',
            'textCallAndSeeOrder': 'Ver los pedidos y llamar',
            'textSeeImg': 'Ver como imágenes',
            'textSeeList': 'Ver como lista',
            'textLaunchDialogTitle': '¿Iniciar la votación?',
            'textLaunchDialogContent': 'Dar paso a la votación para elegir al perdedor de estos juegos del Kafhe',
            'textStartVoting': 'Iniciar votación',

            // TALENTOS
            'combat': 'combate',
            'exploration': 'exploración',
            'survival': 'supervivencia',

            // Notificaciones
            'notification-system': 'Palabra de Kafhe',
            'notification-explore': 'Exploración',
            'notification-move': 'Movimiento',
            'notification-combat': 'Combate',
            'notification-victory': 'Victoria',
            'notification-defeat': 'Derrota',
            'notification-reward': 'Recompensa',
            'notification-encounter': 'Encuentro',
            'notification-adversity': 'Evento',
            'notification-announcement': 'Anuncio',
            'notification-skill': 'Habilidad',

            // TIPOS
            'bladed': 'Cortante',
            'blunt': 'Contundente',
            'piercing': 'Perforante',
            'light': 'Ligera',
            'medium': 'Media',
            'heavy': 'Pesada',

            // ELEMENTOS
            'fire': 'Fuego',
            'water': 'Agua',
            'earth': 'Tierra',
            'air': 'Aire',

            // MATERIALES
            'madera': 'Madera',

            // FRECUENCIAS
            'common': 'Común',
            'uncommon': 'Infrecuente',
            'rare': '{GENDER, select, male{Raro} female{Rara} other{}}',
            'extraordinary': '{GENDER, select, male{Extraordinario} female{Extraordinaria} other{}}',
            'legendary': '{GENDER, select, male{Legendario} female{Legendaria} other{}}',

            // INTERFAZ - HEADER
            'headerUser': 'Usuario: ',
            'headerLogout': 'Salir',

            // INTERFAZ - LOGIN
            'loginSignInButton': 'Entrar',
            'loginUserLabel': 'Usuario',
            'loginPasswordLabel': 'Contraseña',
            'profileTitle': 'Modifica tu cuenta',
            'profileAvatar': 'Avatar',
            'profileAlias': 'Alias',
            'profilePassword': 'Introduce la nueva contraseña',
            'profileRepassword': 'Repite la nueva contraseña',
            'profileChangePassword': 'Cambia tu contraseña',

            'cardLevelDescription': 'de nivel {{level}}',
            'cardElementDescription-fire': 'ígnea',
            'cardElementDescription-ice': 'gélida',
            'cardElementDescription-poison': 'venenosa',
            'cardElementDescription-electricity': 'eléctrica',
            'cardElementOf-fire': 'de fuego',
            'cardElementOf-ice': 'de hielo',
            'cardElementOf-poison': 'de veneno',
            'cardElementOf-electricity': 'de electricidad',
            'cardLevelUpTitle': 'Selecciona la carta a subir de nivel',
            'textCardLevelUpSucceed': '¡Carta fusionada!',


            // INTERFAZ - PANTALLA DESAYUNO
            'textNewOrder': 'Hacer pedido',
            'textChangeOrder': 'Cambiar el desayuno',
            'textCancelOrder': 'Eliminar el desayuno',
            'textLastDayOrder': 'Pedir lo del otro día',
            'textOrderNoItoTitle': 'El desayuno no es ITO',
            'textOrderNoItoContent': 'El desayuno que vas a pedir no es ITO, ¿es correcto o se te ha olvidado marcarlo?',
            'textYaMeParecia': 'Ya me parecía a mí...',
            'textOrderChanged': 'Desayuno actualizado',
            'textOrderDeleted': 'Pedido del desayuno retirado',
            'textNoLastOrder': 'Omelettus no tiene constancia de que el otro día tomaras desayuno alguno, ¡hereje!',
            'textPedidos': 'Lista de pedidos',
            'textEaters': 'Comensales',
            'textOrdered': 'Ha hecho un pedido',
            'textOrderDetail': 'Detalle de los pedidos',

            // INTERFAZ - EXPLORACION
            'textShopBuyTitle': 'Confirma la compra',
            'textShopBuy': '¿Quieres comprar {{name}} por {{points}} tostólares?',
            'textShopButtonBuy': 'Comprar por {{cost}} tostólares',
            'textPlanningSelectCard': 'Click para asignar carta',
            'textPlanningGPS': 'GPS',
            'textPlanningTeam': 'Equipo',
            'textPlanningEncountersEvents': 'Encuentros y adversidades',

            // INTERFAZ - HABILIDADES
            'textDuration': 'Duración',
            'textUses': 'Usos restantes',
            'textTargets': 'Nº de objetivos',
            'textCost': 'Coste en puntos de tueste',
            'textExecute': 'Ejecutar habilidad',
            'textTalentPoints': 'Puntos disponibles',
            'textTalentAddTitle': 'Adquirir talento',
            'textTalentAdd': 'Confirma que quieres adquirir este talento: {{name}}',

            // INTERFAZ - Colección
            'selectCardTitle': '¿Asignar esta carta?',
            'selectCardContent': 'Confirma que quieres asignar la carta "{{card}}" al hueco seleccionado.',
            'textNoUpgradeableCards': 'No hay cartas que puedan mejorarse',

            // Avisos
            'textNoMoreTalentPoints': 'No tienes puntos de talento disponibles',

            // ERRORES - GENERAL
            'errGenericException': 'Ocurrió un error desconocido',
            'errServerException': 'El servidor no responde',

            // ERRORES - LOGIN
            'errUserPassNotValid': 'Usuario o contraseña no válidos',

            // ERRORES - SESSION
            'errSession': 'No se ha encontrado una sesión válida',
            //'errSessionUtils0002': 'La sesión ha caducado'


            // MENSAJES DE NOTIFICACIONES
            'nEquipArmor': 'Te has equipado la armadura: {{name}}.',
            'nEquipWeapon': 'Te has equipado el arma: {{name}}.',
            'nEquipDestroyArmor': 'Has destruido tu armadura {{name}}, recuperando un Tostem de {{tostem}} de nivel {{tostemLvl}}; y Runas de: {{rune}} - {{rune2}}.',
            'nEquipDestroyWeapon': 'Has destruido tu arma {{name}}, recuperando un Tostem de {{tostem}} de nivel {{tostemLvl}}; y Runas de: {{rune}} - {{rune2}}.',
            'nFurnaceTostemSuccess': 'Has horneado con éxito un nuevo Tostem de {{element}} de nivel {{level}}.',
            'nFurnaceTostemFailure': 'Has fracasado horneando el Tostem. Has podido recuperar un Tostem de {{element}} de nivel {{level}}.',
            'nFurnaceRuneSuccess': 'Has horneado con éxito una nueva Runa de {{material}}.',
            'nFurnaceRuneFailure': 'Has fracasado horneando la Runa. Has podido recuperar una Runa de {{material}}.',
            'nForgeWeapon': 'Has forjado el arma {{name}}.',
            'nForgeArmor': 'Has forjado la armadura {{name}}.',
            'nFuryMode': '¡Has activado el modo furia!',
            'nFuryModeGame': 'Os habéis pasado con el pobre {{name}}. ¡Está furioso, os vais a enterar!'
        };

        $translateProvider.translations('es', espanol);
    }]);
})();
