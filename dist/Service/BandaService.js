"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BandaService = void 0;
const BandaRepository_1 = require("../Repository/BandaRepository");
class BandaService {
    constructor() {
        this.repository = new BandaRepository_1.BandaRepository();
    }
    async createBanda(banda) {
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
    async getAllBandas() {
        return await this.repository.findAll();
    }
    async getBandaById(id) {
        return await this.repository.findById(id);
    }
    async updateBanda(id, banda) {
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
    async deleteBanda(id) {
        const exists = await this.repository.findById(id);
        if (!exists) {
            throw new Error('Banda não encontrada');
        }
        return await this.repository.delete(id);
    }
    async getMusicasDaBanda(id) {
        return await this.repository.getMusicasByBanda(id);
    }
}
exports.BandaService = BandaService;
//# sourceMappingURL=BandaService.js.map