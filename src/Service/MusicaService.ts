import { MusicaRepository } from '../Repository/MusicaRepository';
import { Musica, MusicaBanda, MusicaProdutora } from '../Models/Musica';

export class MusicaService {
  private repository: MusicaRepository;

  constructor() {
    this.repository = new MusicaRepository();
  }

  async createMusica(musica: Musica): Promise<Musica> {
    if (!musica.nomemusica || musica.nomemusica.trim() === '') {
      throw new Error('Nome da música é obrigatório');
    }
    return await this.repository.create(musica);
  }

  async getAllMusicas(): Promise<Musica[]> {
    return await this.repository.findAll();
  }

  async getMusicaById(id: number): Promise<Musica | null> {
    return await this.repository.findById(id);
  }

  async updateMusica(id: number, musica: Musica): Promise<Musica | null> {
    const exists = await this.repository.findById(id);
    if (!exists) {
      throw new Error('Música não encontrada');
    }
    return await this.repository.update(id, musica);
  }

  async deleteMusica(id: number): Promise<boolean> {
    const exists = await this.repository.findById(id);
    if (!exists) {
      throw new Error('Música não encontrada');
    }
    return await this.repository.delete(id);
  }

  async vincularBanda(musicaBanda: MusicaBanda): Promise<void> {
    await this.repository.addBanda(musicaBanda);
  }

  async vincularProdutora(musicaProdutora: MusicaProdutora): Promise<void> {
    await this.repository.addProdutora(musicaProdutora);
  }

  async getBandasDaMusica(id: number): Promise<any[]> {
    return await this.repository.getBandasByMusica(id);
  }

  async getProdutorasDaMusica(id: number): Promise<any[]> {
    return await this.repository.getProdutorasByMusica(id);
  }
}