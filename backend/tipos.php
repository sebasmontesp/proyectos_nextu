<?php

$archivo = fopen("data-1.json", "r") or die("Unable to open file!");
$lista_txt = fread($archivo, filesize("data-1.json"));

fclose($archivo);


$lista_arr = json_decode($lista_txt); //Parseando JSON
$arrlength = count($lista_arr);

$tipos = array();

//Filtrando los valores de los tipos
for($i = 0; $i < $arrlength; $i++) {
	array_push($tipos, $lista_arr[$i]->Tipo);
}

$tipos = array_unique($tipos); //Quitanto repetidos

echo json_encode($tipos);
?>