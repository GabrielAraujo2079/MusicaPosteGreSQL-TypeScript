"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicaService = void 0;
const MusicaRepository_1 = require("../Repository/MusicaRepository");
class MusicaService {
    constructor() {
        this.repository = new MusicaRepository_1.MusicaRepository();
    }
    async createMusica(musica) {
        if (!musica.nomemusica || musica.nomemusica.trim() === '') {
            throw new Error('Nome da música é obrigatório');
        }
        return await this.repository.create(musica);
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
        await this.repository.addBanda(musicaBanda);
    }
    async vincularProdutora(musicaProdutora) {
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
//# sourceMappingURL=MusicaService.js.map