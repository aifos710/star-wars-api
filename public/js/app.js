var templateSpecie = '<option value="__numId__" data-url-species="">__specie__</option>' // creo mi template
var template = '<div class="col s12 m4">' +
		    '<div class="card horizontal hoverable">' +
		      	'<div class="card-stacked">' +
		        	'<div class="card-content  amber white-text">' +
		          		'<p>Hi, my name is <strong>{{name}}</strong></p>' +
		        	'</div>' +
			        '<div class="card-action">' +
			          	'<a data-show-url="{{url}}" class="moreAbout">See more about me</a>' +
			        '</div>' +
			    '</div>' +
	    	'</div>' +
	  	'</div>';

$(document).ready(function(){
	
	var listarEspecies = function(response){ //creo una function expresion
		var specie = "";                     // creo string vacio
		$.each(response.results, function(i, species){ // uso each para iterar entre los nombres de las especies
			var value = "";
			var soloId ="http://swapi.co/api/people/";
			$.each(species.people, function(i, url){
				value += url.replace(soloId, "");
			});
			specie += templateSpecie.replace("__specie__", species.name).replace("__numId__", value.substring(0,value.length-1)); // reemplazar el template html ^(__specie__) por species(parametro).name(propiedad en el api)
		});
		$("#species").html('<option disabled selected >Species</option>');
		$("#species").append(specie);//para ponerlo en html
	};

	$.getJSON("http://swapi.co/api/species/", listarEspecies);
});

$(".input-field").on("change", "#species", function(event){//(evento, a quien le detecta el evento, function)
	var idNum = $(this).val().split("/");
	for(var i=0; i<idNum.length; i++){
		$.getJSON("http://swapi.co/api/people/"+ idNum[i] + "/", listarNombres);
	};

});	

	var listarNombres = function(response){
		var templateCompleto = template.replace("{{name}}", response.name);
		$("#people").append(templateCompleto);
	}