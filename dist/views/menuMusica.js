"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuMusica = menuMusica;
const readline_sync_1 = __importDefault(require("readline-sync"));
const MusicaController_1 = require("../Controller/MusicaController");
async function menuMusica() {
    const controller = new MusicaController_1.MusicaController();
    let opcao;
    do {
        console.log('\n🎵 === GERENCIAR MÚSICAS ===');
        console.log('1 - Criar Música');
        console.log('2 - Listar Todas');
        console.log('3 - Buscar por ID');
        console.log('4 - Atualizar');
        console.log('5 - Deletar');
        console.log('6 - Vincular com Banda');
        console.log('7 - Vincular com Produtora');
        console.log('0 - Voltar');
        opcao = readline_sync_1.default.question('Escolha uma opção: ');
        switch (opcao) {
            case '1': {
                const nome = readline_sync_1.default.question('Digite o nome da música: ');
                const idBanda = readline_sync_1.default.questionInt('Digite o ID da banda: ');
                const idProdutora = readline_sync_1.default.questionInt('Digite o ID da produtora: ');
                await controller.criar(nome, idBanda, idProdutora);
                break;
            }
            case '2':
                await controller.listar();
                break;
            case '3': {
                const id = readline_sync_1.default.questionInt('Digite o ID da música: ');
                await controller.buscarPorId(id);
                break;
            }
            case '4': {
                const id = readline_sync_1.default.questionInt('ID da música para atualizar: ');
                const novoNome = readline_sync_1.default.question('Novo nome: ');
                await controller.atualizar(id, novoNome);
                break;
            }
            case '5': {
                const id = readline_sync_1.default.questionInt('ID da música para deletar: ');
                await controller.deletar(id);
                break;
            }
            case '6': {
                const idMusica = readline_sync_1.default.questionInt('ID da música: ');
                const idBanda = readline_sync_1.default.questionInt('ID da banda: ');
                await controller.vincularComBanda(idMusica, idBanda);
                break;
            }
            case '7': {
                const idMusica = readline_sync_1.default.questionInt('ID da música: ');
                const idProdutora = readline_sync_1.default.questionInt('ID da produtora: ');
                await controller.vincularComProdutora(idMusica, idProdutora);
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
