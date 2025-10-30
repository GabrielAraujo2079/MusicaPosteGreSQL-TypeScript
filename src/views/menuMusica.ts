import readlineSync from 'readline-sync';
import { MusicaController } from '../Controller/MusicaController';

export async function menuMusica() {
  const controller = new MusicaController();
  let opcao: string;

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

    opcao = readlineSync.question('Escolha uma opção: ');

    switch (opcao) {
      case '1': {
        const nome = readlineSync.question('Digite o nome da música: ');
        const idBanda = readlineSync.questionInt('Digite o ID da banda: ');
        const idProdutora = readlineSync.questionInt('Digite o ID da produtora: ');
        await controller.criar(nome, idBanda, idProdutora);
        break;
      }
      case '2':
        await controller.listar();
        break;
      case '3': {
        const id = readlineSync.questionInt('Digite o ID da música: ');
        await controller.buscarPorId(id);
        break;
      }
      case '4': {
        const id = readlineSync.questionInt('ID da música para atualizar: ');
        const novoNome = readlineSync.question('Novo nome: ');
        await controller.atualizar(id, novoNome);
        break;
      }
      case '5': {
        const id = readlineSync.questionInt('ID da música para deletar: ');
        await controller.deletar(id);
        break;
      }
      case '6': {
        const idMusica = readlineSync.questionInt('ID da música: ');
        const idBanda = readlineSync.questionInt('ID da banda: ');
        await controller.vincularComBanda(idMusica, idBanda);
        break;
      }
      case '7': {
        const idMusica = readlineSync.questionInt('ID da música: ');
        const idProdutora = readlineSync.questionInt('ID da produtora: ');
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