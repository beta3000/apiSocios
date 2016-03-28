// app/models/socio.js

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

/*
codigoSocio:String
nombresSocio:String
apellidosSocio:String
fechaNacimientoSocio:Date
direccionSocio:String
telefonoSocio:String
creditoSocio:Number
urlImagenPerfilSocio:String
urlImagenHuellaDactilarSocio:String
urlImagenFirmaSocio:String
estadoSocio:String
*/

var SocioSchema  = new Schema({
  codigoSocio:String,
  nombresSocio:String,
  apellidosSocio:String,
  fechaNacimientoSocio:Date,
  direccionSocio:String,
  telefonoSocio:String,
  creditoSocio:Number,
  urlImagenPerfilSocio:String,
  urlImagenHuellaDactilarSocio:String,
  urlImagenFirmaSocio:String,
  estadoSocio:String
});

module.exports = mongoose.model('Socio', SocioSchema);
