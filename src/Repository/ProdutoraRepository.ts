import { pool } from '../db';
import { Produtora } from '../Models/Produtora';

export class ProdutoraRepository {
  async create(produtora: Produtora): Promise<Produtora> {
    const result = await pool.query(
      'INSERT INTO Produtora (NomeProdutora) VALUES ($1) RETURNING *',
      [produtora.nomeprodutora]
    );
    return result.rows[0];
  }

  async findAll(): Promise<Produtora[]> {
    const result = await pool.query('SELECT * FROM Produtora ORDER BY Id_Produtora');
    return result.rows;
  }

  async findById(id: number): Promise<Produtora | null> {
    const result = await pool.query(
      'SELECT * FROM Produtora WHERE Id_Produtora = $1',
      [id]
    );
    return result.rows[0] || null;
  }

  async update(id: number, produtora: Produtora): Promise<Produtora | null> {
    const result = await pool.query(
      'UPDATE Produtora SET NomeProdutora = $1 WHERE Id_Produtora = $2 RETURNING *',
      [produtora.nomeprodutora, id]
    );
    return result.rows[0] || null;
  }

  async delete(id: number): Promise<boolean> {
    try {
      const result = await pool.query(
        'DELETE FROM Produtora WHERE Id_Produtora = $1',
        [id]
      );
      return (result.rowCount ?? 0) > 0;
    } catch (error: any) {
      if (error.code === '23503') {
        throw new Error('Não é possível deletar a produtora pois existem bandas vinculadas');
      }
      throw error;
    }
  }

  async getBandasByProdutora(id: number): Promise<any[]> {
    const result = await pool.query(
      'SELECT * FROM Banda WHERE Id_Produtora = $1',
      [id]
    );
    return result.rows;
  }

  async getMusicasByProdutora(id: number): Promise<any[]> {
    const result = await pool.query(
      `SELECT m.* FROM Musica m
       INNER JOIN Musica_Produtora mp ON m.Id_Musica = mp.Id_Musica
       WHERE mp.Id_Produtora = $1`,
      [id]
    );
    return result.rows;
  }
}