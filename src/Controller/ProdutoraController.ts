import { ProdutoraService } from '../Service/ProdutoraService';
import { Produtora } from '../Models/Produtora';

export class ProdutoraController {
  private service: ProdutoraService;

  constructor() {
    this.service = new ProdutoraService();
  }

  async criar(nomeProdutora: string): Promise<void> {
    try {
      const produtora: Produtora = { nomeprodutora: nomeProdutora };
      const resultado = await this.service.createProdutora(produtora);
      console.log('✅ Produtora criada com sucesso:', resultado);
    } catch (error) {
      console.error('❌ Erro ao criar produtora:', error);
      throw error;
    }
  }

  async listar(): Promise<void> {
    try {
      const produtoras = await this.service.getAllProdutoras();
      if (!produtoras || produtoras.length === 0) {
        console.log('— Nenhuma produtora cadastrada —');
        return;
      }
      const formatado = produtoras.map(p => ({
        ID: p.id_produtora,
        Nome: p.nomeprodutora
      }));
      console.table(formatado, ['ID', 'Nome']);
    } catch (error) {
      console.error('❌ Erro ao listar produtoras:', error);
      throw error;
    }
  }

  async buscarPorId(id: number): Promise<void> {
    try {
      const produtora = await this.service.getProdutoraById(id);
      if (produtora) {
        console.log('\n🏢 Produtora encontrada:');
        console.log(produtora);
        
        const bandas = await this.service.getBandasDaProdutora(id);
        if (bandas.length > 0) {
          console.log('\n🎸 Bandas:');
          console.table(bandas);
        }
        
        const musicas = await this.service.getMusicasDaProdutora(id);
        if (musicas.length > 0) {
          console.log('\n🎵 Músicas:');
          console.table(musicas);
        }
      } else {
        console.log('❌ Produtora não encontrada');
      }
    } catch (error) {
      console.error('❌ Erro ao buscar produtora:', error);
      throw error;
    }
  }

  async atualizar(id: number, nomeProdutora: string): Promise<void> {
    try {
      const produtora: Produtora = { nomeprodutora: nomeProdutora };
      const resultado = await this.service.updateProdutora(id, produtora);
      console.log('✅ Produtora atualizada com sucesso:', resultado);
    } catch (error) {
      console.error('❌ Erro ao atualizar produtora:', error);
      throw error;
    }
  }

  async deletar(id: number): Promise<void> {
    try {
      const sucesso = await this.service.deleteProdutora(id);
      if (sucesso) {
        console.log('✅ Produtora deletada com sucesso');
      }
    } catch (error) {
      console.error('❌ Erro ao deletar produtora:', error);
      throw error;
    }
  }
}