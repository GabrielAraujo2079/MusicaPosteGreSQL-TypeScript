"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutoraService = void 0;
const ProdutoraRepository_1 = require("../Repository/ProdutoraRepository");
class ProdutoraService {
    repository;
    constructor() {
        this.repository = new ProdutoraRepository_1.ProdutoraRepository();
    }
    async createProdutora(produtora) {
        if (!produtora.nomeprodutora || produtora.nomeprodutora.trim() === '') {
            throw new Error('Nome da produtora é obrigatório');
        }
        return await this.repository.create(produtora);
    }
    async getAllProdutoras() {
        return await this.repository.findAll();
    }
    async getProdutoraById(id) {
        return await this.repository.findById(id);
    }
    async updateProdutora(id, produtora) {
        const exists = await this.repository.findById(id);
        if (!exists) {
            throw new Error('Produtora não encontrada');
        }
        return await this.repository.update(id, produtora);
    }
    async deleteProdutora(id) {
        const exists = await this.repository.findById(id);
        if (!exists) {
            throw new Error('Produtora não encontrada');
        }
        return await this.repository.delete(id);
    }
    async getBandasDaProdutora(id) {
        return await this.repository.getBandasByProdutora(id);
    }
    async getMusicasDaProdutora(id) {
        return await this.repository.getMusicasByProdutora(id);
    }
}
exports.ProdutoraService = ProdutoraService;
