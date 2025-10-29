import { Pool } from 'pg';

export const pool = new Pool({
  user: 'Paulo',
  host: 'localhost',
  database: 'Musicas',
  password: 'Piloto26',
  port: 5432,
});

// Teste de conexão assíncrono e seguro (libera o client)
(async () => {
  try {
    const client = await pool.connect();
    try {
      await client.query('SELECT 1');
      console.log('✅ Conectado ao banco de dados PostgreSQL');
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('❌ Erro ao conectar ao banco de dados:', err);
  }
})();

pool.on('error', (err) => {
  console.error('❌ Erro inesperado no pool de conexões:', err);
});

export default pool;