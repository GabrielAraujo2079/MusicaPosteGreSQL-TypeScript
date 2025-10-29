export interface Banda {
  id_banda?: number;
  nomebanda: string;
  id_produtora: number;
}

export interface BandaCompleta extends Banda {
  nomeprodutora?: string;
}