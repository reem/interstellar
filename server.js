var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var _ = require('lodash/dist/lodash.underscore');

var app = express();

app.use(morgan({format: 'dev', immediate: true}));
app.use(bodyParser());
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/public'));

require('./routes.js')(app);

app.listen(3000);
console.log("On 3k");
