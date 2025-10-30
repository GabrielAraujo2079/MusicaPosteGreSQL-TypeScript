"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_sync_1 = __importDefault(require("readline-sync"));
const ListagemController_1 = require("./Controller/ListagemController");
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
    console.log('4️⃣  - Listagem Completa');
    console.log('0️⃣  - Sair\n');
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
                case "4": {
                    const controller = new ListagemController_1.ListagemController();
                    await controller.executarListagem();
                    break;
                }
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
