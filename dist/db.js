"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    user: 'Paulo',
    host: 'localhost',
    database: 'Musicas',
    password: 'Piloto26',
    port: 5432,
});
// Teste de conexão assíncrono e seguro (libera o client)
(async () => {
    try {
        const client = await exports.pool.connect();
        try {
            await client.query('SELECT 1');
            console.log('✅ Conectado ao banco de dados PostgreSQL');
        }
        finally {
            client.release();
        }
    }
    catch (err) {
        console.error('❌ Erro ao conectar ao banco de dados:', err);
    }
})();
exports.pool.on('error', (err) => {
    console.error('❌ Erro inesperado no pool de conexões:', err);
});
exports.default = exports.pool;
//# sourceMappingURL=db.js.map