<?php
class Contato
{

    private $conn;
    private $tabela = "Contatos";

    public $id;
    public $nome;
    public $nascimento;
    public $sexo;
    public $alteracao;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    public function read()
    {
        $sql = "select * from " . $this->tabela;
        $cmd = $this->conn->prepare($sql);
        $cmd->execute();
        return $cmd;
    }

    public function create()
    {
        $sql = "insert into " . $this->tabela . "(nome, nascimento, sexo, alteracao) values (:nome, :nasc, :sexo, :alt)";
        $cmd = $this->conn->prepare($sql);
        $this->nome = htmlspecialchars(strip_tags($this->nome));
        $this->nascimento = htmlspecialchars(strip_tags($this->nascimento));
        $this->sexo = htmlspecialchars(strip_tags($this->sexo));
        $this->alteracao = htmlspecialchars(strip_tags($this->alteracao));
        $cmd->bindParam(":nome", $this->nome);
        $cmd->bindParam(":nasc", $this->nascimento);
        $cmd->bindParam(":sexo", $this->sexo);
        $cmd->bindParam(":alt", $this->alteracao);
        $cmd->execute();
        return true;
    }
}
