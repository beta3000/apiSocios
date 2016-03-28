// server.js

// BASE SETUP
// =============================================================================

// llamada a los paquetes que se va a necesitar
var express     = require('express');                     // llamando express
var app         = express();                              // definiendo nuestra app usando express
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
mongoose.connect('mongodb://localhost/apiSocios');        // conectando a la base de datos
var Socio       = require('./app/models/socio');

//Configurando app para usar bodyParser()
//Esto no ayuda a obtener la data desde POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;                      // cambiamos el puerto

// RUTAS PARA NUESTRA API
// =============================================================================
var router = express.Router();                            // obtenemos una instancia de express Router

//middleware para usar por todos los requests
router.use(function(req, res, next) {
  // mostrando en loggin
  console.log('Buscando el middleware adecuado');
  next();                                                 // aseguramos que seguira a la siguiente rutas y no se pare aqui
});

// Probar la ruta principal accediendo  a (http://localhost:8080/api) cambiar localhost por la ip del servidor
router.get('/', function(req, res) {
  res.json({message: 'Bienvenido a la apiSocios'});
});

// mas rutas para nuestra API tienen que ir aqui
// las rutas tienen que terminar en /socios
// -----------------------------------------------------------------------------
router.route('/socios')
  //crear un socio (accediendo con POST http://localhost:8080/api/socios)
  .post(function(req, res) {
    var socio = new Socio();                              // creamos una nueva instancia de Socio model
    socio.codigoSocio = req.body.codigoSocio;
    socio.nombresSocio = req.body.nombresSocio;
    socio.apellidosSocio = req.body.apellidosSocio;
    socio.fechaNacimientoSocio = req.body.fechaNacimientoSocio;
    socio.direccionSocio = req.body.direccionSocio;
    socio.telefonoSocio = req.body.telefonoSocio;
    socio.creditoSocio = req.body.creditoSocio;
    socio.urlImagenPerfilSocio = req.body.urlImagenPerfilSocio;
    socio.urlImagenHuellaDactilarSocio = req.body.urlImagenHuellaDactilarSocio;
    socio.urlImagenFirmaSocio = req.body.urlImagenFirmaSocio;
    socio.estadoSocio = req.body.estadoSocio;

    // guardamos el socio y revisamos si existen errores
    socio.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({message: 'Socio creado!'});
    });
  })
  // Obtener todos los socios (acceder con GET http://localhost:8080/api/socios)
  .get(function(req, res) {
    Socio.find(function(err, socios) {
      if (err) {
        res.send(err);
      }
      res.json(socios);
    });
  });

  // rutas que terminan en /socios/:socio_codigoSocio
  // ---------------------------------------------------------------------------
  router.route('/socios/:codigoSocio')
    // obtener el socio por su codigo (acceder con GET http://localhost:8080/api/socios/:codigoSocio)
    .get(function(req, res) {
      Socio.findOne({'codigoSocio':req.params.codigoSocio},function(err, socio) {
        if (err) {
          res.send(err);
        }
        res.json(socio);
      });
    })

    // actualizar el socio mediante su codigo (acceder con PUT http://localhost:8080/api/socios/:codigoSocio)
    .put(function(req, res) {
      // usamos nuestro socio model para buscar el socio que deseamos actualizar
      Socio.findOne({'codigoSocio':req.params.codigoSocio},function(err, socio) {
        if (err) {
          res.send(err);
        }
          socio.codigoSocio = req.body.codigoSocio;
          socio.nombresSocio = req.body.nombresSocio;
          socio.apellidosSocio = req.body.apellidosSocio;
          socio.fechaNacimientoSocio = req.body.fechaNacimientoSocio;
          socio.direccionSocio = req.body.direccionSocio;
          socio.telefonoSocio = req.body.telefonoSocio;
          socio.creditoSocio = req.body.creditoSocio;
          socio.urlImagenPerfilSocio = req.body.urlImagenPerfilSocio;
          socio.urlImagenHuellaDactilarSocio = req.body.urlImagenHuellaDactilarSocio;
          socio.urlImagenFirmaSocio = req.body.urlImagenFirmaSocio;
          socio.estadoSocio = req.body.estadoSocio;

          // guardamos el socio y revisamos si existen errores
          socio.save(function(err) {
            if (err) {
              res.send(err);
            }
            res.json({message : 'Socio actualizado!'});
          });
      });
    })
    // eliminamos el socio mediante su codigo (acceder con DELETE http://localhost:8080/api/socios/:codigoSocio)
    .delete(function(req, res) {
      Socio.remove({
        codigoSocio: req.params.codigoSocio
      }, function(err, socio) {
        if (err) {
          res.send(err);
        }
        res.json({message: 'Socio elminado correctamente!'});
      });
    });

// REGISTRAR NUESTRAS RUTAS
// todas nuestras rutas van a tener el prefijo /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('El servidor esta corriendo en el puerto '+port);
