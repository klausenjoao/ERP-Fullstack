<h1 align="center">ERP-Fulltach: AlmoxSoft</h1>

<p align="center">
Este projeto foi desenvolvido para aplicar e aprimorar os conhecimentos adquiridos durante minhas férias da faculdade. Baseando-me em um projeto anterior de gerenciador escolar, implementei melhorias significativas para criar um ERP para almoxarifado.<br/>
</p>

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-GetStarted">Get Started</a>
</p>

<p align="center">
  <img alt="License" src="https://github.com/user-attachments/assets/932f2fc1-b4a7-4a5e-8863-e3ff9580fcfa"/>
</p>

<br>

## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- Node.js/ Express – Configuração das rotas e estruturação do backend.
- Insomnia - Testes das rotas.
- JavaScript (Front-end) – Interface dinâmica para interação do usuário.
- Firebase Authentication – Registro de usuários e reforço da segurança da página, impedindo acesso não autorizado às áreas internas do sistema.
- Docker(Mysql) - Armazenamento das informações obtidas pelo front-end.
  
## 💻 Projeto

O projeto traz consigo uma solução para a gestão de estoque, permitindo a criação de entradas e saídas de produtos, além do cadastro de usuários no sistema. Na home, o sistema exibe alguns indicadores que mostram a quantidade de usuários, produtos e movimentações realizadas.

Além das funcionalidades, o sistema conta com uma interface simples, porém intuitiva, desenvolvida para uso em desktops.

<p align="center">
  <img alt="License" src="https://github.com/user-attachments/assets/910a8a78-5ffe-4d0f-8f1e-536191021a6e">
  <img alt= "License" src="https://github.com/user-attachments/assets/6caf190f-a41b-42d9-a001-9a67536e99ca">
  <img alt= "License" src="https://github.com/user-attachments/assets/0c389f33-3044-4e10-a373-1b59e0a5e57a">
</p>

## Get Started


```bash
#Command to clone the repository

$ git clone https://github.com/klausenjoao/ERP-Fullstack
```

### Após clonar o repositório, é necessário criar o banco de dados MySQL junto com as colunas necessárias.

```bash
#Comando para criar o banco de dados no terminal MySQL:

$ CREATE DATABASE database_name;
```

```bash
#Comandos para criar as tabelas no banco de dados:

-- Criação da tabela usuarios
$ CREATE TABLE `usuarios` (
    `usu_id` INT NOT NULL AUTO_INCREMENT,
    `usu_nome` VARCHAR(100) NOT NULL,
    `usu_login` VARCHAR(100) NOT NULL,
    `usu_senha` VARCHAR(255) NOT NULL,
    `usu_datahoracadastro` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    `usu_ativo` TINYINT(1) DEFAULT NULL,
    PRIMARY KEY (`usu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Criação da tabela produtos
$ CREATE TABLE `produtos` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(45) DEFAULT NULL,
    `descricao` VARCHAR(45) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Criação da tabela movimentacaoAlmoxarifado (sem chave estrangeira ainda)
$ CREATE TABLE `movimentacaoAlmoxarifado` (
    `mov_id` INT NOT NULL AUTO_INCREMENT,
    `mov_data` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    `mov_tipo` VARCHAR(10) NOT NULL,
    `mov_quantidade` INT DEFAULT NULL,
    `mov_usu_id` INT DEFAULT NULL,
    `mov_observacao` TEXT,
    `mov_valortotal` INT DEFAULT NULL,
    PRIMARY KEY (`mov_id`),
    CHECK (`mov_tipo` IN ('Entrada', 'Saída'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Criação da tabela movimentacao_item
$ CREATE TABLE `movimentacao_item` (
    `moi_id` INT NOT NULL AUTO_INCREMENT,
    `moi_mov_id` INT NOT NULL,
    `moi_prod_id` INT NOT NULL,
    PRIMARY KEY (`moi_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

```


### Na raiz do projeto existe um arquivo chamado ".env.example" este arquivo contém 5 campos que deverão ser preenchidos em um arquivo chamado ".env", basta criar este arquivo ou renomear o arquivo de exemplo. Depois disso, preencher os campos com os dados referentes ao seu banco de dados.

```bash
PORT= [Port the server will run on]
MYSQL_HOST= [The host of your machine, by default is 'localhost']
MYSQL_USER= [Your username, by default MySQL uses the 'root' user]
MYSQL_PASSWORD= [The password you chose when installing MySQL]
MYSQL_DB= [The name of the database created earlier.]
```

### Antes de iniciar a aplicação, precisamos instalar o 'node_modules' e para isso abrimos um terminal na pasta "backend".

```bash
#Command to download the 'node_modules'

$ npm install
```

### Por fim, executar o comando para iniciar o servidor (ainda dentro da pasta “backend”) e abrir o arquivo “index.html”.

```bash
#Command to start the server.

$ npm start
```


