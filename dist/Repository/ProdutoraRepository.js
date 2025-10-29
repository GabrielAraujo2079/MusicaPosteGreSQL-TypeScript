"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutoraRepository = void 0;
const db_1 = require("../db");
class ProdutoraRepository {
    async create(produtora) {
        const result = await db_1.pool.query('INSERT INTO Produtora (NomeProdutora) VALUES ($1) RETURNING *', [produtora.nomeprodutora]);
        return result.rows[0];
    }
    async findAll() {
        const result = await db_1.pool.query('SELECT * FROM Produtora ORDER BY Id_Produtora');
        return result.rows;
    }
    async findById(id) {
        const result = await db_1.pool.query('SELECT * FROM Produtora WHERE Id_Produtora = $1', [id]);
        return result.rows[0] || null;
    }
    async update(id, produtora) {
        const result = await db_1.pool.query('UPDATE Produtora SET NomeProdutora = $1 WHERE Id_Produtora = $2 RETURNING *', [produtora.nomeprodutora, id]);
        return result.rows[0] || null;
    }
    async delete(id) {
        try {
            const result = await db_1.pool.query('DELETE FROM Produtora WHERE Id_Produtora = $1', [id]);
            return (result.rowCount ?? 0) > 0;
        }
        catch (error) {
            if (error.code === '23503') {
                throw new Error('Não é possível deletar a produtora pois existem bandas vinculadas');
            }
            throw error;
        }
    }
    async getBandasByProdutora(id) {
        const result = await db_1.pool.query('SELECT * FROM Banda WHERE Id_Produtora = $1', [id]);
        return result.rows;
    }
    async getMusicasByProdutora(id) {
        const result = await db_1.pool.query(`SELECT m.* FROM Musica m
       INNER JOIN Musica_Produtora mp ON m.Id_Musica = mp.Id_Musica
       WHERE mp.Id_Produtora = $1`, [id]);
        return result.rows;
    }
}
exports.ProdutoraRepository = ProdutoraRepository;
//# sourceMappingURL=ProdutoraRepository.js.map