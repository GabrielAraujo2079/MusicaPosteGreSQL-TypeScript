import readlineSync from 'readline-sync';
import { BandaController } from '../Controller/BandaController';

export async function menuBanda() {
  const controller = new BandaController();
  let opcao: string;

  do {
    console.log('\n🎸 === GERENCIAR BANDAS ===');
    console.log('1 - Criar Banda');
    console.log('2 - Listar Todas');
    console.log('3 - Buscar por ID');
    console.log('4 - Atualizar');
    console.log('5 - Deletar');
    console.log('0 - Voltar');

    opcao = readlineSync.question('Escolha uma opção: ');

    switch (opcao) {
      case '1': {
        const nome = readlineSync.question('Digite o nome da banda: ');
        const idProdutora = readlineSync.questionInt('Digite o ID da produtora: ');
        await controller.criar(nome, idProdutora);
        break;
      }
      case '2':
        await controller.listar();
        break;
      case '3': {
        const id = readlineSync.questionInt('Digite o ID da banda: ');
        await controller.buscarPorId(id);
        break;
      }
      case '4': {
        const id = readlineSync.questionInt('ID da banda para atualizar: ');
        const novoNome = readlineSync.question('Novo nome: ');
        const novaProdutora = readlineSync.questionInt('Novo ID de produtora: ');
        await controller.atualizar(id, novoNome, novaProdutora);
        break;
      }
      case '5': {
        const id = readlineSync.questionInt('ID da banda para deletar: ');
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
