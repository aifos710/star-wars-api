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

	var pjs = function(response){
		$("#total").text(response.results.length);
		var personajes = "";
		$.each(response.results, function(i, personaje){
			personajes += template.replace("{{name}}",personaje.name).replace("{{url}}",
				personaje.url);
		});
		$("#people").html(personajes);
		$("#next").attr("data-url", response.next);
		$("#pre").attr("data-url-pre",response.previous);	

		if(!response.next){
			$("#next").fadeOut();
		}
		if(!response.previous){
			$("#pre").fadeOut();
		}
		if(response.next && response.previous){
			$("#next").fadeIn();
			$("#pre").fadeIn();
		}
	};

	
	$.getJSON("http://swapi.co/api/people/", pjs)

	$("#next").click(function(event){
		event.preventDefault();
		var url = $(this).attr("data-url");
		$.getJSON(url, pjs);
	});

	$("#pre").click(function(event){
		event.preventDefault();
		var url = $(this).attr("data-url-pre");//nombre unico
		$.getJSON(url, pjs);
	});

	$("#people").on("click", ".moreAbout", function(event){
		event.preventDefault();
		alert("hola");
	});
	$("#species").change(function(e){
		alerts($(this).val());
	})

});