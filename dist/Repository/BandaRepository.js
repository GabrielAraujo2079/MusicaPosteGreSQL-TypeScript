"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BandaRepository = void 0;
const db_1 = require("../db");
class BandaRepository {
    async create(banda) {
        const result = await db_1.pool.query('INSERT INTO Banda (NomeBanda, Id_Produtora) VALUES ($1, $2) RETURNING *', [banda.nomebanda, banda.id_produtora]);
        return result.rows[0];
    }
    async findAll() {
        const result = await db_1.pool.query(`SELECT b.*, p.NomeProdutora 
       FROM Banda b
       INNER JOIN Produtora p ON b.Id_Produtora = p.Id_Produtora
       ORDER BY b.Id_Banda`);
        return result.rows;
    }
    async findById(id) {
        const result = await db_1.pool.query(`SELECT b.*, p.NomeProdutora 
       FROM Banda b
       INNER JOIN Produtora p ON b.Id_Produtora = p.Id_Produtora
       WHERE b.Id_Banda = $1`, [id]);
        return result.rows[0] || null;
    }
    async update(id, banda) {
        const result = await db_1.pool.query('UPDATE Banda SET NomeBanda = $1, Id_Produtora = $2 WHERE Id_Banda = $3 RETURNING *', [banda.nomebanda, banda.id_produtora, id]);
        return result.rows[0] || null;
    }
    async delete(id) {
        const result = await db_1.pool.query('DELETE FROM Banda WHERE Id_Banda = $1', [id]);
        return (result.rowCount ?? 0) > 0;
    }
    async getMusicasByBanda(id) {
        const result = await db_1.pool.query(`SELECT m.* FROM Musica m
       INNER JOIN Musica_Banda mb ON m.Id_Musica = mb.Id_Musica
       WHERE mb.Id_Banda = $1`, [id]);
        return result.rows;
    }
    async verificaProdutoraExiste(id) {
        const result = await db_1.pool.query('SELECT 1 FROM Produtora WHERE Id_Produtora = $1', [id]);
        return result.rows.length > 0;
    }
}
exports.BandaRepository = BandaRepository;
//# sourceMappingURL=BandaRepository.js.map