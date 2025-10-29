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