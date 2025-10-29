"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_sync_1 = __importDefault(require("readline-sync"));
const ProdutoraController_1 = require("./Controller/ProdutoraController");
const BandaController_1 = require("./Controller/BandaController");
const MusicaController_1 = require("./Controller/MusicaController");
const db_1 = require("./db");
// Importar menus diretamente da pasta views (estão fora de src)
const menuProdutora_1 = require("./views/menuProdutora");
const menuBanda_1 = require("./views/menuBanda");
const menuMusica_1 = require("./views/menuMusica");
// Função que exibe o menu principal
function exibirMenu() {
    console.log('\n╔══════════════════════════════════════╗');
    console.log('║   SISTEMA DE GERENCIAMENTO MUSICAL   ║');
    console.log('╚══════════════════════════════════════╝');
    console.log('\n1️⃣  - Gerenciar Produtoras');
    console.log('2️⃣  - Gerenciar Bandas');
    console.log('3️⃣  - Gerenciar Músicas');
    console.log('4️⃣  - Exemplo Completo');
    console.log('0️⃣  - Sair\n');
}
// Exemplo completo (executa uma sequência de operações para demonstração)
async function exemploCompleto() {
    console.log('\n╔═══════════════════════════════════════╗');
    console.log('║        EXECUTANDO EXEMPLO COMPLETO        ║');
    console.log('╚═══════════════════════════════════════╝\n');
    try {
        // 1. Criar Produtora
        console.log('📍 PASSO 1: Criando Produtora...');
        const produtoraCtrl = new ProdutoraController_1.ProdutoraController();
        await produtoraCtrl.criar('Universal Music Group');
        // 2. Criar Banda
        console.log('\n📍 PASSO 2: Criando Banda...');
        const bandaCtrl = new BandaController_1.BandaController();
        await bandaCtrl.criar('The Beatles', 1);
        // 3. Criar Música
        console.log('\n📍 PASSO 3: Criando Música...');
        const musicaCtrl = new MusicaController_1.MusicaController();
        await musicaCtrl.criar('Hey Jude');
        // 4. Vincular Música com Banda e Produtora
        console.log('\n📍 PASSO 4: Vinculando Música com Banda e Produtora...');
        await musicaCtrl.vincularComBanda(1, 1);
        await musicaCtrl.vincularComProdutora(1, 1);
        // 5. Exibir resultados
        console.log('\n\n╔═══════════════════════════════════════╗');
        console.log('║            RESULTADOS FINAIS              ║');
        console.log('╚═══════════════════════════════════════╝');
        console.log('\n🏢 PRODUTORA COMPLETA:');
        await produtoraCtrl.buscarPorId(1);
        console.log('\n\n🎸 BANDA COMPLETA:');
        await bandaCtrl.buscarPorId(1);
        console.log('\n\n🎵 MÚSICA COMPLETA:');
        await musicaCtrl.buscarPorId(1);
        console.log('\n\n✅ Exemplo completo executado com sucesso!');
    }
    catch (error) {
        console.error('\n❌ Erro ao executar exemplo:', error);
    }
}
async function main() {
    try {
        console.log("\n🎵 Bem-vindo ao Sistema de Gerenciamento Musical!\n");
        let opcao;
        do {
            exibirMenu();
            opcao = readline_sync_1.default.question("Escolha uma opção: ");
            switch (opcao) {
                case "1":
                    await (0, menuProdutora_1.menuProdutora)();
                    break;
                case "2":
                    await (0, menuBanda_1.menuBanda)();
                    break;
                case "3":
                    await (0, menuMusica_1.menuMusica)();
                    break;
                case "4":
                    await exemploCompleto();
                    break;
                case "0":
                    console.log("👋 Saindo do sistema...");
                    break;
                default:
                    console.log("❌ Opção inválida!");
            }
        } while (opcao !== "0");
    }
    catch (error) {
        console.error("❌ Erro na aplicação:", error);
    }
    finally {
        await db_1.pool.end();
        console.log("\n✅ Conexão com banco encerrada.");
    }
}
main();
