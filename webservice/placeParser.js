var fs = require('fs'),
    reader = require('readline');

var params = [];
process.argv.forEach(function (val, index) {
    params[index] = val;
});

if (!params[2]) {
    console.log("Usage: node placeParser.js <file>");
    process.exit();
}

var lineReader = reader.createInterface({
    input: fs.createReadStream(params[2])
});

var places = [];
lineReader.on('line', function (line) {
    var trozos = line.split(',');
    // ID,Lugar,Latitud,Longitud,Región,Clasificación,Nivel,Adyacente 1,Adyacente 2,Adyacente 3,Adyacente 4,Adyacente 5,Adyacente 6,Capital
    //  0,    1,      2,       3,     4,            5,    6,          7,          8,          9,         10,         11,         12,     13

    var type = null, subtype = null;
    var classif = trozos[5].split(' ');
    if (classif.length > 1) {
        type = classif[0];
        subtype = classif[1];
    } else {
        type = classif[0];
    }

    var ady = [], contained = [];
    if (trozos[7] !== '') {
        ady.push(trozos[7]);
        contained.push({category: 'pack' + trozos[7], frequency: 'C'});
    }
    if (trozos[8] !== '') {
        ady.push(trozos[8]);
        contained.push({category: 'pack' + trozos[8], frequency: 'C'});
    }
    if (trozos[9] !== '') {
        ady.push(trozos[9]);
        contained.push({category: 'pack' + trozos[9], frequency: 'C'});
    }
    if (trozos[10] !== '') {
        ady.push(trozos[10]);
        contained.push({category: 'pack' + trozos[10], frequency: 'C'});
    }
    if (trozos[11] !== '') {
        ady.push(trozos[11]);
        contained.push({category: 'pack' + trozos[11], frequency: 'C'});
    }
    if (trozos[12] !== '') {
        ady.push(trozos[12]);
        contained.push({category: 'pack' + trozos[12], frequency: 'C'});
    }

    contained.push({category: 'pack' + trozos[0], frequency: 'C'});


    places.push({
        "id": trozos[0],
        "name": trozos[1],
        "type": "place",
        "contained_in_packs": contained,
        "data": {
            "place": {
                "lat": trozos[2],
                "long": trozos[3],
                "region": trozos[4],
                "level": trozos[6],
                "pack_reward": "pack" + trozos[0],
                "type": type,
                "subtype": subtype,
                "adjacent_places": ady,
                "capital": trozos[13]
            }
        }
    });
});

lineReader.on('close', function () {
    fs.writeFileSync(params[2] + '.output', JSON.stringify(places));
});

lineReader.on('error', function (err) {
    console.error(err);
});
