import { MusicaRepository } from '../Repository/MusicaRepository';
import { BandaRepository } from '../Repository/BandaRepository';
import { ProdutoraRepository } from '../Repository/ProdutoraRepository';
import { Musica, MusicaBanda, MusicaProdutora } from '../Models/Musica';

export class MusicaService {
  private repository: MusicaRepository;
  private bandaRepository: BandaRepository;
  private produtoraRepository: ProdutoraRepository;

  constructor() {
    this.repository = new MusicaRepository();
    this.bandaRepository = new BandaRepository();
    this.produtoraRepository = new ProdutoraRepository();
  }

  async createMusica(musica: Musica, idBanda: number, idProdutora: number): Promise<Musica> {
    if (!musica.nomemusica || musica.nomemusica.trim() === '') {
      throw new Error('Nome da música é obrigatório');
    }

    // Verificar se a banda existe
    const bandaExiste = await this.bandaRepository.findById(idBanda);
    if (!bandaExiste) {
      throw new Error('Banda não encontrada');
    }

    // Verificar se a produtora existe
    const produtoraExiste = await this.produtoraRepository.findById(idProdutora);
    if (!produtoraExiste) {
      throw new Error('Produtora não encontrada');
    }

    // Criar a música
    const musicaCriada = await this.repository.create(musica);

    // Vincular automaticamente com a banda e produtora
    await this.repository.addBanda({ 
      id_musica: musicaCriada.id_musica!, 
      id_banda: idBanda 
    });

    await this.repository.addProdutora({ 
      id_musica: musicaCriada.id_musica!, 
      id_produtora: idProdutora 
    });

    return musicaCriada;
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
    // Verificar se a banda existe
    const bandaExiste = await this.bandaRepository.findById(musicaBanda.id_banda);
    if (!bandaExiste) {
      throw new Error('Banda não encontrada');
    }

    // Verificar se a música existe
    const musicaExiste = await this.repository.findById(musicaBanda.id_musica);
    if (!musicaExiste) {
      throw new Error('Música não encontrada');
    }

    await this.repository.addBanda(musicaBanda);
  }

  async vincularProdutora(musicaProdutora: MusicaProdutora): Promise<void> {
    // Verificar se a produtora existe
    const produtoraExiste = await this.produtoraRepository.findById(musicaProdutora.id_produtora);
    if (!produtoraExiste) {
      throw new Error('Produtora não encontrada');
    }

    // Verificar se a música existe
    const musicaExiste = await this.repository.findById(musicaProdutora.id_musica);
    if (!musicaExiste) {
      throw new Error('Música não encontrada');
    }

    await this.repository.addProdutora(musicaProdutora);
  }

  async getBandasDaMusica(id: number): Promise<any[]> {
    return await this.repository.getBandasByMusica(id);
  }

  async getProdutorasDaMusica(id: number): Promise<any[]> {
    return await this.repository.getProdutorasByMusica(id);
  }
}