// Módulo calculadora
var Calculadora = {};

Calculadora = (function () {
	// Variables privadas
	var numeroTmp = "0", numeroA = 0, numeroB = 0, resultado = 0, operacion = "";

	// Método para procesar todas las teclas
	function procesarTecla(event) {
		var tecla = (event.target || event.srcElement);
		var id = tecla.id;

		//Asignando función a las teclas con números
		if( id == 0 || id == 1 || id == 2 || id == 3 || 
			id == 4 || id == 5 || id == 6 ||
			id == 7 || id == 8 || id == 9){
			procesarNumero(id);
		} else if(id == 'mas' || id == 'menos' || id == 'por' || id == 'dividido'){
			procesarOperacion(id);
		} else if(id == 'punto'){
			puntoDecimal();
		} else if(id == 'igual'){
			if(numeroTmp != "0"){
				if(numeroA == 0){//Primer número a operar
					numeroA = parseFloat(numeroTmp);
				} else {//Segundo número a operar
					numeroB = parseFloat(numeroTmp);
				}
			}

			resultado = calcularResultado(numeroA, numeroB, operacion);
			numeroA = 0;
			numeroTmp = resultado + "";

			display(numeroTmp);

		} else if(id == 'sign'){
			cambiarSigno();
		} else if(id == 'on'){
			limpiar();
		} 

	}

	//Método para procesar las teclas numéricas
	function procesarNumero(num){

		var largo = numeroTmp.length;
		if(numeroTmp.indexOf("-") != -1){
			largo = largo - 1;
		}
		if(numeroTmp.indexOf(".") != -1){
			largo = largo - 1;
		}

		if(largo < 8){
			if(numeroTmp == "0"){
				numeroTmp = num + "";
			}else {
				numeroTmp = numeroTmp + "" + num;
			}
		}
		display(numeroTmp);
	}

	//Método para procesar las teclas de operaciones aritméticas
	function procesarOperacion(oper){

		if(numeroTmp != "0"){

			if(numeroA == 0){//Primer número a operar
				numeroA = parseFloat(numeroTmp);
				numeroTmp = "0";
			} else {//Segundo número a operar
				numeroB = parseFloat(numeroTmp);
				numeroTmp = "0";
				resultado = calcularResultado(numeroA, numeroB, operacion);
				numeroA = 0;
				numeroTmp = resultado + "";
				display(numeroTmp);

				procesarOperacion();
			}

		}
		
		if(resultado != 0){
			display(resultado);
		}else {
			display(numeroTmp);
		}

		operacion = oper;

	}

	//Método que coloca el punto decimal al número de la pantalla
	function puntoDecimal(){

		if(numeroTmp.indexOf(".") == -1){
			numeroTmp = numeroTmp + ".";
		}

		display(numeroTmp);
	}

	//Método que cambia el signo del operador en pantalla
	function cambiarSigno(){

		if(numeroTmp != "0"){
			if(numeroTmp.indexOf("-") == -1){
				numeroTmp = "-" + numeroTmp;
			}else {
				numeroTmp = numeroTmp.substring(1);
			}
		}

		display(numeroTmp);
	}

	//Método que ejecuta la operación indicada con los 2 números dados
	function calcularResultado(numA, numB, oper){

		if(oper == 'mas'){
			resultado = numA + numB;
		} else if(operacion == 'menos'){
			resultado = numA - numB;
		} else if(operacion == 'por'){
			resultado = numA * numB;
		} else if(operacion == 'dividido'){
			resultado = numA / numB;
		}

		return resultado;
	}

	//Método que limpia la pantalla y asigna los valores iniciales
	function limpiar(){

		numeroTmp = "0";
		numeroA = 0;
		numeroB = 0;
		resultado = 0;
		operacion = "";
		
		display(resultado);
	}

	//Presenta el valor indicado en la pantalla
	function display(valor){
		if(valor.length > 8){
			valor = parseFloat(valor).toPrecision(8) + "";
			valor = valor.substring(0, 8);
		}
		document.getElementById("display").innerHTML = valor;
	}
	
	//Cambia visualmente una tecla
	function resaltarTecla(event){
		var tecla = (event.target || event.srcElement);

		//Cambiar tamaño visualmente
		tecla.style.width = tecla.width * 0.9 + "px";
		tecla.style.height = tecla.height * 0.9 + "px";
	}
	
	//Restaura la tecla a su tamaño original
	function restablecerTecla(event){
		var tecla = (event.target || event.srcElement);

		//Cambiar tamaño visualmente
		tecla.style.width = tecla.width / 0.9 + "px";
		tecla.style.height = tecla.height / 0.9 + "px";
	}

	// API expuesta
	return {
		inicializar: function () {
			//Procesar eventos de las teclas
			var teclas = document.getElementsByClassName("tecla");
			for(var i=0; i<teclas.length; i++){
				teclas[i].addEventListener('click', procesarTecla);
				teclas[i].addEventListener('mousedown', resaltarTecla);
				teclas[i].addEventListener('mouseup', restablecerTecla);
			}
		}
	}
}());

//Ejecutar al cargue de la página
document.getElementsByTagName("body")[0].onload = function(){
	Calculadora.inicializar();
};
