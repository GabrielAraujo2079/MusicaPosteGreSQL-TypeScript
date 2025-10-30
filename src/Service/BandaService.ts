import { BandaRepository } from '../Repository/BandaRepository';
import { Banda, BandaCompleta } from '../Models/Banda';

export class BandaService {
  private repository: BandaRepository;

  constructor() {
    this.repository = new BandaRepository();
  }

  async createBanda(banda: Banda): Promise<Banda> {
    if (!banda.nomebanda || banda.nomebanda.trim() === '') {
      throw new Error('Nome da banda é obrigatório');
    }

    if (!banda.id_produtora) {
      throw new Error('ID da produtora é obrigatório');
    }

    const produtoraExiste = await this.repository.verificaProdutoraExiste(banda.id_produtora);
    if (!produtoraExiste) {
      throw new Error('Produtora não encontrada');
    }

    return await this.repository.create(banda);
  }

  async getAllBandas(): Promise<BandaCompleta[]> {
    return await this.repository.findAll();
  }

  async getBandaById(id: number): Promise<BandaCompleta | null> {
    return await this.repository.findById(id);
  }

  async updateBanda(id: number, banda: Banda): Promise<Banda | null> {
    const exists = await this.repository.findById(id);
    if (!exists) {
      throw new Error('Banda não encontrada');
    }

    const produtoraExiste = await this.repository.verificaProdutoraExiste(banda.id_produtora);
    if (!produtoraExiste) {
      throw new Error('Produtora não encontrada');
    }

    return await this.repository.update(id, banda);
  }

  async deleteBanda(id: number): Promise<boolean> {
    const exists = await this.repository.findById(id);
    if (!exists) {
      throw new Error('Banda não encontrada');
    }
    return await this.repository.delete(id);
  }

  async getMusicasDaBanda(id: number): Promise<any[]> {
    return await this.repository.getMusicasByBanda(id);
  }
}