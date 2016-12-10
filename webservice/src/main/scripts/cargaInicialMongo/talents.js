/**********************************************/
/******************* TALENTOS ******************/
/**********************************************/
module.exports = [
    {
        "id": "t001",
        "name": "Movimiento ágil",
        "description": "Description bla bla bla",
        "branch": "combat",
        "skills": [],
        "level": 0,
        "required": []
    },
    {
        "id": "t002",
        "name": "Golpe doble",
        "description": "Description bla bla bla",
        "branch": "combat",
        "skills": [],
        "level": 1,
        "cost": 2,
        "required": ['t001']
    },
    {
        "id": "t003",
        "name": "Daño 75%",
        "description": "Description bla bla bla",
        "branch": "combat",
        "skills": [],
        "level": 2,
        "required": ['t002']
    },
    {
        "id": "t004",
        "name": "Defensa 10%",
        "description": "Description bla bla bla",
        "branch": "combat",
        "skills": [],
        "level": 2,
        "required": ['t002']
    },
    {
        "id": "t005",
        "name": "Daño 100%",
        "description": "Description bla bla bla",
        "branch": "combat",
        "skills": [],
        "level": 3,
        "required": ['t003']
    },
    {
        "id": "t006",
        "name": "Sangrado",
        "description": "Description bla bla bla",
        "branch": "combat",
        "skills": [],
        "level": 3,
        "required": ['t003']
    },
    {
        "id": "t007",
        "name": "Taladro",
        "description": "Description bla bla bla",
        "branch": "combat",
        "skills": [],
        "level": 3,
        "required": ['t003']
    },
    {
        "id": "t008",
        "name": "Rompehuesos",
        "description": "Description bla bla bla",
        "branch": "combat",
        "skills": [],
        "level": 3,
        "required": ['t003']
    },
    {
        "id": "t009",
        "name": "Daño filo 100%",
        "description": "Description bla bla bla",
        "branch": "combat",
        "skills": [],
        "level": 4,
        "required": ['t006']
    },
    {
        "id": "t010",
        "name": "Daño penetrante 100%",
        "description": "Description bla bla bla",
        "branch": "combat",
        "skills": [],
        "level": 4,
        "required": ['t007']
    },
    {
        "id": "t011",
        "name": "Daño contundente 100%",
        "description": "Description bla bla bla",
        "branch": "combat",
        "skills": [],
        "level": 4,
        "required": ['t008']
    },
    {
        "id": "t012",
        "name": "Esquiva",
        "description": "Description bla bla bla",
        "branch": "combat",
        "skills": [],
        "level": 4,
        "required": ['t004']
    },
    {
        "id": "t013",
        "name": "Resistencia acolchada 20%",
        "description": "Description bla bla bla",
        "branch": "combat",
        "skills": [],
        "level": 5,
        "required": ['t012']
    },
    {
        "id": "t014",
        "name": "Resistencia escamas 20%",
        "description": "Description bla bla bla",
        "branch": "combat",
        "skills": [],
        "level": 5,
        "required": ['t012']
    },
    {
        "id": "t015",
        "name": "Resistencia anillas 20%",
        "description": "Description bla bla bla",
        "branch": "combat",
        "skills": [],
        "level": 5,
        "required": ['t012']
    }
];

/*
 id: {type: String, unique: true, required: true},
 name: {type: String, required: true},
 description: {type: String, required: true},
 branch: {type: String, required: true, enum: ['combat', 'exploration', 'survival']},
 skills: [String], // Array de ids de skills que otorga este talento
 level: {type: Number, required: true}, // Nivel que hay q tener de esta rama para coger este talento
 required: [String] // Array de ids de talentos requeridos
 */
