import readlineSync from 'readline-sync';

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

// BandaController module
export class BandaController {
  async criar(nome: string, idProdutora: number): Promise<void> {
    // implementação stub — substitua por lógica real
    console.log(`Criando banda: ${nome} (produtora ${idProdutora})`);
  }

  async listar(): Promise<void> {
    // implementação stub — substitua por lógica real
    console.log('Listando todas as bandas (stub).');
  }

  async buscarPorId(id: number): Promise<void> {
    // implementação stub — substitua por lógica real
    console.log(`Buscando banda com ID ${id} (stub).`);
  }

  async atualizar(id: number, novoNome: string, novaProdutora: number): Promise<void> {
    // implementação stub — substitua por lógica real
    console.log(`Atualizando banda ${id} para nome ${novoNome} e produtora ${novaProdutora} (stub).`);
  }

  async deletar(id: number): Promise<void> {
    // implementação stub — substitua por lógica real
    console.log(`Deletando banda com ID ${id} (stub).`);
  }
}