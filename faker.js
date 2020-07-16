const mongoose = require("mongoose");
const config = require('./config');
const faker = require('mongoose-faker');
const Usuario = require('./models/usuario').Usuario;
const Estado = require('./models/estado').Estado;
const Amigo = require('./models/amigo').Amigo;
const Solicitud = require('./models/solicitud').Solicitud;
const Media = require('./models/media').Media;
//const CategoriaPadre = require('./models/categoria_padre').CategoriaPadre
const Categoria = require('./models/categoria').Categoria;
const FollowingCat = require('./models/following_cat').followingCat;
// Creata a document and save it to the db

seed = async function () {
    await mongoose.connect(config.URL_DB, {useNewUrlParser: true, useUnifiedTopology: true});
    const CANTIDAD_USUARIOS = 30;
    const CANTIDAD_AMIGO = 10;
    const CANTIDAD_SOLICITUDES = 10;
    const CANTIDAD_MEDIA = 20;
    const CANTIDAD_CATEGORIA = 20;
    console.log("Creando usuarios");
    for (let i = 0; i < CANTIDAD_USUARIOS; i++) {
        const usuario = await faker.generateObject(Usuario);
        await usuario.save();
    }

    console.log("Creando amigos");
    for (let i = 0; i < CANTIDAD_AMIGO; i++) {
        const amigo = await faker.generateObject(Amigo);
        await amigo.save();
    }
    console.log("Creando solicitudes");
    for (let i = 0; i < CANTIDAD_SOLICITUDES; i++) {
        const solicitud = await faker.generateObject(Solicitud);
        await solicitud.save();
    }
    console.log("Creando media");
    for (let i = 0; i < CANTIDAD_MEDIA; i++) {
        const media = await faker.generateObject(Media);
        await media.save();
    }
  /*  console.log("Creando categoriap");
    for (let i = 0; i < 3; i++) {
        const categoriap = await faker.generateObject(CategoriaPadre);
        await categoriap.save();
    }*/
    console.log("Creando categoria");
    for (let i = 0; i < CANTIDAD_CATEGORIA; i++) {
        const categoria = await faker.generateObject(Categoria);
        await categoria.save();
    }

    console.log("Creando followin cat");
    for (let i = 0; i < 2; i++) {
        const fc = await faker.generateObject(FollowingCat);
        await fc.save();
    }
    mongoose.connection.close();

}
seed();

// You can also pass in custom fields to your model
//const amigo = faker.generateObject(Amigo, {save: true, custom: {id_sender: [usuario], id_receiver: [usuario]}});
