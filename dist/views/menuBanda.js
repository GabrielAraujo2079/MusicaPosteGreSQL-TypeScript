"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuBanda = menuBanda;
const readline_sync_1 = __importDefault(require("readline-sync"));
const BandaController_1 = require("../Controller/BandaController");
async function menuBanda() {
    const controller = new BandaController_1.BandaController();
    let opcao;
    do {
        console.log('\n🎸 === GERENCIAR BANDAS ===');
        console.log('1 - Criar Banda');
        console.log('2 - Listar Todas');
        console.log('3 - Buscar por ID');
        console.log('4 - Atualizar');
        console.log('5 - Deletar');
        console.log('0 - Voltar');
        opcao = readline_sync_1.default.question('Escolha uma opção: ');
        switch (opcao) {
            case '1': {
                const nome = readline_sync_1.default.question('Digite o nome da banda: ');
                const idProdutora = readline_sync_1.default.questionInt('Digite o ID da produtora: ');
                await controller.criar(nome, idProdutora);
                break;
            }
            case '2':
                await controller.listar();
                break;
            case '3': {
                const id = readline_sync_1.default.questionInt('Digite o ID da banda: ');
                await controller.buscarPorId(id);
                break;
            }
            case '4': {
                const id = readline_sync_1.default.questionInt('ID da banda para atualizar: ');
                const novoNome = readline_sync_1.default.question('Novo nome: ');
                const novaProdutora = readline_sync_1.default.questionInt('Novo ID de produtora: ');
                await controller.atualizar(id, novoNome, novaProdutora);
                break;
            }
            case '5': {
                const id = readline_sync_1.default.questionInt('ID da banda para deletar: ');
                await controller.deletar(id);
                break;
            }
            case '0':
                console.log('🔙 Voltando ao menu principal...');
                break;
            default:
                console.log('❌ Opção inválida!');
        }
    } while (opcao !== '0');
}
