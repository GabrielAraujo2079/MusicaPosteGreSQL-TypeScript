import { ProdutoraController } from './ProdutoraController';
import { BandaController } from './BandaController';
import { MusicaController } from './MusicaController';

export class ListagemController {
  private produtoraCtrl = new ProdutoraController();
  private bandaCtrl = new BandaController();
  private musicaCtrl = new MusicaController();

  async executarListagem(): Promise<void> {
    try {
      console.log('\n🎬 ===== TABELAS LISTADAS =====\n');

      console.log('🏢 Lista de Produtoras:');
      await this.produtoraCtrl.listar();

      console.log('\n🎸 Lista de Bandas:');
      await this.bandaCtrl.listar();

      console.log('\n🎵 Lista de Músicas:');
      await this.musicaCtrl.listar();

      console.log('\n================================');
    } catch (error) {
      console.error('❌ Erro ao listar tabelas:', error);
      throw error;
    }
  }
}
