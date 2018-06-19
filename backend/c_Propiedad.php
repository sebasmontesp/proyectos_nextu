<?php

class Propiedad
{
	public $id;
	public $direccion;
	public $ciudad;
	public $telefono;
	public $codigo_postal;
	public $tipo;
	public $precio;


	function __construct($id, $direccion, $ciudad, $telefono, $codigo_postal, $tipo, $precio){
		$this->id = $id;
		$this->direccion = $direccion;
		$this->ciudad = $ciudad;
		$this->telefono = $telefono;
		$this->codigo_postal = $codigo_postal;
		$this->tipo = $tipo;
		$this->precio = $precio;

	}

}


 ?>
