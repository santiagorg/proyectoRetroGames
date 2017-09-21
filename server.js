var http=require('http');
var path = require('path');

var url=require('url');
const express = require('express');
const app = express();
app.set('view engine', 'pug');
app.use(express.static("views")); //establece lugar donde está el index y carga todo contenido

app.get('/', function(req, res){
  currentUrl = req.url
  res.render('index.pug'); //render es para plantillas (pug es un MW de plantillas)
});

app.get('/majesticFlight', function(req, res){
  //res.sendFile(__dirname + "/" + "index.html"); //si no se usan middlewares
  res.render('layouts/majesticflight.pug'); //render es para plantillas (pug es un MW de plantillas)
});

app.get('/angelInvaders', function(req, res){
  //res.sendFile(__dirname + "/" + "index.html"); //si no se usan middlewares
  res.render('layouts/angelinvaders.pug'); //render es para plantillas (pug es un MW de plantillas)
});

app.get('/pong', function(req, res){
  //res.sendFile(__dirname + "/" + "index.html"); //si no se usan middlewares
  res.render('layouts/pong.pug'); //render es para plantillas (pug es un MW de plantillas)
});

app.listen(8080);


//para pasar parámetros por url, final interrog. + variable=nombreAPoner