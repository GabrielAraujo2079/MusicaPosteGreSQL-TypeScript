# 🎵 Sistema de Gerenciamento Musical

Sistema CRUD completo em TypeScript com arquitetura MVC para gerenciar músicas, bandas e produtoras usando PostgreSQL.

## 📋 Estrutura do Projeto

```
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
```

## 🚀 Como Executar

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar o Banco de Dados

Certifique-se de que o PostgreSQL está rodando com as credenciais:
- **Usuário:** aluno
- **Senha:** aluno
- **Database:** musicas
- **Porta:** 5432

### 3. Criar as Tabelas

Execute o script SQL fornecido para criar o banco:

```sql
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
```

### 4. Compilar o TypeScript

```bash
npm run build
```

### 5. Executar o Projeto

**Modo desenvolvimento (com ts-node):**
```bash
npm run dev
```

**Modo produção:**
```bash
npm start
```

## 📚 Funcionalidades

### 🏢 Produtora
- ✅ Criar produtora
- ✅ Listar todas as produtoras
- ✅ Buscar produtora por ID
- ✅ Atualizar produtora
- ✅ Deletar produtora (protegido se houver bandas vinculadas)
- ✅ Listar bandas e músicas da produtora

### 🎸 Banda
- ✅ Criar banda (requer produtora existente)
- ✅ Listar todas as bandas
- ✅ Buscar banda por ID
- ✅ Atualizar banda
- ✅ Deletar banda
- ✅ Listar músicas da banda

### 🎵 Música
- ✅ Criar música
- ✅ Listar todas as músicas
- ✅ Buscar música por ID
- ✅ Atualizar música
- ✅ Deletar música
- ✅ Vincular música com banda
- ✅ Vincular música com produtora
- ✅ Listar bandas e produtoras da música

## 💡 Exemplos de Uso

### Exemplo Completo (src/index.ts)

```typescript
import { ProdutoraController } from './Controller/ProdutoraController';
import { BandaController } from './Controller/BandaController';
import { MusicaController } from './Controller/MusicaController';

async function exemploCompleto() {
  // Criar produtora
  const produtoraCtrl = new ProdutoraController();
  await produtoraCtrl.criar('Universal Music');
  
  // Criar banda
  const bandaCtrl = new BandaController();
  await bandaCtrl.criar('The Beatles', 1);
  
  // Criar música
  const musicaCtrl = new MusicaController();
  await musicaCtrl.criar('Hey Jude');
  
  // Vincular música com banda e produtora
  await musicaCtrl.vincularComBanda(1, 1);
  await musicaCtrl.vincularComProdutora(1, 1);
  
  // Buscar e exibir tudo
  await produtoraCtrl.buscarPorId(1);
  await bandaCtrl.buscarPorId(1);
  await musicaCtrl.buscarPorId(1);
}

exemploCompleto();
```

### Usar Controllers Individualmente

```typescript
// Criar e listar produtoras
const produtoraCtrl = new ProdutoraController();
await produtoraCtrl.criar('EMI Records');
await produtoraCtrl.listar();
await produtoraCtrl.buscarPorId(1);

// Criar e listar bandas
const bandaCtrl = new BandaController();
await bandaCtrl.criar('Queen', 1);
await bandaCtrl.listar();
await bandaCtrl.buscarPorId(1);

// Criar e listar músicas
const musicaCtrl = new MusicaController();
await musicaCtrl.criar('Bohemian Rhapsody');
await musicaCtrl.listar();
await musicaCtrl.buscarPorId(1);
```

## 🏗️ Arquitetura MVC

### Model (Models/)
Define as interfaces e tipos de dados:
- `Musica.ts` - Interface da música
- `Banda.ts` - Interface da banda
- `Produtora.ts` - Interface da produtora

### Repository (Repository/)
Acessa diretamente o banco de dados:
- Métodos CRUD básicos
- Queries SQL com prepared statements
- Relacionamentos entre tabelas

### Service (Service/)
Contém a lógica de negócio:
- Validações
- Regras de negócio
- Tratamento de erros
- Orquestração entre repositories

### Controller (Controller/)
Gerencia as requisições:
- Interface com o usuário
- Formatação de saída
- Chamadas aos services

## 🔒 Segurança

- ✅ Prepared statements para prevenir SQL Injection
- ✅ Validações de entrada
- ✅ Tratamento de erros
- ✅ Foreign keys com ON DELETE RESTRICT/CASCADE

## 📦 Dependências

```json
{
  "dependencies": {
    "pg": "^8.11.3"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "@types/pg": "^8.10.9",
    "ts-node": "^10.9.2",
    "typescript": "^5.3.3"
  }
}
```

## 🛠️ Scripts Disponíveis

- `npm run build` - Compila o TypeScript
- `npm start` - Executa o projeto compilado
- `npm run dev` - Executa em modo desenvolvimento
- `npm run watch` - Compila em modo watch
- `npm run clean` - Limpa a pasta dist

## 📝 Observações

- As músicas podem ter múltiplas bandas e produtoras
- Cada banda tem apenas uma produtora
- Não é possível deletar uma produtora se houver bandas vinculadas
- Todos os IDs são auto-incrementados (SERIAL)

## 🤝 Contribuições

Sinta-se à vontade para contribuir com melhorias!

---

Desenvolvido com ❤️ usando TypeScript + PostgreSQL