var express = require("express");
var app = express();

app.use(express.static(__dirname + "/public"))

app.listen(128, function(){
	console.log("Servidor encendido.");
});