/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

inicializarSlider();
playVideoOnScroll();


/* Función auto-ejecutable */
$(function(){
	
	inicializarCiudades();
	inicializarTipos();
	
	$('#formulario').submit(submitInfo);
	

})

function inicializarCiudades(){
	$.ajax({
		url: './ciudades.php',
		dataType: 'text',
		cache: false,
		contentType: false,
		processData: false,
		type: 'get',
		success: function(data){
			var objLista = JSON.parse(data);
			
			for (x in objLista) {
				var htmlAux = "<option value='" +objLista[x] + "'>" + objLista[x] + "</option>";

				$('#selectCiudad').append(htmlAux);
			}
			
			$('#selectCiudad').material_select();

		},
		error: function(){
			alert("error al cargar lista de ciudades");
		}
	})
	
}

function inicializarTipos(){
	$.ajax({
		url: './tipos.php',
		dataType: 'text',
		cache: false,
		contentType: false,
		processData: false,
		type: 'get',
		success: function(data){
			var objLista = JSON.parse(data);
			
			for (x in objLista) {
				var htmlAux = "<option value='" +objLista[x] + "'>" + objLista[x] + "</option>";

				$('#selectTipo').append(htmlAux);
			}
			
			$('#selectTipo').material_select();

		},
		error: function(){
			alert("error al cargar lista de ciudades");
		}
	})
	
}

function getPlantilla(objPropiedad){
	// number formatter para presentar el valor en tipo moneda
	var formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
	});

	var plantilla = 
	'<div class="itemMostrado card">' + 
		'<img src="img/home.jpg">' + 
		'<div class="card-stacked">' +
			'<div><b>Direcci&oacute;n: </b>' + objPropiedad.direccion + '</div>' +
			'<div><b>Ciudad:</b>' + objPropiedad.ciudad + '</div>' +
			'<div><b>Tel&eacute;fono: </b>' + objPropiedad.telefono + '</div>' +
			'<div><b>C&oacute;digo Postal: </b>' + objPropiedad.codigo_postal + '</div>' +
			'<div><b>Tipo: </b>' + objPropiedad.tipo + '</div>' +
			'<div><b>Precio: </b><span class="precioTexto">' + formatter.format(objPropiedad.precio) + '</span>' +
			'<div class="divider card-action">' +
				'<a href="#">Ver Más</a>' +
			'</div>' +
		'</div>';
	'</div>';
	
	return plantilla;
}

/*
  Función que envía vía AJAX  los criterios de búsqueda
*/
function submitInfo(event){
	event.preventDefault();
	var form_data = getInfoForm();
	$.ajax({
		url: './index.php',
		dataType: 'text',
		cache: false,
		contentType: false,
		processData: false,
		data: form_data,
		type: 'post',
		success: function(data){
			var objLista = JSON.parse(data);
			
			for (x in objLista) {
				$(".colContenido").append( getPlantilla(objLista[x]) );
			}
			
			//window.location.href = 'index.html';
		},
		error: function(){
			alert("error al enviar el formulario");
		}
	})
	
}

/*
  Función que recopila los datos del formulario en una variable
*/
function getInfoForm(){
  var form_data = new FormData();
  form_data.append('ciudad', $("[name='ciudad']").val());
  form_data.append('tipo', $("[name='tipo']").val());
  form_data.append('precio', $("[name='precio']").val());

  return form_data;
}
