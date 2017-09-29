'use strict';

//Cargo los módulos que voy a usar y los inicializo
var express = require('express'),
    cors = require('cors'),
    app = express(),
    validator = require('validator'),
    mongoose = require('mongoose'),
    Q = require('q'),
    morgan = require('morgan'),
    scribe = require('scribe-js')();

// Uso los promise de Q
mongoose.Promise = require('q').Promise;
// Consola personalizada para scribe
var console = process.console;
// Q
Q.longStackSupport = true;

var serverPort = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    serverHost = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    mongoHost = process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME || 'mongodb://localhost/kafhe';

// Configuramos la app para que pueda realizar métodos REST
app.options('*', cors());
app.use(cors());

app.use(morgan('combined'));

app.use(scribe.express.logger()); //Log each request
// TODO deshabilitar en producción
app.use('/logs', scribe.webPanel()); //Log web console

//Configuración de la conexión a Mongo
mongoose.connect(mongoHost, {
    //user: 'myUserName',
    //pass: 'myPassword'
});

//Creo los modelos de Mongo. Sólo he de hacerlo una vez
require('./models/createModels')(mongoose);
// Conexión a mongo
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function (callback) {
    console.log("Mongo conectado");
});
// TODO deshabilitar en pro
mongoose.set('debug', true);

//Cargo las rutas y estrategias
require('./routes/routes')(app);

// Si no se "queda" en una de las rutas anteriores, devuelvo un 404 siempre
app.use(function (req, res) {
    res.status(404).send('Aquí no hay nada ┌∩┐(◣_◢)┌∩┐');
});

//Si salta alguna excepción rara, saco error en vez de cerrar la aplicación
process.on('uncaughtException', function (err) {
    // handle the error safely
    console.log("ERROR - " + err);
});

//Controlamos el cierre para desconectar mongo
process.stdin.resume();//so the program will not close instantly
//do something when app is closing, catches ctrl+c event
process.on('exit', exitHandler.bind(null, {closeMongo: true, exit: true, msg: 'exit'}));
process.on('SIGINT', exitHandler.bind(null, {closeMongo: true, exit: true, msg: 'SIGINT'}));
process.on('SIGTERM', exitHandler.bind(null, {closeMongo: true, exit: true, msg: 'SIGTERM'}));


function exitHandler(options, err) {
    console.log('Salgo ' + options.msg + '. Error: ' + err);
    if (options.closeMongo) {
        mongoose.disconnect();
    }
    if (options.exit) {
        process.exit();
    }
}

//Arranco el servidor
var server = app.listen(serverPort, serverHost, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Servidor escuchando en http://%s:%s', host, port);
});

