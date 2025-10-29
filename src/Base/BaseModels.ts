// ============= MODELS =============
// Models/Musica.ts
export interface Musica {
  id_musica?: number;
  nomemusica: string;
}

export interface MusicaBanda {
  id_musica: number;
  id_banda: number;
}

export interface MusicaProdutora {
  id_musica: number;
  id_produtora: number;
}

// Models/Banda.ts
export interface Banda {
  id_banda?: number;
  nomebanda: string;
  id_produtora: number;
}

export interface BandaCompleta extends Banda {
  nomeprodutora?: string;
}

// Models/Produtora.ts
export interface Produtora {
  id_produtora?: number;
  nomeprodutora: string;
}