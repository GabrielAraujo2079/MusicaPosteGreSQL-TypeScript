"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProdutoraController_1 = require("./Controller/ProdutoraController");
const BandaController_1 = require("./Controller/BandaController");
const MusicaController_1 = require("./Controller/MusicaController");
const db_1 = require("./db");
// Menu de opções
function exibirMenu() {
    console.log('\n╔══════════════════════════════════════╗');
    console.log('║   SISTEMA DE GERENCIAMENTO MUSICAL   ║');
    console.log('╚══════════════════════════════════════╝');
    console.log('\n1️⃣  - Gerenciar Produtoras');
    console.log('2️⃣  - Gerenciar Bandas');
    console.log('3️⃣  - Gerenciar Músicas');
    console.log('4️⃣  - Exemplo Completo');
    console.log('0️⃣  - Sair\n');
}
async function menuProdutora() {
    const controller = new ProdutoraController_1.ProdutoraController();
    console.log('\n=== GERENCIAR PRODUTORAS ===');
    console.log('1 - Criar Produtora');
    console.log('2 - Listar Todas');
    console.log('3 - Buscar por ID');
    console.log('4 - Atualizar');
    console.log('5 - Deletar');
    console.log('0 - Voltar');
    // Exemplo de uso:
    await controller.listar();
}
async function menuBanda() {
    const controller = new BandaController_1.BandaController();
    console.log('\n=== GERENCIAR BANDAS ===');
    console.log('1 - Criar Banda');
    console.log('2 - Listar Todas');
    console.log('3 - Buscar por ID');
    console.log('4 - Atualizar');
    console.log('5 - Deletar');
    console.log('0 - Voltar');
    // Exemplo de uso:
    await controller.listar();
}
async function menuMusica() {
    const controller = new MusicaController_1.MusicaController();
    console.log('\n=== GERENCIAR MÚSICAS ===');
    console.log('1 - Criar Música');
    console.log('2 - Listar Todas');
    console.log('3 - Buscar por ID');
    console.log('4 - Atualizar');
    console.log('5 - Deletar');
    console.log('6 - Vincular com Banda');
    console.log('7 - Vincular com Produtora');
    console.log('0 - Voltar');
    // Exemplo de uso:
    await controller.listar();
}
async function exemploCompleto() {
    console.log('\n╔═══════════════════════════════════════╗');
    console.log('║        EXECUTANDO EXEMPLO COMPLETO        ║');
    console.log('╚═══════════════════════════════════════╝\n');
    try {
        // 1. Criar Produtora
        console.log('📍 PASSO 1: Criando Produtora...');
        const produtoraCtrl = new ProdutoraController_1.ProdutoraController();
        await produtoraCtrl.criar('Universal Music Group');
        // 2. Criar Banda
        console.log('\n📍 PASSO 2: Criando Banda...');
        const bandaCtrl = new BandaController_1.BandaController();
        await bandaCtrl.criar('The Beatles', 1);
        // 3. Criar Música
        console.log('\n📍 PASSO 3: Criando Música...');
        const musicaCtrl = new MusicaController_1.MusicaController();
        await musicaCtrl.criar('Hey Jude');
        // 4. Vincular Música com Banda e Produtora
        console.log('\n📍 PASSO 4: Vinculando Música com Banda e Produtora...');
        await musicaCtrl.vincularComBanda(1, 1);
        await musicaCtrl.vincularComProdutora(1, 1);
        // 5. Exibir resultados
        console.log('\n\n╔═══════════════════════════════════════╗');
        console.log('║            RESULTADOS FINAIS              ║');
        console.log('╚═══════════════════════════════════════╝');
        console.log('\n🏢 PRODUTORA COMPLETA:');
        await produtoraCtrl.buscarPorId(1);
        console.log('\n\n🎸 BANDA COMPLETA:');
        await bandaCtrl.buscarPorId(1);
        console.log('\n\n🎵 MÚSICA COMPLETA:');
        await musicaCtrl.buscarPorId(1);
        console.log('\n\n✅ Exemplo completo executado com sucesso!');
    }
    catch (error) {
        console.error('\n❌ Erro ao executar exemplo:', error);
    }
}
// Função principal
async function main() {
    try {
        console.log('\n🎵 Bem-vindo ao Sistema de Gerenciamento Musical!\n');
        // Para executar o exemplo completo, descomente a linha abaixo:
        exibirMenu();
        await exemploCompleto();
        // Ou use o menu interativo:
        await menuProdutora();
        await menuBanda();
        await menuMusica();
    }
    catch (error) {
        console.error('❌ Erro na aplicação:', error);
    }
    finally {
        // Fecha o pool de conexões
        try {
            await db_1.pool.end();
        }
        catch (err) {
            console.warn('⚠️ Erro ao encerrar pool:', err);
        }
        console.log('\n👋 Aplicação finalizada.');
    }
}
// Executa a aplicação
main();
//# sourceMappingURL=index.js.map