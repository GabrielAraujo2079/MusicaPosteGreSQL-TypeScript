import { pool } from '../db';
import { Musica, MusicaBanda, MusicaProdutora } from '../Models/Musica';

export class MusicaRepository {
  async create(musica: Musica): Promise<Musica> {
    const result = await pool.query(
      'INSERT INTO Musica (NomeMusica) VALUES ($1) RETURNING *',
      [musica.nomemusica]
    );
    return result.rows[0];
  }

  async findAll(): Promise<Musica[]> {
    const result = await pool.query('SELECT * FROM Musica ORDER BY Id_Musica');
    return result.rows;
  }

  async findById(id: number): Promise<Musica | null> {
    const result = await pool.query(
      'SELECT * FROM Musica WHERE Id_Musica = $1',
      [id]
    );
    return result.rows[0] || null;
  }

  async update(id: number, musica: Musica): Promise<Musica | null> {
    const result = await pool.query(
      'UPDATE Musica SET NomeMusica = $1 WHERE Id_Musica = $2 RETURNING *',
      [musica.nomemusica, id]
    );
    return result.rows[0] || null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query(
      'DELETE FROM Musica WHERE Id_Musica = $1',
      [id]
    );
    return (result.rowCount ?? 0) > 0;
  }

  async addBanda(musicaBanda: MusicaBanda): Promise<void> {
    await pool.query(
      'INSERT INTO Musica_Banda (Id_Musica, Id_Banda) VALUES ($1, $2)',
      [musicaBanda.id_musica, musicaBanda.id_banda]
    );
  }

  async addProdutora(musicaProdutora: MusicaProdutora): Promise<void> {
    await pool.query(
      'INSERT INTO Musica_Produtora (Id_Musica, Id_Produtora) VALUES ($1, $2)',
      [musicaProdutora.id_musica, musicaProdutora.id_produtora]
    );
  }

  async getBandasByMusica(id: number): Promise<any[]> {
    const result = await pool.query(
      `SELECT b.* FROM Banda b
       INNER JOIN Musica_Banda mb ON b.Id_Banda = mb.Id_Banda
       WHERE mb.Id_Musica = $1`,
      [id]
    );
    return result.rows;
  }

  async getProdutorasByMusica(id: number): Promise<any[]> {
    const result = await pool.query(
      `SELECT p.* FROM Produtora p
       INNER JOIN Musica_Produtora mp ON p.Id_Produtora = mp.Id_Produtora
       WHERE mp.Id_Musica = $1`,
      [id]
    );
    return result.rows;
  }
}