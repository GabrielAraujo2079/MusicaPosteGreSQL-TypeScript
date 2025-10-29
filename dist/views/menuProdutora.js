"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuProdutora = menuProdutora;
const readline_sync_1 = __importDefault(require("readline-sync"));
const ProdutoraController_1 = require("../Controller/ProdutoraController");
async function menuProdutora() {
    const controller = new ProdutoraController_1.ProdutoraController();
    let opcao;
    do {
        console.log("\n🎬 === GERENCIAR PRODUTORAS ===");
        console.log("1 - Criar Produtora");
        console.log("2 - Listar Todas");
        console.log("3 - Buscar por ID");
        console.log("4 - Atualizar");
        console.log("5 - Deletar");
        console.log("0 - Voltar");
        opcao = readline_sync_1.default.question("Escolha uma opção: ");
        switch (opcao) {
            case "1": {
                const nome = readline_sync_1.default.question("Digite o nome da produtora: ");
                await controller.criar(nome);
                break;
            }
            case "2":
                await controller.listar();
                break;
            case "3": {
                const id = readline_sync_1.default.questionInt("Digite o ID da produtora: ");
                await controller.buscarPorId(id);
                break;
            }
            case "4": {
                const id = readline_sync_1.default.questionInt("ID da produtora para atualizar: ");
                const novoNome = readline_sync_1.default.question("Novo nome: ");
                await controller.atualizar(id, novoNome);
                break;
            }
            case "5": {
                const id = readline_sync_1.default.questionInt("ID da produtora para deletar: ");
                await controller.deletar(id);
                break;
            }
            case "0":
                console.log("🔙 Voltando ao menu principal...");
                break;
            default:
                console.log("❌ Opção inválida!");
        }
    } while (opcao !== "0");
}
