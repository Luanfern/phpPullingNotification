<?php

header('Content-Type: application/json');
$nome_arquivo = 'teste.txt';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $id = isset($_POST['id']) ? $_POST['id'] : '';
    if(!isset($_POST['exc'])){
        $arquivo = fopen($nome_arquivo, 'w');
        $novo_conteudo = $id; // Adiciona uma quebra de linha
        // Abre o arquivo no modo de escrita e leitura
        $arquivo = fopen($nome_arquivo, 'a+');
        // Adiciona o novo conteúdo ao final do arquivo
        fwrite($arquivo, $novo_conteudo);
        // Fecha o arquivo
        fclose($arquivo);
    } else {
        // Tenta excluir o arquivo existente
        if (file_exists($nome_arquivo) && unlink($nome_arquivo)) {
            echo "Arquivo existente $nome_arquivo deletado com sucesso.\n";
            echo json_encode(['rt' =>"Arquivo existente $nome_arquivo deletado com sucesso.\n"]);
        } elseif (!file_exists($nome_arquivo)) {
            echo "O arquivo $nome_arquivo não existe.\n";
            echo json_encode(['rt' =>"O arquivo $nome_arquivo não existe.\n"]);
        } else {
            die("Não foi possível excluir o arquivo $nome_arquivo.\n");
            echo json_encode(['rt' => "Não foi possível excluir o arquivo $nome_arquivo.\n"]);
        }
    }

} else {
    $nome_arquivo = 'teste.txt';
if (file_exists($nome_arquivo) && filesize($nome_arquivo) > 0) {
    $conteudo = file_get_contents($nome_arquivo);
    echo json_encode(['notificacao' => array("1" => $conteudo)]);
} else {
    echo json_encode(['erro' => "SEM SINIStroS"]);
}
}