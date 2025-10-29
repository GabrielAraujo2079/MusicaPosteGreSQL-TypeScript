"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutoraController = void 0;
const ProdutoraService_1 = require("../Service/ProdutoraService");
class ProdutoraController {
    service;
    constructor() {
        this.service = new ProdutoraService_1.ProdutoraService();
    }
    async criar(nomeProdutora) {
        try {
            const produtora = { nomeprodutora: nomeProdutora };
            const resultado = await this.service.createProdutora(produtora);
            console.log('✅ Produtora criada com sucesso:', resultado);
        }
        catch (error) {
            console.error('❌ Erro ao criar produtora:', error);
            throw error;
        }
    }
    async listar() {
        try {
            const produtoras = await this.service.getAllProdutoras();
            console.log('\n📋 Lista de Produtoras:');
            console.table(produtoras);
        }
        catch (error) {
            console.error('❌ Erro ao listar produtoras:', error);
            throw error;
        }
    }
    async buscarPorId(id) {
        try {
            const produtora = await this.service.getProdutoraById(id);
            if (produtora) {
                console.log('\n🏢 Produtora encontrada:');
                console.log(produtora);
                const bandas = await this.service.getBandasDaProdutora(id);
                if (bandas.length > 0) {
                    console.log('\n🎸 Bandas:');
                    console.table(bandas);
                }
                const musicas = await this.service.getMusicasDaProdutora(id);
                if (musicas.length > 0) {
                    console.log('\n🎵 Músicas:');
                    console.table(musicas);
                }
            }
            else {
                console.log('❌ Produtora não encontrada');
            }
        }
        catch (error) {
            console.error('❌ Erro ao buscar produtora:', error);
            throw error;
        }
    }
    async atualizar(id, nomeProdutora) {
        try {
            const produtora = { nomeprodutora: nomeProdutora };
            const resultado = await this.service.updateProdutora(id, produtora);
            console.log('✅ Produtora atualizada com sucesso:', resultado);
        }
        catch (error) {
            console.error('❌ Erro ao atualizar produtora:', error);
            throw error;
        }
    }
    async deletar(id) {
        try {
            const sucesso = await this.service.deleteProdutora(id);
            if (sucesso) {
                console.log('✅ Produtora deletada com sucesso');
            }
        }
        catch (error) {
            console.error('❌ Erro ao deletar produtora:', error);
            throw error;
        }
    }
}
exports.ProdutoraController = ProdutoraController;
