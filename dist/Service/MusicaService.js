"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicaService = void 0;
const MusicaRepository_1 = require("../Repository/MusicaRepository");
const BandaRepository_1 = require("../Repository/BandaRepository");
const ProdutoraRepository_1 = require("../Repository/ProdutoraRepository");
class MusicaService {
    repository;
    bandaRepository;
    produtoraRepository;
    constructor() {
        this.repository = new MusicaRepository_1.MusicaRepository();
        this.bandaRepository = new BandaRepository_1.BandaRepository();
        this.produtoraRepository = new ProdutoraRepository_1.ProdutoraRepository();
    }
    async createMusica(musica, idBanda, idProdutora) {
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
            id_musica: musicaCriada.id_musica,
            id_banda: idBanda
        });
        await this.repository.addProdutora({
            id_musica: musicaCriada.id_musica,
            id_produtora: idProdutora
        });
        return musicaCriada;
    }
    async getAllMusicas() {
        return await this.repository.findAll();
    }
    async getMusicaById(id) {
        return await this.repository.findById(id);
    }
    async updateMusica(id, musica) {
        const exists = await this.repository.findById(id);
        if (!exists) {
            throw new Error('Música não encontrada');
        }
        return await this.repository.update(id, musica);
    }
    async deleteMusica(id) {
        const exists = await this.repository.findById(id);
        if (!exists) {
            throw new Error('Música não encontrada');
        }
        return await this.repository.delete(id);
    }
    async vincularBanda(musicaBanda) {
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
    async vincularProdutora(musicaProdutora) {
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
    async getBandasDaMusica(id) {
        return await this.repository.getBandasByMusica(id);
    }
    async getProdutorasDaMusica(id) {
        return await this.repository.getProdutorasByMusica(id);
    }
}
exports.MusicaService = MusicaService;
