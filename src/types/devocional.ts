
export interface Quiz {
  pergunta: string;
  opcoes: string[];
  resposta_correta: string;
}

export interface DiaDevocional {
  dia: number;
  tema: string;
  devocional: string;
  passagem: string;
  quiz: Quiz;
  oracao: string;
}

export interface Jornada {
  id: string;
  titulo: string;
  descricao: string;
  duracao: number;
  imagem_capa: string;
  dias: DiaDevocional[];
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  jornada_ativa_id?: string;
  dia_atual: number;
  streak: number[];
}

export interface AtividadeStatus {
  devocional: boolean;
  passagem: boolean;
  quiz: boolean;
  oracao: boolean;
}
