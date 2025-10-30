import readlineSync from "readline-sync";
import { ProdutoraController } from "./Controller/ProdutoraController";
import { BandaController } from "./Controller/BandaController";
import { MusicaController } from "./Controller/MusicaController";
import { ListagemController } from "./Controller/ListagemController";
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
  console.log('4️⃣  - Listagem Completa');
  console.log('0️⃣  - Sair\n');
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
        case "4": {
          const controller = new ListagemController();
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
  } catch (error) {
    console.error("❌ Erro na aplicação:", error);
  } finally {
    await pool.end();
    console.log("\n✅ Conexão com banco encerrada.");
  }
}

main();
