import readlineSync from "readline-sync";
import { ProdutoraController } from "./Controller/ProdutoraController";
import { BandaController } from "./Controller/BandaController";
import { MusicaController } from "./Controller/MusicaController";
import { pool } from "./db";

// Importar menus diretamente da pasta views (estão fora de src)
import { menuProdutora } from "./views/menuProdutora";
import { menuBanda } from "./views/menuBanda";
import { menuMusica } from "./views/menuMusica";

// Função que exibe o menu principal
function exibirMenu(): void {
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
async function exemploCompleto(): Promise<void> {
  console.log('\n╔═══════════════════════════════════════╗');
  console.log('║        EXECUTANDO EXEMPLO COMPLETO        ║');
  console.log('╚═══════════════════════════════════════╝\n');
  try {
    // 1. Criar Produtora
    console.log('📍 PASSO 1: Criando Produtora...');
    const produtoraCtrl = new ProdutoraController();
    await produtoraCtrl.criar('Universal Music Group');

    // 2. Criar Banda
    console.log('\n📍 PASSO 2: Criando Banda...');
    const bandaCtrl = new BandaController();
    await bandaCtrl.criar('The Beatles', 1);

    // 3. Criar Música
    console.log('\n📍 PASSO 3: Criando Música...');
    const musicaCtrl = new MusicaController();
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
  } catch (error) {
    console.error('\n❌ Erro ao executar exemplo:', error);
  }
}

async function main() {
  try {
    console.log("\n🎵 Bem-vindo ao Sistema de Gerenciamento Musical!\n");

    let opcao: string;

    do {
      exibirMenu();
      opcao = readlineSync.question("Escolha uma opção: ");

      switch (opcao) {
        case "1":
          await menuProdutora();
          break;
        case "2":
          await menuBanda();
          break;
        case "3":
          await menuMusica();
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
  } catch (error) {
    console.error("❌ Erro na aplicação:", error);
  } finally {
    await pool.end();
    console.log("\n✅ Conexão com banco encerrada.");
  }
}

main();
