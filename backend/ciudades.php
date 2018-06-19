<?php

$archivo = fopen("data-1.json", "r") or die("Unable to open file!");
$lista_txt = fread($archivo, filesize("data-1.json"));

fclose($archivo);


$lista_arr = json_decode($lista_txt); //Parseando JSON
$arrlength = count($lista_arr);

$ciudades = array();

//Filtrando los valores de las ciudades
for($i = 0; $i < $arrlength; $i++) {
	array_push($ciudades, $lista_arr[$i]->Ciudad);
}

$ciudades = array_unique($ciudades); //Quitanto repetidos

echo json_encode($ciudades);
?>