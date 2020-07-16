const Chat = require('./models/mensajes').Chat


module.exports = function(io)
{

io.on('connection', async function(socket)
{
   
    socket.on('chat-mensaje', async(data) => {
       var newMsg
          newMsg = new Chat({        
            id_usuario: socket.id_usuario,
            contenido: data
                });
               await newMsg.save();

       io.sockets.emit('chat-mensaje', data);

   
    })

    socket.on('subscribe', function(room) {
        console.log('joining room', room);
        socket.join(room);
    });  

    socket.on('create', function (room) {
        socket.join(room);
        console.log("room creado:" + room)
      });

   
});



    


}



