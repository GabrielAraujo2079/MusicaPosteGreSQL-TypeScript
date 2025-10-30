import { BandaService } from '../Service/BandaService';
import { Banda } from '../Models/Banda';

export class BandaController {
  private service: BandaService;

  constructor() {
    this.service = new BandaService();
  }

  async criar(nomeBanda: string, idProdutora: number): Promise<void> {
    try {
      if (!nomeBanda || !nomeBanda.toString().trim()) {
        console.error('❌ Nome da banda é obrigatório.');
        return;
      }
      if (!Number.isInteger(idProdutora) || idProdutora <= 0) {
        console.error('❌ idProdutora inválido. Deve ser um inteiro positivo.');
        return;
      }

      const banda: Banda = {
        nomebanda: nomeBanda.trim(),
        id_produtora: idProdutora,
      };

      const resultado = await this.service.createBanda(banda);
      console.log('✅ Banda criada com sucesso:', resultado);
    } catch (error) {
      console.error('❌ Erro ao criar banda:', error);
      throw error;
    }
  }

  async listar(): Promise<void> {
    try {
      const bandas = await this.service.getAllBandas();
      if (!Array.isArray(bandas) || bandas.length === 0) {
        console.log('— Nenhuma banda cadastrada —');
        return;
      }
      const formatado = bandas.map(b => ({
        Nome: b.nomebanda,
        Produtora: b.nomeprodutora
      }));
      console.table(formatado, ['Nome', 'Produtora']);
    } catch (error) {
      console.error('❌ Erro ao listar bandas:', error);
      throw error;
    }
  }

  async buscarPorId(id: number): Promise<void> {
    try {
      if (!Number.isInteger(id) || id <= 0) {
        console.error('❌ ID inválido. Deve ser um inteiro positivo.');
        return;
      }

      const banda = await this.service.getBandaById(id);
      if (!banda) {
        console.log('❌ Banda não encontrada');
        return;
      }

      console.log('\n🎸 Banda encontrada:');
      console.log(banda);

      try {
        const musicas = await this.service.getMusicasDaBanda(id);
        if (Array.isArray(musicas) && musicas.length > 0) {
          console.log('\n🎵 Músicas:');
          console.table(musicas);
        } else {
          console.log('— Nenhuma música cadastrada para esta banda —');
        }
      } catch (innerErr) {
        console.warn('⚠️ Não foi possível carregar músicas da banda:', innerErr);
      }
    } catch (error) {
      console.error('❌ Erro ao buscar banda:', error);
      throw error;
    }
  }

  async atualizar(id: number, nomeBanda: string, idProdutora: number): Promise<void> {
    try {
      if (!Number.isInteger(id) || id <= 0) {
        console.error('❌ ID inválido. Deve ser um inteiro positivo.');
        return;
      }
      if (!nomeBanda || !nomeBanda.toString().trim()) {
        console.error('❌ Nome da banda é obrigatório.');
        return;
      }
      if (!Number.isInteger(idProdutora) || idProdutora <= 0) {
        console.error('❌ idProdutora inválido. Deve ser um inteiro positivo.');
        return;
      }

      const banda: Banda = {
        nomebanda: nomeBanda.trim(),
        id_produtora: idProdutora,
      };

      const resultado = await this.service.updateBanda(id, banda);
      if (resultado) {
        console.log('✅ Banda atualizada com sucesso:', resultado);
      } else {
        console.log('❌ Não foi possível atualizar — banda não encontrada.');
      }
    } catch (error) {
      console.error('❌ Erro ao atualizar banda:', error);
      throw error;
    }
  }

  async deletar(id: number): Promise<void> {
    try {
      if (!Number.isInteger(id) || id <= 0) {
        console.error('❌ ID inválido. Deve ser um inteiro positivo.');
        return;
      }

      const sucesso = await this.service.deleteBanda(id);
      if (sucesso) {
        console.log('✅ Banda deletada com sucesso');
      } else {
        console.log('❌ Não foi possível deletar — banda não encontrada.');
      }
    } catch (error) {
      console.error('❌ Erro ao deletar banda:', error);
      throw error;
    }
  }
}