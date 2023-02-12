# TASKS

Tasks é um projeto CRUD de tarefas, com importação de arquivo CSV, feito em sua maioria de bibliotecas nativas do NodeJS.

O intuíto desse projeto é aplicar os conhecimentos adquiridos de fundamentos básico de NodeJS ministrados no bootcamp Ignite NodeJS 2022 pela Rocketseat.

Nesse projeto utilizaremos um arquivo json para simular o comportamento de um banco de dados, onde criaremos todos os métodos para listagem, criação, modificação e remoção de tarefas.

Será implementado um servidor somente com a biblioteca nativa HTTP do NodeJS, onde será feito todo tratamento de entrada de dados, transformação dos dado para o formato JSON,

## TECNOLOGIAS

- Node.js 18

  - http
  - fs
  - crypto
  - Buffers
  - RegEx

- csv-parse

## INSTALNDO O SERVIDOR

Fazer o clone do projeto na sua máquina local

```cmd
# Acessar a pasta do projeto
cd task-ignite-node-2022
```

```cmd
# instalar as dependências do projeto
npm install
```

## RODANDO O SERVIDOR

```cmd
# subindo um servidor
npm run dev
```

## TESTANDO AS ROTAS DA APLICAÇÃO

### Buscando todas as tarefas

```cmd
curl -H "Content-Type: application/json" -X GET  http://localhost:3333/tasks
```

### Buscando uma tarefa pelo id

```cmd
curl -H "Content-Type: application/json" -X GET  http://localhost:3333/tasks/id_da_tarefa
```

### Criando uma tarefa

```cmd
curl -H "Content-Type: application/json" -X POST -d '{"title":"Um títlulo", "description": "Uma descrição"}' http://localhost:3333/tasks
```

### Editando uma tarefa

```cmd
curl -H "Content-Type: application/json" -X PUT -d '{"title":"Novo título"}' http://localhost:3333/tasks/id_da_tarefa
```

### Marcando a tarefa como concluída

```cmd
curl -H "Content-Type: application/json" -X PATCH http://localhost:3333/tasks/id_da_tarefa
```

### Removendo uma tarefa

```cmd
curl -H "Content-Type: application/json" -X DELETE http://localhost:3333/tasks/id_da_tarefa
```

## IMPORTAÇÃO DE DADOS DE ARQUIVO CSV

### Regras para popular o arquivo csv

- Adiciona ou altere um arquivo com o nome tasks.csv na pasta import-csv.

- A formatação do arquivo tasks.csv deve obrigatóriamente ser uma linha por registro contendo um titulo seguido por uma descrição separados por uma virgula.

- A primeira linha do registro deve ser conter obrigatóriamente os títulos das colunas (título,descrição).

- Não colocar virgula no final da linha, e os textos não devem conter virgulas.

### Importando os dados do arquivo csv para o banco de dados

Com o arquivo dentro da pasta import-csv, basta rodar o comando abaixo no terminal

```
npm run import-csv
```

## MELHORIAS

- Testes
- Fazer função para validação dos dados de entrada
