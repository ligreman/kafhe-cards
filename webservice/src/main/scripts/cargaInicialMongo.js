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
        contained_in_packs: [],
        data: {
            place: {
                lat: -49.05,
                long: -103.16,
                region: 'Orgoth',
                level: 2,
                pack_reward: 'pack010',
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
                pack_reward: 'pack010',
                'type': 'zone',
                subtype: 'forest',
                adjacent_places: ['11', '15'],
                capital: '9'
            }
        }
    },

];
/**********************************************/
/**********************************************/
/**********************************************/

module.exports = {
    places: places
};
