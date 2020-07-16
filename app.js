// Modulos necesarios
const express = require("express")
const app= express()
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const config = require('./config')
const configApi = require('./middlewares/configApi')

// Servidor Sokect.io
var server = require('http').Server(app);
var io = require('socket.io')(server);

// Conexion con la base de datos
mongoose.connect(config.URL_DB, {useNewUrlParser:true})


// Rutas
const rEstado = require('./routes/rEstado')
const rAmigo = require('./routes/rAmigo')
const rSolicitud = require('./routes/rSolicitud')
const rMedia = require('./routes/rMedia')
const rComentario = require('./routes/rComentario')
const rCategoria= require('./routes/rCategoria')
const rShare = require('./routes/rShare')
const rMe_Gusta = require('./routes/rMe_Gusta')
const rFollowing_Cat = require('./routes/rFollowing_Cat')
const rUsuario = require('./routes/rUsuario')
const rPublicacion = require('./routes/rPublicacion')
const rMediaPost = require('./routes/rMediaPost')
const rNotificacion = require('./routes/rNotificacion')
const rConversacion = require('./routes/rConversacion')
const rMensaje = require('./routes/rMensaje')


// Configuracion para usar el body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// Configuracion de carpetas publicas
app.use(express.static('public'))
app.use(express.static('public/uploads/'));


// Permitimos la conexion de la API con sitios externos
app.use(configApi)


// Aplicamos las rutas a la aplicacion
app.use(rEstado)
app.use(rCategoria)
app.use(rShare)
app.use(rMe_Gusta)
app.use(rFollowing_Cat)
app.use(rUsuario)
app.use(rPublicacion)
app.use(rMediaPost)
app.use(rNotificacion)
app.use(rComentario)
app.use(rAmigo)
app.use(rSolicitud)
app.use(rMedia)
app.use(rConversacion)
app.use(rMensaje)

// Iniciamos el servidor
app.listen("3030", function() {
    console.log("Servidor Iniciado")
})

// Iniciar servidor Sokect
server.listen(3001, function()
{
    console.log('Servidor Socket.io Corriendo')
})

require('./sockets')(io);

io.on('connection', function(socket) {


    socket.on('send message', function(data) {
        console.log('sending room post', data.room);
        socket.to(data.room).emit('conversation private post', data);
    });
});


