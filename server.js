var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path    = require('path');
var logger = require('./services/lib/logger');


var app = module.exports = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser());
app.use(methodOverride());

app.set('views', __dirname + '/server/views');
app.set('view engine', 'ejs');

var port = process.env.PORT || 8080;

app.listen(port, function(){
   logger.info("Express server listening on %d", this.address().port) ;
});


