import { ProdutoraRepository } from '../Repository/ProdutoraRepository';
import { Produtora } from '../Models/Produtora';

export class ProdutoraService {
  private repository: ProdutoraRepository;

  constructor() {
    this.repository = new ProdutoraRepository();
  }

  async createProdutora(produtora: Produtora): Promise<Produtora> {
    if (!produtora.nomeprodutora || produtora.nomeprodutora.trim() === '') {
      throw new Error('Nome da produtora é obrigatório');
    }
    return await this.repository.create(produtora);
  }

  async getAllProdutoras(): Promise<Produtora[]> {
    return await this.repository.findAll();
  }

  async getProdutoraById(id: number): Promise<Produtora | null> {
    return await this.repository.findById(id);
  }

  async updateProdutora(id: number, produtora: Produtora): Promise<Produtora | null> {
    const exists = await this.repository.findById(id);
    if (!exists) {
      throw new Error('Produtora não encontrada');
    }
    return await this.repository.update(id, produtora);
  }

  async deleteProdutora(id: number): Promise<boolean> {
    const exists = await this.repository.findById(id);
    if (!exists) {
      throw new Error('Produtora não encontrada');
    }
    return await this.repository.delete(id);
  }

  async getBandasDaProdutora(id: number): Promise<any[]> {
    return await this.repository.getBandasByProdutora(id);
  }

  async getMusicasDaProdutora(id: number): Promise<any[]> {
    return await this.repository.getMusicasByProdutora(id);
  }
}