# 🎵 Sistema de Gerenciamento Musical

Sistema CRUD completo em **TypeScript + Express** com arquitetura **MVC** para gerenciar músicas, bandas e produtoras usando **PostgreSQL**.

👥 **INTEGRANTES:**

- GABRIEL ARAUJO SANTOS (2508678)  
- Paulo André Silva de Lima (2512630)  
- Paulo Vitor Macieira Carvalho (2508725)  
- Leonardo da Graça Moraes (2512238)

---

## Configuração do Ambiente

### Instalação do TypeScript + Dependências

Execute os comandos abaixo na pasta do projeto:

```bash
# Inicia o projeto Node
npm init -y

# Instala dependências principais
npm install express pg

# Instala dependências de desenvolvimento
npm install -D typescript ts-node-dev @types/node @types/express @types/pg


Criação da Estrutura Inicial
npx tsc --init
mkdir src


Ajuste o tsconfig.json (caso ainda não exista):


Sobre o Express

O Express é o framework usado para rodar o servidor HTTP da aplicação.
Com ele, é possível expor endpoints como /musicas, /bandas e /produtoras, permitindo integrar o backend com front-end ou ferramentas como Postman e Insomnia.


Estrutura do Projeto
  REPOSITORIO MUSICAS/
  ├── src/
  │   ├── Base/
  │   ├── Controller/
  │   │   ├── MusicaController.ts
  │   │   ├── BandaController.ts
  │   │   └── ProdutoraController.ts
  │   ├── Models/
  │   │   ├── Musica.ts
  │   │   ├── Banda.ts
  │   │   └── Produtora.ts
  │   ├── Repository/
  │   │   ├── MusicaRepository.ts
  │   │   ├── BandaRepository.ts
  │   │   └── ProdutoraRepository.ts
  │   ├── Service/
  │   │   ├── MusicaService.ts
  │   │   ├── BandaService.ts
  │   │   └── ProdutoraService.ts
  │   ├── db.ts
  │   └── index.ts
  ├── package.json
  ├── tsconfig.json
  └── README.md

Como Executar
  1. Instalar Dependências
  npm install

2. Configurar o Banco de Dados
  Certifique-se de que o PostgreSQL está rodando com as suas credenciais:
  Usuário: Seu usuario
  Senha: Sua senha
  Database: musicas
  Porta: Sua porta

3. Criar as Tabelas
  Execute o script SQL fornecido para criar o banco:
  CREATE DATABASE Musicas;

  CREATE TABLE Produtora (
      Id_Produtora SERIAL PRIMARY KEY,
      NomeProdutora VARCHAR(100) NOT NULL
  );

  CREATE TABLE Banda (
      Id_Banda SERIAL PRIMARY KEY,
      NomeBanda VARCHAR(100) NOT NULL,
      Id_Produtora INT NOT NULL,
      FOREIGN KEY (Id_Produtora) REFERENCES Produtora(Id_Produtora) ON DELETE RESTRICT
  );

  CREATE TABLE Musica (
      Id_Musica SERIAL PRIMARY KEY,
      NomeMusica VARCHAR(100) NOT NULL
  );

  CREATE TABLE Musica_Banda (
      Id_Musica INT NOT NULL,
      Id_Banda INT NOT NULL,
      PRIMARY KEY (Id_Musica, Id_Banda),
      FOREIGN KEY (Id_Musica) REFERENCES Musica(Id_Musica) ON DELETE CASCADE,
      FOREIGN KEY (Id_Banda) REFERENCES Banda(Id_Banda) ON DELETE CASCADE
  );

  CREATE TABLE Musica_Produtora (
      Id_Musica INT NOT NULL,
      Id_Produtora INT NOT NULL,
      PRIMARY KEY (Id_Musica, Id_Produtora),
      FOREIGN KEY (Id_Musica) REFERENCES Musica(Id_Musica) ON DELETE CASCADE,
      FOREIGN KEY (Id_Produtora) REFERENCES Produtora(Id_Produtora) ON DELETE CASCADE
  );

4. Compilar o TypeScript
  npm run build


5. Executar o Projeto
  Modo desenvolvimento (com ts-node):
  npm run dev
  Modo produção:
  npm start


Funcionalidades:

  Produtora
   -Criar produtora
   -Listar todas as produtoras
   -Buscar produtora por ID
   -Atualizar produtora
   -Deletar produtora (protegido se houver bandas vinculadas)
   -Listar bandas e músicas da produtora

  Banda

  -Criar banda (requer produtora existente)
  -Listar todas as bandas
  -Buscar banda por ID
  -Atualizar banda
  -Deletar banda
  -Listar músicas da banda

  Música

  -Criar música
  -Listar todas as músicas
  -Buscar música por ID
  -Atualizar música
  -Deletar música
  -Vincular música com banda
  -Vincular música com produtora
  -Listar bandas e produtoras da música


Arquitetura MVC
  Model (Models/)

  Define as interfaces e tipos de dados:
  Musica.ts - Interface da música
  Banda.ts - Interface da banda
  Produtora.ts - Interface da produtora
  Repository (Repository/)
  Acessa diretamente o banco de dados:
  Métodos CRUD básicos
  Queries SQL com prepared statements
  Relacionamentos entre tabelas
  Service (Service/)
  Contém a lógica de negócio:
  Validações
  Regras de negócio
  Tratamento de erros
  Orquestração entre repositories
  Controller (Controller/)
  Gerencia as requisições:
  Interface com o usuário
  Formatação de saída
Chamadas aos services


Dependências
  {
    "dependencies": {
      "express": "^4.19.0",
      "pg": "^8.11.3"
    },
    "devDependencies": {
      "@types/node": "^20.10.0",
      "@types/pg": "^8.10.9",
      "@types/express": "^4.17.21",
      "ts-node-dev": "^2.0.0",
      "typescript": "^5.3.3"
    }
  }


Scripts Disponíveis

  npm run build - Compila o TypeScript
  npm start - Executa o projeto compilado
  npm run dev - Executa em modo desenvolvimento
  npm run watch - Compila em modo watch
  npm run clean - Limpa a pasta dist

  Observações
  As músicas podem ter múltiplas bandas e produtoras
  Cada banda tem apenas uma produtora
  Não é possível deletar uma produtora se houver bandas vinculadas
  Todos os IDs são auto-incrementados (SERIAL)
