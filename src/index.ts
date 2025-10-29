import readlineSync from 'readline-sync';
import { ProdutoraController } from './Controller/ProdutoraController';
import { BandaController } from './Controller/BandaController';
import { MusicaController } from './Controller/MusicaController';
import { pool } from './db';

// Funções do seu código (menus e exemploCompleto)
import { exibirMenu, menuProdutora, menuBanda, menuMusica, exemploCompleto } from './views';

async function main() {
  try {
    console.log('\n🎵 Bem-vindo ao Sistema de Gerenciamento Musical!\n');

    let opcao: string;

    do {
      exibirMenu();
      opcao = readlineSync.question('Escolha uma opção: ');

      switch (opcao) {
        case '1':
          await menuProdutora();
          break;
        case '2':
          await menuBanda();
          break;
        case '3':
          await menuMusica();
          break;
        case '4':
          await exemploCompleto();
          break;
        case '0':
          console.log('👋 Saindo do sistema...');
          break;
        default:
          console.log('❌ Opção inválida!');
      }

    } while (opcao !== '0');

  } catch (error) {
    console.error('❌ Erro na aplicação:', error);
  } finally {
    await pool.end();
    console.log('\n✅ Conexão com banco encerrada.');
  }
}

main();
