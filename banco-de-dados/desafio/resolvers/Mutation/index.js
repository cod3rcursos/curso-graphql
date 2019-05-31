const usuario = require('./usuario')
const perfil = require('./perfil')

 module.exports = {
    ...usuario,
    ...perfil,
 }