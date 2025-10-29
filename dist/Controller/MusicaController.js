"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicaController = void 0;
const MusicaService_1 = require("../Service/MusicaService");
class MusicaController {
    constructor() {
        this.service = new MusicaService_1.MusicaService();
    }
    async criar(nomeMusica) {
        try {
            if (typeof nomeMusica !== 'string' || !nomeMusica.trim()) {
                console.error('❌ Nome da música é obrigatório.');
                return;
            }
            const musica = { nomemusica: nomeMusica.trim() };
            const resultado = await this.service.createMusica(musica);
            console.log('✅ Música criada com sucesso:', resultado);
        }
        catch (error) {
            console.error('❌ Erro ao criar música:', error);
            throw error;
        }
    }
    async listar() {
        try {
            const musicas = await this.service.getAllMusicas();
            console.log('\n📋 Lista de Músicas:');
            if (!Array.isArray(musicas) || musicas.length === 0) {
                console.log('— Nenhuma música cadastrada —');
                return;
            }
            console.table(musicas);
        }
        catch (error) {
            console.error('❌ Erro ao listar músicas:', error);
            throw error;
        }
    }
    async buscarPorId(id) {
        try {
            if (!Number.isInteger(id) || id <= 0) {
                console.error('❌ ID inválido. Deve ser um inteiro positivo.');
                return;
            }
            const musica = await this.service.getMusicaById(id);
            if (!musica) {
                console.log('❌ Música não encontrada');
                return;
            }
            console.log('\n🎵 Música encontrada:');
            console.log(musica);
            try {
                const bandas = await this.service.getBandasDaMusica(id);
                if (Array.isArray(bandas) && bandas.length > 0) {
                    console.log('\n🎸 Bandas:');
                    console.table(bandas);
                }
                else {
                    console.log('— Nenhuma banda vinculada a esta música —');
                }
            }
            catch (innerErr) {
                console.warn('⚠️ Não foi possível carregar bandas da música:', innerErr);
            }
            try {
                const produtoras = await this.service.getProdutorasDaMusica(id);
                if (Array.isArray(produtoras) && produtoras.length > 0) {
                    console.log('\n🏢 Produtoras:');
                    console.table(produtoras);
                }
                else {
                    console.log('— Nenhuma produtora vinculada a esta música —');
                }
            }
            catch (innerErr) {
                console.warn('⚠️ Não foi possível carregar produtoras da música:', innerErr);
            }
        }
        catch (error) {
            console.error('❌ Erro ao buscar música:', error);
            throw error;
        }
    }
    async atualizar(id, nomeMusica) {
        try {
            if (!Number.isInteger(id) || id <= 0) {
                console.error('❌ ID inválido. Deve ser um inteiro positivo.');
                return;
            }
            if (typeof nomeMusica !== 'string' || !nomeMusica.trim()) {
                console.error('❌ Nome da música é obrigatório.');
                return;
            }
            const musica = { nomemusica: nomeMusica.trim() };
            const resultado = await this.service.updateMusica(id, musica);
            if (resultado) {
                console.log('✅ Música atualizada com sucesso:', resultado);
            }
            else {
                console.log('❌ Não foi possível atualizar — música não encontrada.');
            }
        }
        catch (error) {
            console.error('❌ Erro ao atualizar música:', error);
            throw error;
        }
    }
    async deletar(id) {
        try {
            if (!Number.isInteger(id) || id <= 0) {
                console.error('❌ ID inválido. Deve ser um inteiro positivo.');
                return;
            }
            const sucesso = await this.service.deleteMusica(id);
            if (sucesso) {
                console.log('✅ Música deletada com sucesso');
            }
            else {
                console.log('❌ Não foi possível deletar — música não encontrada.');
            }
        }
        catch (error) {
            console.error('❌ Erro ao deletar música:', error);
            throw error;
        }
    }
    async vincularComBanda(idMusica, idBanda) {
        try {
            if (!Number.isInteger(idMusica) || idMusica <= 0) {
                console.error('❌ idMusica inválido. Deve ser um inteiro positivo.');
                return;
            }
            if (!Number.isInteger(idBanda) || idBanda <= 0) {
                console.error('❌ idBanda inválido. Deve ser um inteiro positivo.');
                return;
            }
            const vinculo = { id_musica: idMusica, id_banda: idBanda };
            await this.service.vincularBanda(vinculo);
            console.log('✅ Música vinculada à banda com sucesso');
        }
        catch (error) {
            console.error('❌ Erro ao vincular música com banda:', error);
            throw error;
        }
    }
    async vincularComProdutora(idMusica, idProdutora) {
        try {
            if (!Number.isInteger(idMusica) || idMusica <= 0) {
                console.error('❌ idMusica inválido. Deve ser um inteiro positivo.');
                return;
            }
            if (!Number.isInteger(idProdutora) || idProdutora <= 0) {
                console.error('❌ idProdutora inválido. Deve ser um inteiro positivo.');
                return;
            }
            const vinculo = { id_musica: idMusica, id_produtora: idProdutora };
            await this.service.vincularProdutora(vinculo);
            console.log('✅ Música vinculada à produtora com sucesso');
        }
        catch (error) {
            console.error('❌ Erro ao vincular música com produtora:', error);
            throw error;
        }
    }
}
exports.MusicaController = MusicaController;
//# sourceMappingURL=MusicaController.js.map