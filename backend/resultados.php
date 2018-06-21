<?php
require('c_Propiedad.php');

$archivo = fopen("data-1.json", "r") or die("Unable to open file!");
$lista_txt = fread($archivo, filesize("data-1.json"));

fclose($archivo);


$lista_json = json_decode($lista_txt);

$ciudad = $_POST['ciudad'];
$tipo = $_POST['tipo'];
$precio = $_POST['precio'];
$precioRango = explode(";", $precio);
$precioMin = intval($precioRango[0]);
$precioMax = intval($precioRango[1]);

$listaFiltrada = array();

foreach($lista_json as $propiedad){
	//Obteniendo el valor numérico a partir del texto
	$valorPrecio = intval(ereg_replace("[^0-9]", "", $propiedad->Precio));
	
	$objPropiedad = new Propiedad(
		$propiedad->Id, 
		$propiedad->Direccion, 
		$propiedad->Ciudad, 
		$propiedad->Telefono, 
		$propiedad->Codigo_Postal, 
		$propiedad->Tipo, 
		$valorPrecio);
	
	$isCriterioCiudad = false; //Indica si cumple con el criterio de ciudad
	if( !empty($ciudad) ){
		if($objPropiedad->ciudad == $ciudad){
			$isCriterioCiudad = true;
		}	
	}else{
		$isCriterioCiudad = true;
	}
	
	$isCriterioTipo = false; //Indica si cumple con el criterio de tipo
	if( !empty($tipo) ){
		if($objPropiedad->tipo == $tipo){
			$isCriterioTipo = true;
		}	
	}else{
		$isCriterioTipo = true;
	}
	
	$isCriterioPrecio = false; //Indica si cumple con el criterio de precio
	if( $objPropiedad->precio >= $precioMin && $objPropiedad->precio <= $precioMax){
		$isCriterioPrecio = true;
	}
	
	if($isCriterioCiudad==true && $isCriterioTipo==true && $isCriterioPrecio==true){
		array_push($listaFiltrada, $objPropiedad);
	}
	
}


echo json_encode($listaFiltrada);

?>