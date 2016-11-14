/**********************************************/
/******************* LUGARES ******************/
/**********************************************/
var places = [{
    "id": "1",
    "name": "Ruinas de los Dragones",
    "type": "place",
    "contained_in_packs": [{"category": "pack2", "frequency": "C"}, {"category": "pack1", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-45.75",
            "long": "-163.04",
            "region": "Bárat",
            "level": "5",
            "pack_reward": "pack1",
            "type": "dungeon",
            "subtype": null,
            "adjacent_places": ["2"],
            "capital": "6"
        }
    }
}, {
    "id": "2",
    "name": "Numanaktra",
    "type": "place",
    "contained_in_packs": [{"category": "pack1", "frequency": "C"}, {"category": "pack4", "frequency": "C"}, {"category": "pack2", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-55.9",
            "long": "-154.47",
            "region": "Windamar",
            "level": "4",
            "pack_reward": "pack2",
            "type": "town",
            "subtype": null,
            "adjacent_places": ["1", "4"],
            "capital": "6"
        }
    }
}, {
    "id": "3",
    "name": "Montañas Astralt",
    "type": "place",
    "contained_in_packs": [{"category": "pack4", "frequency": "C"}, {"category": "pack5", "frequency": "C"}, {"category": "pack3", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-47.96",
            "long": "-141.77",
            "region": "Bárat",
            "level": "4",
            "pack_reward": "pack3",
            "type": "zone",
            "subtype": "mountain",
            "adjacent_places": ["4", "5"],
            "capital": "6"
        }
    }
}, {
    "id": "4",
    "name": "Bosque de Magiria",
    "type": "place",
    "contained_in_packs": [{"category": "pack3", "frequency": "C"}, {"category": "pack5", "frequency": "C"}, {
        "category": "pack2",
        "frequency": "C"
    }, {"category": "pack4", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-50.25",
            "long": "-138.49",
            "region": "Bárat",
            "level": "4",
            "pack_reward": "pack4",
            "type": "zone",
            "subtype": "forest",
            "adjacent_places": ["3", "5", "2"],
            "capital": "6"
        }
    }
}, {
    "id": "5",
    "name": "Parnamazda",
    "type": "place",
    "contained_in_packs": [{"category": "pack3", "frequency": "C"}, {"category": "pack4", "frequency": "C"}, {
        "category": "pack6",
        "frequency": "C"
    }, {"category": "pack5", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-45.98",
            "long": "-137.04",
            "region": "Bárat",
            "level": "3",
            "pack_reward": "pack5",
            "type": "town",
            "subtype": null,
            "adjacent_places": ["3", "4", "6"],
            "capital": "6"
        }
    }
}, {
    "id": "6",
    "name": "Tarnasis",
    "type": "place",
    "contained_in_packs": [{"category": "pack5", "frequency": "C"}, {"category": "pack7", "frequency": "C"}, {
        "category": "pack8",
        "frequency": "C"
    }, {"category": "pack6", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-47.04",
            "long": "-129.46",
            "region": "Bárat",
            "level": "1",
            "pack_reward": "pack6",
            "type": "capital",
            "subtype": null,
            "adjacent_places": ["5", "7", "8"],
            "capital": "6"
        }
    }
}, {
    "id": "7",
    "name": "Shivaneraya",
    "type": "place",
    "contained_in_packs": [{"category": "pack6", "frequency": "C"}, {"category": "pack7", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-48.34",
            "long": "-129.99",
            "region": "Bárat",
            "level": "2",
            "pack_reward": "pack7",
            "type": "town",
            "subtype": null,
            "adjacent_places": ["6"],
            "capital": "6"
        }
    }
}, {
    "id": "8",
    "name": "Magi Reven",
    "type": "place",
    "contained_in_packs": [{"category": "pack6", "frequency": "C"}, {"category": "pack9", "frequency": "C"}, {"category": "pack8", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-48.79",
            "long": "-121.79",
            "region": "Orgoth",
            "level": "3",
            "pack_reward": "pack8",
            "type": "town",
            "subtype": null,
            "adjacent_places": ["6", "9"],
            "capital": "9"
        }
    }
}, {
    "id": "9",
    "name": "Mirrah",
    "type": "place",
    "contained_in_packs": [{"category": "pack8", "frequency": "C"}, {"category": "pack10", "frequency": "C"}, {
        "category": "pack11",
        "frequency": "C"
    }, {"category": "pack13", "frequency": "C"}, {"category": "pack14", "frequency": "C"}, {"category": "pack16", "frequency": "C"}, {
        "category": "pack9",
        "frequency": "C"
    }],
    "data": {
        "place": {
            "lat": "-49.85",
            "long": "-107.2",
            "region": "Orgoth",
            "level": "1",
            "pack_reward": "pack9",
            "type": "capital",
            "subtype": null,
            "adjacent_places": ["8", "10", "11", "13", "14", "16"],
            "capital": "9"
        }
    }
}, {
    "id": "10",
    "name": "Lago Vespertilio",
    "type": "place",
    "contained_in_packs": [{"category": "pack9", "frequency": "C"}, {"category": "pack14", "frequency": "C"}, {"category": "pack10", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-51.82",
            "long": "-105.21",
            "region": "Orgoth",
            "level": "1",
            "pack_reward": "pack10",
            "type": "zone",
            "subtype": "lake",
            "adjacent_places": ["9", "14"],
            "capital": "9"
        }
    }
}, {
    "id": "11",
    "name": "Bálindor",
    "type": "place",
    "contained_in_packs": [{"category": "pack9", "frequency": "C"}, {"category": "pack12", "frequency": "C"}, {
        "category": "pack13",
        "frequency": "C"
    }, {"category": "pack11", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-49.05",
            "long": "-103.16",
            "region": "Orgoth",
            "level": "2",
            "pack_reward": "pack11",
            "type": "town",
            "subtype": null,
            "adjacent_places": ["9", "12", "13"],
            "capital": "9"
        }
    }
}, {
    "id": "12",
    "name": "Bosque Kálirin",
    "type": "place",
    "contained_in_packs": [{"category": "pack11", "frequency": "C"}, {"category": "pack15", "frequency": "C"}, {"category": "pack12", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-46.91",
            "long": "-102.85",
            "region": "Orgoth",
            "level": "2",
            "pack_reward": "pack12",
            "type": "zone",
            "subtype": "forest",
            "adjacent_places": ["11", "15"],
            "capital": "9"
        }
    }
}, {
    "id": "13",
    "name": "Lumen",
    "type": "place",
    "contained_in_packs": [{"category": "pack9", "frequency": "C"}, {"category": "pack11", "frequency": "C"}, {
        "category": "pack14",
        "frequency": "C"
    }, {"category": "pack15", "frequency": "C"}, {"category": "pack41", "frequency": "C"}, {"category": "pack13", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-51.12",
            "long": "-97.91",
            "region": "Orgoth",
            "level": "2",
            "pack_reward": "pack13",
            "type": "town",
            "subtype": null,
            "adjacent_places": ["9", "11", "14", "15", "41"],
            "capital": "9"
        }
    }
}, {
    "id": "14",
    "name": "Hunyabad",
    "type": "place",
    "contained_in_packs": [{"category": "pack9", "frequency": "C"}, {"category": "pack10", "frequency": "C"}, {
        "category": "pack13",
        "frequency": "C"
    }, {"category": "pack14", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-52.27",
            "long": "-100.88",
            "region": "Orgoth",
            "level": "1",
            "pack_reward": "pack14",
            "type": "town",
            "subtype": null,
            "adjacent_places": ["9", "10", "13"],
            "capital": "9"
        }
    }
}, {
    "id": "15",
    "name": "Avark",
    "type": "place",
    "contained_in_packs": [{"category": "pack12", "frequency": "C"}, {"category": "pack13", "frequency": "C"}, {"category": "pack15", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-48.52",
            "long": "-96.61",
            "region": "Orgoth",
            "level": "3",
            "pack_reward": "pack15",
            "type": "town",
            "subtype": null,
            "adjacent_places": ["12", "13"],
            "capital": "9"
        }
    }
}, {
    "id": "16",
    "name": "Shálar",
    "type": "place",
    "contained_in_packs": [{"category": "pack9", "frequency": "C"}, {"category": "pack17", "frequency": "C"}, {
        "category": "pack18",
        "frequency": "C"
    }, {"category": "pack19", "frequency": "C"}, {"category": "pack16", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-56.52",
            "long": "-106.26",
            "region": "Orgoth",
            "level": "3",
            "pack_reward": "pack16",
            "type": "town",
            "subtype": null,
            "adjacent_places": ["9", "17", "18", "19"],
            "capital": "19"
        }
    }
}, {
    "id": "17",
    "name": "Bosques de la Bruma",
    "type": "place",
    "contained_in_packs": [{"category": "pack16", "frequency": "C"}, {"category": "pack17", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-55.27",
            "long": "-110.28",
            "region": "Orgoth",
            "level": "4",
            "pack_reward": "pack17",
            "type": "zone",
            "subtype": "forest",
            "adjacent_places": ["16"],
            "capital": "19"
        }
    }
}, {
    "id": "18",
    "name": "Górojor",
    "type": "place",
    "contained_in_packs": [{"category": "pack16", "frequency": "C"}, {"category": "pack19", "frequency": "C"}, {
        "category": "pack21",
        "frequency": "C"
    }, {"category": "pack18", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-59.42",
            "long": "-104.59",
            "region": "Orgoth",
            "level": "2",
            "pack_reward": "pack18",
            "type": "town",
            "subtype": null,
            "adjacent_places": ["16", "19", "21"],
            "capital": "19"
        }
    }
}, {
    "id": "19",
    "name": "Ragnaria",
    "type": "place",
    "contained_in_packs": [{"category": "pack16", "frequency": "C"}, {"category": "pack18", "frequency": "C"}, {
        "category": "pack20",
        "frequency": "C"
    }, {"category": "pack30", "frequency": "C"}, {"category": "pack19", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-60.63",
            "long": "-111.18",
            "region": "Orgoth",
            "level": "1",
            "pack_reward": "pack19",
            "type": "capital",
            "subtype": null,
            "adjacent_places": ["16", "18", "20", "30"],
            "capital": "19"
        }
    }
}, {
    "id": "20",
    "name": "Nort Rift",
    "type": "place",
    "contained_in_packs": [{"category": "pack19", "frequency": "C"}, {"category": "pack20", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-58.47",
            "long": "-121.51",
            "region": "Scala",
            "level": "5",
            "pack_reward": "pack20",
            "type": "dungeon",
            "subtype": null,
            "adjacent_places": ["19"],
            "capital": "19"
        }
    }
}, {
    "id": "21",
    "name": "Montañas Neblin",
    "type": "place",
    "contained_in_packs": [{"category": "pack18", "frequency": "C"}, {"category": "pack21", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-57.54",
            "long": "-100.02",
            "region": "Orgoth",
            "level": "4",
            "pack_reward": "pack21",
            "type": "zone",
            "subtype": "mountain",
            "adjacent_places": ["18"],
            "capital": "19"
        }
    }
}, {
    "id": "22",
    "name": "Templo de la Luna",
    "type": "place",
    "contained_in_packs": [{"category": "pack13", "frequency": "C"}, {"category": "pack23", "frequency": "C"}, {"category": "pack22", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-53.67",
            "long": "-90.4",
            "region": "Orgoth",
            "level": "5",
            "pack_reward": "pack22",
            "type": "dungeon",
            "subtype": null,
            "adjacent_places": ["13", "23"],
            "capital": "9"
        }
    }
}, {
    "id": "23",
    "name": "Bosque de Tánamar",
    "type": "place",
    "contained_in_packs": [{"category": "pack18", "frequency": "C"}, {"category": "pack21", "frequency": "C"}, {
        "category": "pack22",
        "frequency": "C"
    }, {"category": "pack48", "frequency": "C"}, {"category": "pack23", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-56.88",
            "long": "-88.9",
            "region": "Orgoth",
            "level": "4",
            "pack_reward": "pack23",
            "type": "zone",
            "subtype": "forest",
            "adjacent_places": ["18", "21", "22", "48"],
            "capital": "9"
        }
    }
}, {
    "id": "24",
    "name": "Tierras del Polvo",
    "type": "place",
    "contained_in_packs": [{"category": "pack18", "frequency": "C"}, {"category": "pack23", "frequency": "C"}, {
        "category": "pack25",
        "frequency": "C"
    }, {"category": "pack48", "frequency": "C"}, {"category": "pack24", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-61.18",
            "long": "-95.45",
            "region": "Orgoth",
            "level": "3",
            "pack_reward": "pack24",
            "type": "zone",
            "subtype": "desert",
            "adjacent_places": ["18", "23", "25", "48"],
            "capital": "19"
        }
    }
}, {
    "id": "25",
    "name": "Nudlin",
    "type": "place",
    "contained_in_packs": [{"category": "pack24", "frequency": "C"}, {"category": "pack28", "frequency": "C"}, {
        "category": "pack29",
        "frequency": "C"
    }, {"category": "pack25", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-65.96",
            "long": "-103.05",
            "region": "Orgoth",
            "level": "3",
            "pack_reward": "pack25",
            "type": "town",
            "subtype": null,
            "adjacent_places": ["24", "28", "29"],
            "capital": "29"
        }
    }
}, {
    "id": "26",
    "name": "Selva de Nori",
    "type": "place",
    "contained_in_packs": [{"category": "pack25", "frequency": "C"}, {"category": "pack27", "frequency": "C"}, {"category": "pack26", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-66.4",
            "long": "-89.74",
            "region": "Orgoth",
            "level": "4",
            "pack_reward": "pack26",
            "type": "zone",
            "subtype": "forest",
            "adjacent_places": ["25", "27"],
            "capital": "29"
        }
    }
}, {
    "id": "27",
    "name": "Terelfel",
    "type": "place",
    "contained_in_packs": [{"category": "pack26", "frequency": "C"}, {"category": "pack27", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-65.2",
            "long": "-74.97",
            "region": "Orgoth",
            "level": "5",
            "pack_reward": "pack27",
            "type": "dungeon",
            "subtype": null,
            "adjacent_places": ["26"],
            "capital": "29"
        }
    }
}, {
    "id": "28",
    "name": "Pantano de Nork",
    "type": "place",
    "contained_in_packs": [{"category": "pack25", "frequency": "C"}, {"category": "pack31", "frequency": "C"}, {"category": "pack28", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-70.78",
            "long": "-100.15",
            "region": "Orgoth",
            "level": "3",
            "pack_reward": "pack28",
            "type": "zone",
            "subtype": "swamp",
            "adjacent_places": ["25", "31"],
            "capital": "29"
        }
    }
}, {
    "id": "29",
    "name": "Mithraldur",
    "type": "place",
    "contained_in_packs": [{"category": "pack25", "frequency": "C"}, {"category": "pack30", "frequency": "C"}, {
        "category": "pack31",
        "frequency": "C"
    }, {"category": "pack32", "frequency": "C"}, {"category": "pack34", "frequency": "C"}, {"category": "pack35", "frequency": "C"}, {
        "category": "pack29",
        "frequency": "C"
    }],
    "data": {
        "place": {
            "lat": "-70.14",
            "long": "-119.16",
            "region": "Orgoth",
            "level": "1",
            "pack_reward": "pack29",
            "type": "capital",
            "subtype": null,
            "adjacent_places": ["25", "30", "31", "32", "34", "35"],
            "capital": "29"
        }
    }
}, {
    "id": "30",
    "name": "Yunkadur",
    "type": "place",
    "contained_in_packs": [{"category": "pack19", "frequency": "C"}, {"category": "pack29", "frequency": "C"}, {"category": "pack30", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-68.99",
            "long": "-118.63",
            "region": "Orgoth",
            "level": "2",
            "pack_reward": "pack30",
            "type": "town",
            "subtype": null,
            "adjacent_places": ["19", "29"],
            "capital": "29"
        }
    }
}, {
    "id": "31",
    "name": "Záilar",
    "type": "place",
    "contained_in_packs": [{"category": "pack28", "frequency": "C"}, {"category": "pack29", "frequency": "C"}, {
        "category": "pack32",
        "frequency": "C"
    }, {"category": "pack40", "frequency": "C"}, {"category": "pack31", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-71.94",
            "long": "-99.45",
            "region": "Orgoth",
            "level": "3",
            "pack_reward": "pack31",
            "type": "town",
            "subtype": null,
            "adjacent_places": ["28", "29", "32", "40"],
            "capital": "29"
        }
    }
}, {
    "id": "32",
    "name": "Región de Gigantes",
    "type": "place",
    "contained_in_packs": [{"category": "pack29", "frequency": "C"}, {"category": "pack31", "frequency": "C"}, {
        "category": "pack35",
        "frequency": "C"
    }, {"category": "pack32", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-72.81",
            "long": "-107.4",
            "region": "Orgoth",
            "level": "2",
            "pack_reward": "pack32",
            "type": "zone",
            "subtype": "desert",
            "adjacent_places": ["29", "31", "35"],
            "capital": "29"
        }
    }
}, {
    "id": "33",
    "name": "Los Astilleros del Diablo",
    "type": "place",
    "contained_in_packs": [{"category": "pack39", "frequency": "C"}, {"category": "pack33", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-76.91",
            "long": "-115.0",
            "region": "Orgoth",
            "level": "5",
            "pack_reward": "pack33",
            "type": "dungeon",
            "subtype": null,
            "adjacent_places": ["39"],
            "capital": "29"
        }
    }
}, {
    "id": "34",
    "name": "Feramar",
    "type": "place",
    "contained_in_packs": [{"category": "pack29", "frequency": "C"}, {"category": "pack35", "frequency": "C"}, {
        "category": "pack36",
        "frequency": "C"
    }, {"category": "pack34", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-70.96",
            "long": "-120.26",
            "region": "Orgoth",
            "level": "2",
            "pack_reward": "pack34",
            "type": "town",
            "subtype": null,
            "adjacent_places": ["29", "35", "36"],
            "capital": "29"
        }
    }
}, {
    "id": "35",
    "name": "Montañas del Titán",
    "type": "place",
    "contained_in_packs": [{"category": "pack29", "frequency": "C"}, {"category": "pack32", "frequency": "C"}, {
        "category": "pack34",
        "frequency": "C"
    }, {"category": "pack35", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-71.28",
            "long": "-114.17",
            "region": "Orgoth",
            "level": "3",
            "pack_reward": "pack35",
            "type": "zone",
            "subtype": "mountain",
            "adjacent_places": ["29", "32", "34"],
            "capital": "29"
        }
    }
}, {
    "id": "36",
    "name": "Bosque solitario",
    "type": "place",
    "contained_in_packs": [{"category": "pack34", "frequency": "C"}, {"category": "pack37", "frequency": "C"}, {"category": "pack36", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-73.75",
            "long": "-122.43",
            "region": "Orgoth",
            "level": "3",
            "pack_reward": "pack36",
            "type": "zone",
            "subtype": "forest",
            "adjacent_places": ["34", "37"],
            "capital": "29"
        }
    }
}, {
    "id": "37",
    "name": "Bosque de la Luna Creciente",
    "type": "place",
    "contained_in_packs": [{"category": "pack36", "frequency": "C"}, {"category": "pack38", "frequency": "C"}, {"category": "pack37", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-74.36",
            "long": "-118.43",
            "region": "Orgoth",
            "level": "4",
            "pack_reward": "pack37",
            "type": "zone",
            "subtype": "forest",
            "adjacent_places": ["36", "38"],
            "capital": "29"
        }
    }
}, {
    "id": "38",
    "name": "Nómadun",
    "type": "place",
    "contained_in_packs": [{"category": "pack37", "frequency": "C"}, {"category": "pack38", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-75.52",
            "long": "-142.91",
            "region": "Orgoth",
            "level": "5",
            "pack_reward": "pack38",
            "type": "dungeon",
            "subtype": null,
            "adjacent_places": ["37"],
            "capital": "29"
        }
    }
}, {
    "id": "39",
    "name": "Tierras de la Niebla Blanca",
    "type": "place",
    "contained_in_packs": [{"category": "pack33", "frequency": "C"}, {"category": "pack39", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-75.74",
            "long": "-106.83",
            "region": "Orgoth",
            "level": "4",
            "pack_reward": "pack39",
            "type": "zone",
            "subtype": "swamp",
            "adjacent_places": ["33"],
            "capital": "29"
        }
    }
}, {
    "id": "40",
    "name": "Montañas Blancas",
    "type": "place",
    "contained_in_packs": [{"category": "pack31", "frequency": "C"}, {"category": "pack40", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-73.22",
            "long": "-93.25",
            "region": "Orgoth",
            "level": "4",
            "pack_reward": "pack40",
            "type": "zone",
            "subtype": "mountain",
            "adjacent_places": ["31"],
            "capital": "29"
        }
    }
}, {
    "id": "41",
    "name": "Marbris",
    "type": "place",
    "contained_in_packs": [{"category": "pack13", "frequency": "C"}, {"category": "pack42", "frequency": "C"}, {
        "category": "pack43",
        "frequency": "C"
    }, {"category": "pack41", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-45.54",
            "long": "-90.46",
            "region": "Lúthinar",
            "level": "3",
            "pack_reward": "pack41",
            "type": "town",
            "subtype": null,
            "adjacent_places": ["13", "42", "43"],
            "capital": "45"
        }
    }
}, {
    "id": "42",
    "name": "Fértil",
    "type": "place",
    "contained_in_packs": [{"category": "pack41", "frequency": "C"}, {"category": "pack45", "frequency": "C"}, {
        "category": "pack52",
        "frequency": "C"
    }, {"category": "pack42", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-48.39",
            "long": "-82.68",
            "region": "Lúthinar",
            "level": "2",
            "pack_reward": "pack42",
            "type": "town",
            "subtype": null,
            "adjacent_places": ["41", "45", "52"],
            "capital": "45"
        }
    }
}, {
    "id": "43",
    "name": "Rívelar",
    "type": "place",
    "contained_in_packs": [{"category": "pack41", "frequency": "C"}, {"category": "pack44", "frequency": "C"}, {"category": "pack43", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-45.35",
            "long": "-84.64",
            "region": "Lúthinar",
            "level": "3",
            "pack_reward": "pack43",
            "type": "town",
            "subtype": null,
            "adjacent_places": ["41", "44"],
            "capital": "45"
        }
    }
}, {
    "id": "44",
    "name": "Rádagar",
    "type": "place",
    "contained_in_packs": [{"category": "pack43", "frequency": "C"}, {"category": "pack45", "frequency": "C"}, {"category": "pack44", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-44.76",
            "long": "-79.39",
            "region": "Lúthinar",
            "level": "2",
            "pack_reward": "pack44",
            "type": "town",
            "subtype": null,
            "adjacent_places": ["43", "45"],
            "capital": "45"
        }
    }
}, {
    "id": "45",
    "name": "Múnatar",
    "type": "place",
    "contained_in_packs": [{"category": "pack42", "frequency": "C"}, {"category": "pack44", "frequency": "C"}, {
        "category": "pack46",
        "frequency": "C"
    }, {"category": "pack51", "frequency": "C"}, {"category": "pack45", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-45.64",
            "long": "-75.96",
            "region": "Lúthinar",
            "level": "1",
            "pack_reward": "pack45",
            "type": "capital",
            "subtype": null,
            "adjacent_places": ["42", "44", "46", "51"],
            "capital": "45"
        }
    }
}, {
    "id": "46",
    "name": "Nidel",
    "type": "place",
    "contained_in_packs": [{"category": "pack45", "frequency": "C"}, {"category": "pack47", "frequency": "C"}, {
        "category": "pack56",
        "frequency": "C"
    }, {"category": "pack57", "frequency": "C"}, {"category": "pack46", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-44.96",
            "long": "-66.2",
            "region": "Lúthinar",
            "level": "2",
            "pack_reward": "pack46",
            "type": "town",
            "subtype": null,
            "adjacent_places": ["45", "47", "56", "57"],
            "capital": "45"
        }
    }
}, {
    "id": "47",
    "name": "Riscos del Centinela",
    "type": "place",
    "contained_in_packs": [{"category": "pack45", "frequency": "C"}, {"category": "pack47", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-46.27",
            "long": "-61.98",
            "region": "Lúthinar",
            "level": "2",
            "pack_reward": "pack47",
            "type": "zone",
            "subtype": "mountain",
            "adjacent_places": ["45"],
            "capital": "45"
        }
    }
}, {
    "id": "48",
    "name": "Mórth",
    "type": "place",
    "contained_in_packs": [{"category": "pack23", "frequency": "C"}, {"category": "pack24", "frequency": "C"}, {
        "category": "pack49",
        "frequency": "C"
    }, {"category": "pack50", "frequency": "C"}, {"category": "pack48", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-57.04",
            "long": "-83.39",
            "region": "Lúthinar",
            "level": "3",
            "pack_reward": "pack48",
            "type": "town",
            "subtype": null,
            "adjacent_places": ["23", "24", "49", "50"],
            "capital": "45"
        }
    }
}, {
    "id": "49",
    "name": "Fárlowin",
    "type": "place",
    "contained_in_packs": [{"category": "pack48", "frequency": "C"}, {"category": "pack87", "frequency": "C"}, {"category": "pack49", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-59.27",
            "long": "-79.63",
            "region": "Lúthinar",
            "level": "4",
            "pack_reward": "pack49",
            "type": "town",
            "subtype": null,
            "adjacent_places": ["48", "87"],
            "capital": "45"
        }
    }
}, {
    "id": "50",
    "name": "Castillo Difrost",
    "type": "place",
    "contained_in_packs": [{"category": "pack48", "frequency": "C"}, {"category": "pack51", "frequency": "C"}, {
        "category": "pack54",
        "frequency": "C"
    }, {"category": "pack50", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-54.53",
            "long": "-79.65",
            "region": "Lúthinar",
            "level": "4",
            "pack_reward": "pack50",
            "type": "town",
            "subtype": null,
            "adjacent_places": ["48", "51", "54"],
            "capital": "45"
        }
    }
}, {
    "id": "51",
    "name": "Lúthar",
    "type": "place",
    "contained_in_packs": [{"category": "pack45", "frequency": "C"}, {"category": "pack50", "frequency": "C"}, {
        "category": "pack52",
        "frequency": "C"
    }, {"category": "pack53", "frequency": "C"}, {"category": "pack54", "frequency": "C"}, {"category": "pack55", "frequency": "C"}, {
        "category": "pack51",
        "frequency": "C"
    }],
    "data": {
        "place": {
            "lat": "-51.59",
            "long": "-74.55",
            "region": "Lúthinar",
            "level": "3",
            "pack_reward": "pack51",
            "type": "town",
            "subtype": null,
            "adjacent_places": ["45", "50", "52", "53", "54", "55"],
            "capital": "45"
        }
    }
}, {
    "id": "52",
    "name": "Cataratas de Diacleronte",
    "type": "place",
    "contained_in_packs": [{"category": "pack42", "frequency": "C"}, {"category": "pack51", "frequency": "C"}, {"category": "pack52", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-51.56",
            "long": "-77.5",
            "region": "Lúthinar",
            "level": "2",
            "pack_reward": "pack52",
            "type": "zone",
            "subtype": "lake",
            "adjacent_places": ["42", "51"],
            "capital": "45"
        }
    }
}, {
    "id": "53",
    "name": "Lago Ilin Myr",
    "type": "place",
    "contained_in_packs": [{"category": "pack51", "frequency": "C"}, {"category": "pack54", "frequency": "C"}, {
        "category": "pack55",
        "frequency": "C"
    }, {"category": "pack53", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-51.55",
            "long": "-71.15",
            "region": "Lúthinar",
            "level": "3",
            "pack_reward": "pack53",
            "type": "zone",
            "subtype": "lake",
            "adjacent_places": ["51", "54", "55"],
            "capital": "45"
        }
    }
}, {
    "id": "54",
    "name": "Cordillera de las Nubes",
    "type": "place",
    "contained_in_packs": [{"category": "pack50", "frequency": "C"}, {"category": "pack51", "frequency": "C"}, {
        "category": "pack53",
        "frequency": "C"
    }, {"category": "pack55", "frequency": "C"}, {"category": "pack54", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-53.62",
            "long": "-68.47",
            "region": "Lúthinar",
            "level": "4",
            "pack_reward": "pack54",
            "type": "zone",
            "subtype": "mountain",
            "adjacent_places": ["50", "51", "53", "55"],
            "capital": "45"
        }
    }
}, {
    "id": "55",
    "name": "Montañas Pardas",
    "type": "place",
    "contained_in_packs": [{"category": "pack51", "frequency": "C"}, {"category": "pack53", "frequency": "C"}, {
        "category": "pack54",
        "frequency": "C"
    }, {"category": "pack56", "frequency": "C"}, {"category": "pack55", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-50.09",
            "long": "-61.41",
            "region": "Lúthinar",
            "level": "2",
            "pack_reward": "pack55",
            "type": "zone",
            "subtype": "mountain",
            "adjacent_places": ["51", "53", "54", "56"],
            "capital": "56"
        }
    }
}, {
    "id": "56",
    "name": "Brigon",
    "type": "place",
    "contained_in_packs": [{"category": "pack46", "frequency": "C"}, {"category": "pack55", "frequency": "C"}, {
        "category": "pack57",
        "frequency": "C"
    }, {"category": "pack59", "frequency": "C"}, {"category": "pack60", "frequency": "C"}, {"category": "pack56", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-52.54",
            "long": "-54.67",
            "region": "Lúthinar",
            "level": "1",
            "pack_reward": "pack56",
            "type": "capital",
            "subtype": null,
            "adjacent_places": ["46", "55", "57", "59", "60"],
            "capital": "56"
        }
    }
}, {
    "id": "57",
    "name": "Neopresalia",
    "type": "place",
    "contained_in_packs": [{"category": "pack46", "frequency": "C"}, {"category": "pack56", "frequency": "C"}, {
        "category": "pack58",
        "frequency": "C"
    }, {"category": "pack59", "frequency": "C"}, {"category": "pack57", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-45.58",
            "long": "-46.89",
            "region": "Lúthinar",
            "level": "2",
            "pack_reward": "pack57",
            "type": "town",
            "subtype": null,
            "adjacent_places": ["46", "56", "58", "59"],
            "capital": "56"
        }
    }
}, {
    "id": "58",
    "name": "Roblecaído",
    "type": "place",
    "contained_in_packs": [{"category": "pack57", "frequency": "C"}, {"category": "pack59", "frequency": "C"}, {
        "category": "pack63",
        "frequency": "C"
    }, {"category": "pack58", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-45.51",
            "long": "-38.5",
            "region": "Lúthinar",
            "level": "3",
            "pack_reward": "pack58",
            "type": "town",
            "subtype": null,
            "adjacent_places": ["57", "59", "63"],
            "capital": "56"
        }
    }
}, {
    "id": "59",
    "name": "Tierras benditas",
    "type": "place",
    "contained_in_packs": [{"category": "pack56", "frequency": "C"}, {"category": "pack57", "frequency": "C"}, {
        "category": "pack58",
        "frequency": "C"
    }, {"category": "pack60", "frequency": "C"}, {"category": "pack63", "frequency": "C"}, {"category": "pack59", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-48.27",
            "long": "-40.1",
            "region": "Lúthinar",
            "level": "3",
            "pack_reward": "pack59",
            "type": "zone",
            "subtype": "swamp",
            "adjacent_places": ["56", "57", "58", "60", "63"],
            "capital": "56"
        }
    }
}, {
    "id": "60",
    "name": "Bosques de Pannar",
    "type": "place",
    "contained_in_packs": [{"category": "pack56", "frequency": "C"}, {"category": "pack59", "frequency": "C"}, {
        "category": "pack61",
        "frequency": "C"
    }, {"category": "pack62", "frequency": "C"}, {"category": "pack60", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-55.44",
            "long": "-42.52",
            "region": "Lúthinar",
            "level": "4",
            "pack_reward": "pack60",
            "type": "zone",
            "subtype": "forest",
            "adjacent_places": ["56", "59", "61", "62"],
            "capital": "56"
        }
    }
}, {
    "id": "61",
    "name": "La Hundida Ciudad de Esplendor",
    "type": "place",
    "contained_in_packs": [{"category": "pack60", "frequency": "C"}, {"category": "pack62", "frequency": "C"}, {"category": "pack61", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-59.96",
            "long": "-42.78",
            "region": "Lúthinar",
            "level": "5",
            "pack_reward": "pack61",
            "type": "dungeon",
            "subtype": null,
            "adjacent_places": ["60", "62"],
            "capital": "56"
        }
    }
}, {
    "id": "62",
    "name": "Pantano Raiden",
    "type": "place",
    "contained_in_packs": [{"category": "pack60", "frequency": "C"}, {"category": "pack61", "frequency": "C"}, {
        "category": "pack68",
        "frequency": "C"
    }, {"category": "pack69", "frequency": "C"}, {"category": "pack62", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-59.82",
            "long": "-32.85",
            "region": "Lúthinar",
            "level": "4",
            "pack_reward": "pack62",
            "type": "zone",
            "subtype": "swamp",
            "adjacent_places": ["60", "61", "68", "69"],
            "capital": "56"
        }
    }
}, {
    "id": "63",
    "name": "Muelle de la Astilla",
    "type": "place",
    "contained_in_packs": [{"category": "pack58", "frequency": "C"}, {"category": "pack59", "frequency": "C"}, {
        "category": "pack64",
        "frequency": "C"
    }, {"category": "pack63", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-42.03",
            "long": "-30.67",
            "region": "Bóscorth",
            "level": "2",
            "pack_reward": "pack63",
            "type": "town",
            "subtype": null,
            "adjacent_places": ["58", "59", "64"],
            "capital": "56"
        }
    }
}, {
    "id": "64",
    "name": "Diámarth",
    "type": "place",
    "contained_in_packs": [{"category": "pack63", "frequency": "C"}, {"category": "pack65", "frequency": "C"}, {
        "category": "pack67",
        "frequency": "C"
    }, {"category": "pack64", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-47.25",
            "long": "-14.5",
            "region": "Bóscorth",
            "level": "3",
            "pack_reward": "pack64",
            "type": "town",
            "subtype": null,
            "adjacent_places": ["63", "65", "67"],
            "capital": "56"
        }
    }
}, {
    "id": "65",
    "name": "Montañas Brasmort",
    "type": "place",
    "contained_in_packs": [{"category": "pack67", "frequency": "C"}, {"category": "pack66", "frequency": "C"}, {"category": "pack65", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-49.64",
            "long": "-1.71",
            "region": "Bóscorth",
            "level": "4",
            "pack_reward": "pack65",
            "type": "zone",
            "subtype": "mountain",
            "adjacent_places": ["67", "66"],
            "capital": "56"
        }
    }
}, {
    "id": "66",
    "name": "El Santuario",
    "type": "place",
    "contained_in_packs": [{"category": "pack65", "frequency": "C"}, {"category": "pack66", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-46.86",
            "long": "9.32",
            "region": "Bóscorth",
            "level": "5",
            "pack_reward": "pack66",
            "type": "dungeon",
            "subtype": null,
            "adjacent_places": ["65"],
            "capital": "56"
        }
    }
}, {
    "id": "67",
    "name": "Monasterio del Víngolden",
    "type": "place",
    "contained_in_packs": [{"category": "pack64", "frequency": "C"}, {"category": "pack65", "frequency": "C"}, {
        "category": "pack68",
        "frequency": "C"
    }, {"category": "pack67", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-54.24",
            "long": "-15.25",
            "region": "Bóscorth",
            "level": "4",
            "pack_reward": "pack67",
            "type": "town",
            "subtype": null,
            "adjacent_places": ["64", "65", "68"],
            "capital": "56"
        }
    }
}, {
    "id": "68",
    "name": "Vérelfel",
    "type": "place",
    "contained_in_packs": [{"category": "pack67", "frequency": "C"}, {"category": "pack62", "frequency": "C"}, {
        "category": "pack69",
        "frequency": "C"
    }, {"category": "pack68", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-58.9",
            "long": "-19.25",
            "region": "Bóscorth",
            "level": "2",
            "pack_reward": "pack68",
            "type": "town",
            "subtype": null,
            "adjacent_places": ["67", "62", "69"],
            "capital": "56"
        }
    }
}, {
    "id": "69",
    "name": "Montañas de la Roca Arenosa",
    "type": "place",
    "contained_in_packs": [{"category": "pack62", "frequency": "C"}, {"category": "pack68", "frequency": "C"}, {
        "category": "pack70",
        "frequency": "C"
    }, {"category": "pack69", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-62.59",
            "long": "-43.24",
            "region": "Shakra",
            "level": "2",
            "pack_reward": "pack69",
            "type": "zone",
            "subtype": "mountain",
            "adjacent_places": ["62", "68", "70"],
            "capital": "70"
        }
    }
}, {
    "id": "70",
    "name": "Asiriana",
    "type": "place",
    "contained_in_packs": [{"category": "pack69", "frequency": "C"}, {"category": "pack71", "frequency": "C"}, {
        "category": "pack72",
        "frequency": "C"
    }, {"category": "pack73", "frequency": "C"}, {"category": "pack70", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-64.54",
            "long": "-47.57",
            "region": "Shakra",
            "level": "1",
            "pack_reward": "pack70",
            "type": "capital",
            "subtype": null,
            "adjacent_places": ["69", "71", "72", "73"],
            "capital": "70"
        }
    }
}, {
    "id": "71",
    "name": "Desierto de Shakra",
    "type": "place",
    "contained_in_packs": [{"category": "pack70", "frequency": "C"}, {"category": "pack71", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-64.01",
            "long": "-37.31",
            "region": "Shakra",
            "level": "2",
            "pack_reward": "pack71",
            "type": "zone",
            "subtype": "desert",
            "adjacent_places": ["70"],
            "capital": "70"
        }
    }
}, {
    "id": "72",
    "name": "Templo de Áershin",
    "type": "place",
    "contained_in_packs": [{"category": "pack70", "frequency": "C"}, {"category": "pack79", "frequency": "C"}, {"category": "pack72", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-65.37",
            "long": "-33.49",
            "region": "Shakra",
            "level": "3",
            "pack_reward": "pack72",
            "type": "town",
            "subtype": null,
            "adjacent_places": ["70", "79"],
            "capital": "70"
        }
    }
}, {
    "id": "73",
    "name": "Kuhihashi",
    "type": "place",
    "contained_in_packs": [{"category": "pack70", "frequency": "C"}, {"category": "pack74", "frequency": "C"}, {
        "category": "pack75",
        "frequency": "C"
    }, {"category": "pack73", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-67.47",
            "long": "-69.43",
            "region": "Sunzhau",
            "level": "2",
            "pack_reward": "pack73",
            "type": "town",
            "subtype": null,
            "adjacent_places": ["70", "74", "75"],
            "capital": "76"
        }
    }
}, {
    "id": "74",
    "name": "Adamandur",
    "type": "place",
    "contained_in_packs": [{"category": "pack73", "frequency": "C"}, {"category": "pack74", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-69.05",
            "long": "-63.44",
            "region": "Sunzhau",
            "level": "4",
            "pack_reward": "pack74",
            "type": "town",
            "subtype": null,
            "adjacent_places": ["73"],
            "capital": "76"
        }
    }
}, {
    "id": "75",
    "name": "Lago Kurogahara",
    "type": "place",
    "contained_in_packs": [{"category": "pack73", "frequency": "C"}, {"category": "pack76", "frequency": "C"}, {
        "category": "pack77",
        "frequency": "C"
    }, {"category": "pack78", "frequency": "C"}, {"category": "pack75", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-69.89",
            "long": "-69.87",
            "region": "Sunzhau",
            "level": "2",
            "pack_reward": "pack75",
            "type": "zone",
            "subtype": "lake",
            "adjacent_places": ["73", "76", "77", "78"],
            "capital": "76"
        }
    }
}, {
    "id": "76",
    "name": "Shitabu",
    "type": "place",
    "contained_in_packs": [{"category": "pack75", "frequency": "C"}, {"category": "pack77", "frequency": "C"}, {
        "category": "pack78",
        "frequency": "C"
    }, {"category": "pack76", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-70.99",
            "long": "-69.39",
            "region": "Sunzhau",
            "level": "1",
            "pack_reward": "pack76",
            "type": "capital",
            "subtype": null,
            "adjacent_places": ["75", "77", "78"],
            "capital": "76"
        }
    }
}, {
    "id": "77",
    "name": "Sunamerasu",
    "type": "place",
    "contained_in_packs": [{"category": "pack75", "frequency": "C"}, {"category": "pack76", "frequency": "C"}, {"category": "pack77", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-71.6",
            "long": "-60.97",
            "region": "Sunzhau",
            "level": "3",
            "pack_reward": "pack77",
            "type": "town",
            "subtype": null,
            "adjacent_places": ["75", "76"],
            "capital": "76"
        }
    }
}, {
    "id": "78",
    "name": "Asanagui",
    "type": "place",
    "contained_in_packs": [{"category": "pack75", "frequency": "C"}, {"category": "pack76", "frequency": "C"}, {"category": "pack78", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-70.5",
            "long": "-76.68",
            "region": "Sunzhau",
            "level": "2",
            "pack_reward": "pack78",
            "type": "town",
            "subtype": null,
            "adjacent_places": ["75", "76"],
            "capital": "76"
        }
    }
}, {
    "id": "79",
    "name": "Silvania",
    "type": "place",
    "contained_in_packs": [{"category": "pack72", "frequency": "C"}, {"category": "pack80", "frequency": "C"}, {
        "category": "pack81",
        "frequency": "C"
    }, {"category": "pack79", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-70.52",
            "long": "-31.64",
            "region": "Ábalar",
            "level": "2",
            "pack_reward": "pack79",
            "type": "zone",
            "subtype": "forest",
            "adjacent_places": ["72", "80", "81"],
            "capital": "81"
        }
    }
}, {
    "id": "80",
    "name": "Manantiales de Nun",
    "type": "place",
    "contained_in_packs": [{"category": "pack79", "frequency": "C"}, {"category": "pack81", "frequency": "C"}, {
        "category": "pack82",
        "frequency": "C"
    }, {"category": "pack83", "frequency": "C"}, {"category": "pack80", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-70.86",
            "long": "-23.07",
            "region": "Ábalar",
            "level": "2",
            "pack_reward": "pack80",
            "type": "zone",
            "subtype": "lake",
            "adjacent_places": ["79", "81", "82", "83"],
            "capital": "81"
        }
    }
}, {
    "id": "81",
    "name": "Paramgarts",
    "type": "place",
    "contained_in_packs": [{"category": "pack79", "frequency": "C"}, {"category": "pack80", "frequency": "C"}, {
        "category": "pack82",
        "frequency": "C"
    }, {"category": "pack85", "frequency": "C"}, {"category": "pack81", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-71.82",
            "long": "-26.59",
            "region": "Ábalar",
            "level": "1",
            "pack_reward": "pack81",
            "type": "capital",
            "subtype": null,
            "adjacent_places": ["79", "80", "82", "85"],
            "capital": "81"
        }
    }
}, {
    "id": "82",
    "name": "Falamargarts",
    "type": "place",
    "contained_in_packs": [{"category": "pack80", "frequency": "C"}, {"category": "pack81", "frequency": "C"}, {
        "category": "pack83",
        "frequency": "C"
    }, {"category": "pack84", "frequency": "C"}, {"category": "pack82", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-71.5",
            "long": "-18.24",
            "region": "Ábalar",
            "level": "2",
            "pack_reward": "pack82",
            "type": "town",
            "subtype": null,
            "adjacent_places": ["80", "81", "83", "84"],
            "capital": "81"
        }
    }
}, {
    "id": "83",
    "name": "Montañas Verdes",
    "type": "place",
    "contained_in_packs": [{"category": "pack80", "frequency": "C"}, {"category": "pack82", "frequency": "C"}, {
        "category": "pack84",
        "frequency": "C"
    }, {"category": "pack83", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-70.58",
            "long": "-12.08",
            "region": "Ábalar",
            "level": "3",
            "pack_reward": "pack83",
            "type": "zone",
            "subtype": "mountain",
            "adjacent_places": ["80", "82", "84"],
            "capital": "81"
        }
    }
}, {
    "id": "84",
    "name": "Falarun",
    "type": "place",
    "contained_in_packs": [{"category": "pack82", "frequency": "C"}, {"category": "pack83", "frequency": "C"}, {
        "category": "pack86",
        "frequency": "C"
    }, {"category": "pack84", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-72.82",
            "long": "-7.47",
            "region": "Ábalar",
            "level": "3",
            "pack_reward": "pack84",
            "type": "zone",
            "subtype": "forest",
            "adjacent_places": ["82", "83", "86"],
            "capital": "81"
        }
    }
}, {
    "id": "85",
    "name": "Abacrist",
    "type": "place",
    "contained_in_packs": [{"category": "pack81", "frequency": "C"}, {"category": "pack86", "frequency": "C"}, {"category": "pack85", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-75.29",
            "long": "-23.38",
            "region": "Ábalar",
            "level": "4",
            "pack_reward": "pack85",
            "type": "zone",
            "subtype": "forest",
            "adjacent_places": ["81", "86"],
            "capital": "81"
        }
    }
}, {
    "id": "86",
    "name": "Gran Árbol Édensil",
    "type": "place",
    "contained_in_packs": [{"category": "pack84", "frequency": "C"}, {"category": "pack85", "frequency": "C"}, {"category": "pack86", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-74.01",
            "long": "-0.83",
            "region": "Ábalar",
            "level": "5",
            "pack_reward": "pack86",
            "type": "dungeon",
            "subtype": null,
            "adjacent_places": ["84", "85"],
            "capital": "81"
        }
    }
}, {
    "id": "87",
    "name": "Árbol del Primer Elfo",
    "type": "place",
    "contained_in_packs": [{"category": "pack49", "frequency": "C"}, {"category": "pack87", "frequency": "C"}],
    "data": {
        "place": {
            "lat": "-59.4",
            "long": "-68.86",
            "region": "Lúthinar",
            "level": "5",
            "pack_reward": "pack87",
            "type": "dungeon",
            "subtype": null,
            "adjacent_places": ["49"],
            "capital": "45"
        }
    }
}];

/*
 ID,Lugar,Latitud,Longitud,Región,Clasificación,Nivel,Adyacente 1,Adyacente 2,Adyacente 3,Adyacente 4,Adyacente 5,Adyacente 6,Capital
 1,Ruinas de los Dragones,-45.75,-163.04,Bárat,dungeon,5,2,,,,,,6
 2,Numanaktra,-55.9,-154.47,Windamar,town,4,1,4,,,,,6
 3,Montañas Astralt,-47.96,-141.77,Bárat,zone mountain,4,4,5,,,,,6
 4,Bosque de Magiria,-50.25,-138.49,Bárat,zone forest,4,3,5,2,,,,6
 5,Parnamazda,-45.98,-137.04,Bárat,town,3,3,4,6,,,,6
 6,Tarnasis,-47.04,-129.46,Bárat,capital,1,5,7,8,,,,6
 7,Shivaneraya,-48.34,-129.99,Bárat,town,2,6,,,,,,6
 8,Magi Reven,-48.79,-121.79,Orgoth,town,3,6,9,,,,,9
 9,Mirrah,-49.85,-107.2,Orgoth,capital,1,8,10,11,13,14,16,9
 10,Lago Vespertilio,-51.82,-105.21,Orgoth,zone lake,1,9,14,,,,,9
 11,Bálindor,-49.05,-103.16,Orgoth,town,2,9,12,13,,,,9
 12,Bosque Kálirin,-46.91,-102.85,Orgoth,zone forest,2,11,15,,,,,9
 13,Lumen,-51.12,-97.91,Orgoth,town,2,9,11,14,15,41,,9
 14,Hunyabad,-52.27,-100.88,Orgoth,town,1,9,10,13,,,,9
 15,Avark,-48.52,-96.61,Orgoth,town,3,12,13,,,,,9
 16,Shálar,-56.52,-106.26,Orgoth,town,3,9,17,18,19,,,19
 17,Bosques de la Bruma,-55.27,-110.28,Orgoth,zone forest,4,16,,,,,,19
 18,Górojor,-59.42,-104.59,Orgoth,town,2,16,19,21,,,,19
 19,Ragnaria,-60.63,-111.18,Orgoth,capital,1,16,18,20,30,,,19
 20,Nort Rift,-58.47,-121.51,Scala,dungeon,5,19,,,,,,19
 21,Montañas Neblin,-57.54,-100.02,Orgoth,zone mountain,4,18,,,,,,19
 22,Templo de la Luna,-53.67,-90.4,Orgoth,dungeon,5,13,23,,,,,9
 23,Bosque de Tánamar,-56.88,-88.9,Orgoth,zone forest,4,18,21,22,48,,,9
 24,Tierras del Polvo,-61.18,-95.45,Orgoth,zone desert,3,18,23,25,48,,,19
 25,Nudlin,-65.96,-103.05,Orgoth,town,3,24,28,29,,,,29
 26,Selva de Nori,-66.4,-89.74,Orgoth,zone forest,4,25,27,,,,,29
 27,Terelfel,-65.2,-74.97,Orgoth,dungeon,5,26,,,,,,29
 28,Pantano de Nork,-70.78,-100.15,Orgoth,zone swamp,3,25,31,,,,,29
 29,Mithraldur,-70.14,-119.16,Orgoth,capital,1,25,30,31,32,34,35,29
 30,Yunkadur,-68.99,-118.63,Orgoth,town,2,19,29,,,,,29
 31,Záilar,-71.94,-99.45,Orgoth,town,3,28,29,32,40,,,29
 32,Región de Gigantes,-72.81,-107.4,Orgoth,zone desert,2,29,31,35,,,,29
 33,Los Astilleros del Diablo,-76.91,-115.0,Orgoth,dungeon,5,39,,,,,,29
 34,Feramar,-70.96,-120.26,Orgoth,town,2,29,35,36,,,,29
 35,Montañas del Titán,-71.28,-114.17,Orgoth,zone mountain,3,29,32,34,,,,29
 36,Bosque solitario,-73.75,-122.43,Orgoth,zone forest,3,34,37,,,,,29
 37,Bosque de la Luna Creciente,-74.36,-118.43,Orgoth,zone forest,4,36,38,,,,,29
 38,Nómadun,-75.52,-142.91,Orgoth,dungeon,5,37,,,,,,29
 39,Tierras de la Niebla Blanca,-75.74,-106.83,Orgoth,zone swamp,4,33,,,,,,29
 40,Montañas Blancas,-73.22,-93.25,Orgoth,zone mountain,4,31,,,,,,29
 41,Marbris,-45.54,-90.46,Lúthinar,town,3,13,42,43,,,,45
 42,Fértil,-48.39,-82.68,Lúthinar,town,2,41,45,52,,,,45
 43,Rívelar,-45.35,-84.64,Lúthinar,town,3,41,44,,,,,45
 44,Rádagar,-44.76,-79.39,Lúthinar,town,2,43,45,,,,,45
 45,Múnatar,-45.64,-75.96,Lúthinar,capital,1,42,44,46,51,,,45
 46,Nidel,-44.96,-66.2,Lúthinar,town,2,45,47,56,57,,,45
 47,Riscos del Centinela,-46.27,-61.98,Lúthinar,zone mountain,2,45,,,,,,45
 48,Mórth,-57.04,-83.39,Lúthinar,town,3,23,24,49,50,,,45
 49,Fárlowin,-59.27,-79.63,Lúthinar,town,4,48,87,,,,,45
 50,Castillo Difrost,-54.53,-79.65,Lúthinar,town,4,48,51,54,,,,45
 51,Lúthar,-51.59,-74.55,Lúthinar,town,3,45,50,52,53,54,55,45
 52,Cataratas de Diacleronte,-51.56,-77.5,Lúthinar,zone lake,2,42,51,,,,,45
 53,Lago Ilin Myr,-51.55,-71.15,Lúthinar,zone lake,3,51,54,55,,,,45
 54,Cordillera de las Nubes,-53.62,-68.47,Lúthinar,zone mountain,4,50,51,53,55,,,45
 55,Montañas Pardas,-50.09,-61.41,Lúthinar,zone mountain,2,51,53,54,56,,,56
 56,Brigon,-52.54,-54.67,Lúthinar,capital,1,46,55,57,59,60,,56
 57,Neopresalia,-45.58,-46.89,Lúthinar,town,2,46,56,58,59,,,56
 58,Roblecaído,-45.51,-38.5,Lúthinar,town,3,57,59,63,,,,56
 59,Tierras benditas,-48.27,-40.1,Lúthinar,zone swamp,3,56,57,58,60,63,,56
 60,Bosques de Pannar,-55.44,-42.52,Lúthinar,zone forest,4,56,59,61,62,,,56
 61,La Hundida Ciudad de Esplendor,-59.96,-42.78,Lúthinar,dungeon,5,60,62,,,,,56
 62,Pantano Raiden,-59.82,-32.85,Lúthinar,zone swamp,4,60,61,68,69,,,56
 63,Muelle de la Astilla,-42.03,-30.67,Bóscorth,town,2,58,59,64,,,,56
 64,Diámarth,-47.25,-14.5,Bóscorth,town,3,63,65,67,,,,56
 65,Montañas Brasmort,-49.64,-1.71,Bóscorth,zone mountain,4,67,66,,,,,56
 66,El Santuario,-46.86,9.32,Bóscorth,dungeon,5,65,,,,,,56
 67,Monasterio del Víngolden,-54.24,-15.25,Bóscorth,town,4,64,65,68,,,,56
 68,Vérelfel,-58.9,-19.25,Bóscorth,town,2,67,62,69,,,,56
 69,Montañas de la Roca Arenosa,-62.59,-43.24,Shakra,zone mountain,2,62,68,70,,,,70
 70,Asiriana,-64.54,-47.57,Shakra,capital,1,69,71,72,73,,,70
 71,Desierto de Shakra,-64.01,-37.31,Shakra,zone desert,2,70,,,,,,70
 72,Templo de Áershin,-65.37,-33.49,Shakra,town,3,70,79,,,,,70
 73,Kuhihashi,-67.47,-69.43,Sunzhau,town,2,70,74,75,,,,76
 74,Adamandur,-69.05,-63.44,Sunzhau,town,4,73,,,,,,76
 75,Lago Kurogahara,-69.89,-69.87,Sunzhau,zone lake,2,73,76,77,78,,,76
 76,Shitabu,-70.99,-69.39,Sunzhau,capital,1,75,77,78,,,,76
 77,Sunamerasu,-71.6,-60.97,Sunzhau,town,3,75,76,,,,,76
 78,Asanagui,-70.5,-76.68,Sunzhau,town,2,75,76,,,,,76
 79,Silvania,-70.52,-31.64,Ábalar,zone forest,2,72,80,81,,,,81
 80,Manantiales de Nun,-70.86,-23.07,Ábalar,zone lake,2,79,81,82,83,,,81
 81,Paramgarts,-71.82,-26.59,Ábalar,capital,1,79,80,82,85,,,81
 82,Falamargarts,-71.5,-18.24,Ábalar,town,2,80,81,83,84,,,81
 83,Montañas Verdes,-70.58,-12.08,Ábalar,zone mountain,3,80,82,84,,,,81
 84,Falarun,-72.82,-7.47,Ábalar,zone forest,3,82,83,86,,,,81
 85,Abacrist,-75.29,-23.38,Ábalar,zone forest,4,81,86,,,,,81
 86,Gran Árbol Édensil,-74.01,-0.83,Ábalar,dungeon,5,84,85,,,,,81
 87,Árbol del Primer Elfo,-59.4,-68.86,Lúthinar,dungeon,5,49,,,,,,45
 */

/**********************************************/
/**********************************************/
/**********************************************/

module.exports = {
    places: places
};
