<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once "../classes/database.php";
include_once "../classes/contato.php";

$db = new Database();
$conn = $db->getConnection();

$contato = new Contato($conn);

$contatos = $contato->read();

$response = array();

if ($contatos->rowCount() > 0) {
    while ($row = $contatos->fetch()) {
        $c = array(
            "Id" => $row["Id"],
            "Nome" => $row["Nome"],
            "Nascimento" => $row["Nascimento"],
            "Sexo" => $row["Sexo"],
            "Alteracao" => $row["Alteracao"]
        );
        array_push($response, $c);
    }
}
http_response_code(200);
echo json_encode($response);
