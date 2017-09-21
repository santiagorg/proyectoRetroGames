var http=require('http');
var path = require('path');

var url=require('url');
const express = require('express');
const app = express();
app.set('view engine', 'pug');
app.use(express.static("views")); //localización del raíz

app.get('/', function(req, res){
  currentUrl = req.url
  res.render('index.pug'); //llamada de plantillas
});

app.get('/majesticFlight', function(req, res){
  res.render('layouts/majesticflight.pug');
});

app.get('/angelInvaders', function(req, res){
  res.render('layouts/angelinvaders.pug');
});

app.get('/pong', function(req, res){
  res.render('layouts/pong.pug'); 
});

app.listen(8080);