<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once "../classes/database.php";
include_once "../classes/contato.php";

$db = new Database();
$conn = $db->getConnection();

$contato = new Contato($conn);

$contato->nome = $_POST["nome"];
$contato->nascimento = $_POST["nascimento"];
$contato->sexo = $_POST["sexo"];
$contato->alteracao = date("Y-m-d");

$contato->create();
