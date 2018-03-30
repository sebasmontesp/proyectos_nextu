// Módulo calculadora
var CalculadoraModule = {};
 
// Library definition
CalculadoraModule = (function () {
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
			calcularResultado();
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
				calcularResultado();
			}

		}

		operacion = oper;
		display(numeroTmp);

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

	//Método qu ejecuta la operación indicada con los últimos 2 números
	function calcularResultado(){

		if(numeroTmp != "0"){
			if(numeroA == 0){//Primer número a operar
				numeroA = parseFloat(numeroTmp);
			} else {//Segundo número a operar
				numeroB = parseFloat(numeroTmp);
			}
		}

		if(operacion == 'mas'){
			resultado = numeroA + numeroB;
		} else if(operacion == 'menos'){
			resultado = numeroA - numeroB;
		} else if(operacion == 'por'){
			resultado = numeroA * numeroB;
		} else if(operacion == 'dividido'){
			resultado = numeroA / numeroB;
		}

		numeroA = 0;
		numeroTmp = resultado + "";

		display(numeroTmp);
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

	function display(valor){
		if(valor.length > 8){
			valor = parseFloat(valor).toPrecision(8) + "";
			valor = valor.substring(0, 8);
		}
		document.getElementById("display").innerHTML = valor;
	}

	// API expuesta
	return {
		inicializar: function () {
			//Procesar evento click de las teclas
			var teclas = document.getElementsByClassName("tecla");
			for(var i=0; i<teclas.length; i++){
				teclas[i].addEventListener('click', procesarTecla);
			}
		}
	}
}());

CalculadoraModule.inicializar();