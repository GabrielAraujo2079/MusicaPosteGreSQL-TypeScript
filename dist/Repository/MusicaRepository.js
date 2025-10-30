"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicaRepository = void 0;
const db_1 = require("../db");
class MusicaRepository {
    async create(musica) {
        const result = await db_1.pool.query('INSERT INTO Musica (NomeMusica) VALUES ($1) RETURNING *', [musica.nomemusica]);
        return result.rows[0];
    }
    async findAll() {
        const result = await db_1.pool.query('SELECT * FROM Musica ORDER BY Id_Musica');
        return result.rows;
    }
    async findById(id) {
        const result = await db_1.pool.query('SELECT * FROM Musica WHERE Id_Musica = $1', [id]);
        return result.rows[0] || null;
    }
    async update(id, musica) {
        const result = await db_1.pool.query('UPDATE Musica SET NomeMusica = $1 WHERE Id_Musica = $2 RETURNING *', [musica.nomemusica, id]);
        return result.rows[0] || null;
    }
    async delete(id) {
        const result = await db_1.pool.query('DELETE FROM Musica WHERE Id_Musica = $1', [id]);
        return (result.rowCount ?? 0) > 0;
    }
    async addBanda(musicaBanda) {
        await db_1.pool.query('INSERT INTO Musica_Banda (Id_Musica, Id_Banda) VALUES ($1, $2)', [musicaBanda.id_musica, musicaBanda.id_banda]);
    }
    async addProdutora(musicaProdutora) {
        await db_1.pool.query('INSERT INTO Musica_Produtora (Id_Musica, Id_Produtora) VALUES ($1, $2)', [musicaProdutora.id_musica, musicaProdutora.id_produtora]);
    }
    async getBandasByMusica(id) {
        const result = await db_1.pool.query(`SELECT b.* FROM Banda b
       INNER JOIN Musica_Banda mb ON b.Id_Banda = mb.Id_Banda
       WHERE mb.Id_Musica = $1`, [id]);
        return result.rows;
    }
    async getProdutorasByMusica(id) {
        const result = await db_1.pool.query(`SELECT p.* FROM Produtora p
       INNER JOIN Musica_Produtora mp ON p.Id_Produtora = mp.Id_Produtora
       WHERE mp.Id_Musica = $1`, [id]);
        return result.rows;
    }
}
exports.MusicaRepository = MusicaRepository;
