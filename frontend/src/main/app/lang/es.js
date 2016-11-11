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
            'textAssignCard': 'Asignar carta',
            'textContinue': 'Continuar',
            'textYes': 'Sí',
            'textNo': 'No',
            'fame': 'Fama',
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
            'textZonedesert': 'Desierto',
            'textZoneforest': 'Bosque',
            'textZonelake': 'Lago',
            'textZonemountain': 'Montaña',
            'textZoneswamp': 'Pantano',
            'textDifficulty': 'Dificultad',
            'textCardDetail': 'Detalle de la carta',
            'textLevelUp': 'Subir de nivel',

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

            // INTERFAZ - Colección
            'selectCardTitle': '¿Asignar esta carta?',
            'selectCardContent': 'Confirma que quieres asignar la carta "{{card}}" al hueco seleccionado.',

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
