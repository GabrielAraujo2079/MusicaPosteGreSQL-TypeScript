import readlineSync from "readline-sync";
import { ProdutoraController } from "../Controller/ProdutoraController";

export async function menuProdutora() {
  const controller = new ProdutoraController();
  let opcao: string;

  do {
    console.log("\n🎬 === GERENCIAR PRODUTORAS ===");
    console.log("1 - Criar Produtora");
    console.log("2 - Listar Todas");
    console.log("3 - Buscar por ID");
    console.log("4 - Atualizar");
    console.log("5 - Deletar");
    console.log("0 - Voltar");

    opcao = readlineSync.question("Escolha uma opção: ");

    switch (opcao) {
      case "1": {
        const nome = readlineSync.question("Digite o nome da produtora: ");
        await controller.criar(nome);
        break;
      }
      case "2":
        await controller.listar();
        break;
      case "3": {
        const id = readlineSync.questionInt("Digite o ID da produtora: ");
        await controller.buscarPorId(id);
        break;
      }
      case "4": {
        const id = readlineSync.questionInt("ID da produtora para atualizar: ");
        const novoNome = readlineSync.question("Novo nome: ");
        await controller.atualizar(id, novoNome);
        break;
      }
      case "5": {
        const id = readlineSync.questionInt("ID da produtora para deletar: ");
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
