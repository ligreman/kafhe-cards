/**********************************************/
/******************* LUGARES ******************/
/**********************************************/
var places = [
    {
        id: '1',
        name: 'Ruinas de los Dragones',
        'type': 'place',
        contained_in_packs: [{
            category: 'pack002',
            frequency: 10
        }],
        data: {
            place: {
                lat: -45.75,
                long: -163.04,
                region: 'Bárat',
                level: 5,
                pack_reward: 'pack001',
                'type': 'dungeon',
                adjacent_places: ['2'],
                capital: '6'
            }
        }
    },
    {
        id: '2',
        name: 'Numanaktra',
        'type': 'place',
        contained_in_packs: [
            {category: 'pack002', frequency: 10},
            {category: 'pack003', frequency: 10},
            {category: 'pack004', frequency: 10},
            {category: 'pack005', frequency: 10}
        ],
        data: {
            place: {
                lat: -55.9,
                long: -154.47,
                region: 'Windamar',
                level: 4,
                pack_reward: 'pack002',
                'type': 'town',
                adjacent_places: ['1', '4'],
                capital: '6'
            }
        }
    },
    {
        id: '3',
        name: 'Montañas Astralt',
        'type': 'place',
        contained_in_packs: [],
        data: {
            place: {
                lat: -47.96,
                long: -141.77,
                region: 'Bárat',
                level: 4,
                pack_reward: 'pack003',
                'type': 'zone',
                subtype: 'mountain',
                adjacent_places: ['4', '5'],
                capital: '6'
            }
        }
    },
    {
        id: '4',
        name: 'Bosque de Magiria',
        'type': 'place',
        contained_in_packs: [],
        data: {
            place: {
                lat: -50.25,
                long: -138.49,
                region: 'Bárat',
                level: 4,
                pack_reward: 'pack004',
                'type': 'zone',
                subtype: 'forest',
                adjacent_places: ['3', '5', '2'],
                capital: '6'
            }
        }
    },
    {
        id: '5',
        name: 'Parnamazda',
        'type': 'place',
        contained_in_packs: [
            {category: 'pack003', frequency: 10},
            {category: 'pack004', frequency: 10},
            {category: 'pack005', frequency: 10},
            {category: 'pack006', frequency: 10}
        ],
        data: {
            place: {
                lat: -45.98,
                long: -137.04,
                region: 'Bárat',
                level: 3,
                pack_reward: 'pack005',
                'type': 'town',
                adjacent_places: ['3', '4', '6'],
                capital: '6'
            }
        }
    },
    {
        id: '6',
        name: 'Tarnasis',
        'type': 'place',
        contained_in_packs: [],
        data: {
            place: {
                lat: -47.04,
                long: -129.46,
                region: 'Bárat',
                level: 1,
                pack_reward: 'pack006',
                'type': 'capital',
                adjacent_places: ['5', '7', '8'],
                capital: '6'
            }
        }
    },
    {
        id: '7',
        name: 'Shivaneraya',
        'type': 'place',
        contained_in_packs: [
            {category: 'pack006', frequency: 10},
            {category: 'pack007', frequency: 10}
        ],
        data: {
            place: {
                lat: -48.34,
                long: -129.99,
                region: 'Bárat',
                level: 2,
                pack_reward: 'pack007',
                'type': 'town',
                adjacent_places: ['6'],
                capital: '6'
            }
        }
    },
    {
        id: '8',
        name: 'Magi´Reven',
        'type': 'place',
        contained_in_packs: [
            {category: 'pack006', frequency: 10},
            {category: 'pack008', frequency: 10},
            {category: 'pack009', frequency: 10}
        ],
        data: {
            place: {
                lat: -48.79,
                long: -121.79,
                region: 'Orgoth',
                level: 3,
                pack_reward: 'pack008',
                'type': 'town',
                adjacent_places: ['6', '9'],
                capital: '9'
            }
        }
    },
    {
        id: '9',
        name: 'Mirrah',
        'type': 'place',
        contained_in_packs: [],
        data: {
            place: {
                lat: -49.85,
                long: -107.2,
                region: 'Orgoth',
                level: 1,
                pack_reward: 'pack009',
                'type': 'capital',
                adjacent_places: ['8', '10', '11', '13', '14', '16'],
                capital: '9'
            }
        }
    },
    {
        id: '10',
        name: 'Lago Vespertilio',
        'type': 'place',
        contained_in_packs: [],
        data: {
            place: {
                lat: -54.74,
                long: -106.92,
                region: 'Orgoth',
                level: 1,
                pack_reward: 'pack010',
                'type': 'zone',
                subtype: 'lake',
                adjacent_places: ['9', '14'],
                capital: '9'
            }
        }
    },
    {
        id: '11',
        name: 'Bálindor',
        'type': 'place',
        contained_in_packs: [
            {category: 'pack009', frequency: 10},
            {category: 'pack011', frequency: 10},
            {category: 'pack012', frequency: 10},
            {category: 'pack013', frequency: 10}
        ],
        data: {
            place: {
                lat: -49.05,
                long: -103.16,
                region: 'Orgoth',
                level: 2,
                pack_reward: 'pack011',
                'type': 'town',
                adjacent_places: ['9', '12', '13'],
                capital: '9'
            }
        }
    },
    {
        id: '12',
        name: 'Bosque Kálirin',
        'type': 'place',
        contained_in_packs: [],
        data: {
            place: {
                lat: -46.91,
                long: -102.85,
                region: 'Orgoth',
                level: 2,
                pack_reward: 'pack012',
                'type': 'zone',
                subtype: 'forest',
                adjacent_places: ['11', '15'],
                capital: '9'
            }
        }
    },
    {
        id: '13',
        name: 'Lumen',
        'type': 'place',
        contained_in_packs: [
            {category: 'pack009', frequency: 10},
            {category: 'pack011', frequency: 10},
            {category: 'pack013', frequency: 10},
            {category: 'pack014', frequency: 10},
            {category: 'pack015', frequency: 10},
            {category: 'pack041', frequency: 10}
        ],
        data: {
            place: {
                lat: -51.12,
                long: -97.91,
                region: 'Orgoth',
                level: 2,
                pack_reward: 'pack013',
                'type': 'town',
                adjacent_places: ['9', '11', '14', '15', '41'],
                capital: '9'
            }
        }
    },

];
/*
 14	Hunyabad	-52.27	-100.88	Orgoth	town	1	9	10	13				9
 15	Avark	-48.52	-96.61	Orgoth	town	3	12	13					9
 16	Shálar	-56.52	-106.26	Orgoth	town	3	9	17	18	19			19
 17	Bosques de la Bruma	-55.27	-110.28	Orgoth	zone forest	4	16						19
 18	Górojor	-59.42	-104.59	Orgoth	town	2	16	19	21				19
 19	Ragnaria	-60.63	-111.18	Orgoth	capital	1	16	18	20	30			19
 20	Nort Rift	-58.47	-121.51	Scala	dungeon	5	19						19
 21	Montañas Neblin	-57.54	-100.02	Orgoth	zone mountain	4	18						19
 22	Templo de la Luna	-53.67	-90.4	Orgoth	dungeon	5	13	23					9
 23	Bosque de Tánamar	-56.88	-88.9	Orgoth	zone forest	4	18	21	22	48			9
 24	Tierras del Polvo	-61.18	-95.45	Orgoth	zone desert	3	18	23	25	48			19
 25	Nudlin	-65.96	-103.05	Orgoth	town	3	24	28	29				29
 26	Selva de Nori	-66.4	-89.74	Orgoth	zone forest	4	25	27					29
 27	Terelfel	-65.2	-74.97	Orgoth	dungeon	5	26						29
 28	Pantano de Nork	-70.78	-100.15	Orgoth	zone swamp	3	25	31					29
 29	Mithraldur	-70.14	-119.16	Orgoth	capital	1	25	30	31	32	34	35	29
 30	Yunkadur	-68.99	-118.63	Orgoth	town	2	19	29					29
 31	Záilar	-71.94	-99.45	Orgoth	town	3	28	29	32	40			29
 32	Región de Gigantes	-72.81	-107.4	Orgoth	zone desert	2	29	31	35				29
 33	Los Astilleros del Diablo	-76.91	-115.0	Orgoth	dungeon	5	39						29
 34	Feramar	-70.96	-120.26	Orgoth	town	2	29	35	36				29
 35	Montañas del Titán	-71.28	-114.17	Orgoth	zone mountain	3	29	32	34				29
 36	Bosque solitario	-73.75	-122.43	Orgoth	zone forest	3	34	37					29
 37	Bosque de la Luna Creciente	-74.36	-118.43	Orgoth	zone forest	4	36	38					29
 38	Nómadun	-75.52	-142.91	Orgoth	dungeon	5	37						29
 39	Tierras de la Niebla Blanca	-75.74	-106.83	Orgoth	zone swamp	4	33						29
 40	Montañas Blancas	-73.22	-93.25	Orgoth	zone mountain	4	31						29
 41	Marbris	-45.54	-90.46	Lúthinar	town	3	13	42	43				45
 42	Fértil	-48.39	-82.68	Lúthinar	town	2	41	45	52				45
 43	Rívelar	-45.35	-84.64	Lúthinar	town	3	41	44					45
 44	Rádagar	-44.76	-79.39	Lúthinar	town	2	43	45					45
 45	Múnatar	-45.64	-75.96	Lúthinar	capital	1	42	44	46	51			45
 46	Nidel	-44.96	-66.2	Lúthinar	town	2	45	47	56	57			45
 47	Riscos del Centinela	-46.27	-61.98	Lúthinar	zone mountain	2	45						45
 48	Mórth	-57.04	-83.39	Lúthinar	town	3	23	24	49	50			45
 49	Fárlowin	-59.27	-79.63	Lúthinar	town	4	48	87					45
 50	Castillo Difrost	-54.53	-79.65	Lúthinar	town	4	48	51	54				45
 51	Lúthar	-51.59	-74.55	Lúthinar	town	3	45	50	52	53	54	55	45
 52	Cataratas de Diacleronte	-51.56	-77.5	Lúthinar	zone lake	2	42	51					45
 53	Lago Ilin Myr	-51.55	-71.15	Lúthinar	zone lake	3	51	54	55				45
 54	Cordillera de las Nubes	-53.62	-68.47	Lúthinar	zone mountain	4	50	51	53	55			45
 55	Montañas Pardas	-50.09	-61.41	Lúthinar	zone mountain	2	51	53	54	56			56
 56	Brigon	-52.54	-54.67	Lúthinar	capital	1	46	55	57	59	60		56
 57	Neopresalia	-45.58	-46.89	Lúthinar	town	2	46	56	58	59			56
 58	Roblecaído	-45.51	-38.5	Lúthinar	town	3	57	59	63				56
 59	Tierras benditas	-48.27	-40.1	Lúthinar	zone swamp	3	56	57	58	60	63		56
 60	Bosques de Pannar	-55.44	-42.52	Lúthinar	zone forest	4	56	59	61	62			56
 61	La Hundida Ciudad de Esplendor	-59.96	-42.78	Lúthinar	dungeon	5	60	62					56
 62	Pantano Raiden	-59.82	-32.85	Lúthinar	zone swamp	4	60	61	68	69			56
 63	Muelle de la Astilla	-42.03	-30.67	Bóscorth	town	2	58	59	64				56
 64	Diámarth	-47.25	-14.5	Bóscorth	town	3	63	65	67				56
 65	Montañas Brasmort	-49.64	-1.71	Bóscorth	zone mountain	4	67	66					56
 66	El Santuario	-46.86	9.32	Bóscorth	dungeon	5	65						56
 67	Monasterio del Víngolden	-54.24	-15.25	Bóscorth	town	4	64	65	68				56
 68	Vérelfel	-58.9	-19.25	Bóscorth	town	2	67	62	69				56
 69	Montañas de la Roca Arenosa	-62.59	-43.24	Shakra	zone mountain	2	62	68	70				70
 70	Asiriana	-64.54	-47.57	Shakra	capital	1	69	71	72	73			70
 71	Desierto de Shakra	-64.01	-37.31	Shakra	zone desert	2	70						70
 72	Templo de Áershin	-65.37	-33.49	Shakra	town	3	70	79					70
 73	Kuhihashi	-67.47	-69.43	Sunzhau	town	2	70	74	75				76
 74	Adamandur	-69.05	-63.44	Sunzhau	town	4	73						76
 75	Lago Kurogahara	-69.89	-69.87	Sunzhau	zone lake	2	73	76	77	78			76
 76	Shitabu	-70.99	-69.39	Sunzhau	capital	1	75	77	78				76
 77	Sunamerasu	-71.6	-60.97	Sunzhau	town	3	75	76					76
 78	Asanagui	-70.5	-76.68	Sunzhau	town	2	75	76					76
 79	Silvania	-70.52	-31.64	Ábalar	zone forest	2	72	80	81				81
 80	Manantiales de Nun	-70.86	-23.07	Ábalar	zone lake	2	79	81	82	83			81
 81	Paramgarts	-71.82	-26.59	Ábalar	capital	1	79	80	82	85			81
 82	Falamargarts	-71.5	-18.24	Ábalar	town	2	80	81	83	84			81
 83	Montañas Verdes	-70.58	-12.08	Ábalar	zone mountain	3	80	82	84				81
 84	Falarun	-72.82	-7.47	Ábalar	zone forest	3	82	83	86				81
 85	Abacrist	-75.29	-23.38	Ábalar	zone forest	4	81	86					81
 86	Gran Árbol Édensil	-74.01	-0.83	Ábalar	dungeon	5	84	85					81
 87	Árbol del Primer Elfo	-59.4	-68.86	Lúthinar	dungeon	5	49						45
 */

/**********************************************/
/**********************************************/
/**********************************************/

module.exports = {
    places: places
};
