"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListagemController = void 0;
const ProdutoraController_1 = require("./ProdutoraController");
const BandaController_1 = require("./BandaController");
const MusicaController_1 = require("./MusicaController");
class ListagemController {
    produtoraCtrl = new ProdutoraController_1.ProdutoraController();
    bandaCtrl = new BandaController_1.BandaController();
    musicaCtrl = new MusicaController_1.MusicaController();
    async executarListagem() {
        try {
            console.log('\n🎬 ===== TABELAS LISTADAS =====\n');
            console.log('🏢 Lista de Produtoras:');
            await this.produtoraCtrl.listar();
            console.log('\n🎸 Lista de Bandas:');
            await this.bandaCtrl.listar();
            console.log('\n🎵 Lista de Músicas:');
            await this.musicaCtrl.listar();
            console.log('\n================================');
        }
        catch (error) {
            console.error('❌ Erro ao listar tabelas:', error);
            throw error;
        }
    }
}
exports.ListagemController = ListagemController;
