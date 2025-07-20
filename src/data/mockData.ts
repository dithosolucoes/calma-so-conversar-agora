
import { Jornada, Usuario } from '@/types/devocional';

export const mockJornada: Jornada = {
  id: "1",
  titulo: "Caminhada de Fé - 7 Dias",
  descricao: "Uma jornada transformadora de 7 dias para fortalecer sua fé e conexão espiritual",
  duracao: 7,
  imagem_capa: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop",
  dias: [
    {
      dia: 1,
      tema: "A Candeia Debaixo de Uma Vasilha",
      devocional: "Hoje refletimos sobre como nossa luz interior deve brilhar para o mundo. Jesus nos ensina que não devemos esconder nossa fé, mas deixá-la iluminar o caminho de outros. Quando guardamos nossa luz apenas para nós, privamos o mundo da esperança que carregamos.",
      passagem: "Mateus 5:14-16 - Vós sois a luz do mundo; não se pode esconder uma cidade edificada sobre um monte; nem se acende a candeia e se coloca debaixo do alqueire, mas no velador, e dá luz a todos que estão na casa.",
      quiz: {
        pergunta: "Segundo Jesus, onde devemos colocar nossa candeia?",
        opcoes: ["Debaixo do alqueire", "No velador", "Escondida no quarto"],
        resposta_correta: "No velador"
      },
      oracao: "Senhor, ajude-me a ser luz no mundo. Que minha fé não seja escondida, mas que brilhe através das minhas ações e palavras, trazendo esperança a quem precisa. Amém."
    },
    {
      dia: 2,
      tema: "O Amor que Transforma",
      devocional: "O amor é a força mais poderosa do universo. Hoje meditamos sobre como o amor de Deus nos transforma e como devemos amar uns aos outros incondicionalmente.",
      passagem: "1 João 4:7-8 - Amados, amemo-nos uns aos outros; porque o amor é de Deus; e qualquer que ama é nascido de Deus e conhece a Deus.",
      quiz: {
        pergunta: "De onde vem o amor verdadeiro?",
        opcoes: ["Do coração humano", "De Deus", "Da nossa força de vontade"],
        resposta_correta: "De Deus"
      },
      oracao: "Pai celestial, encha meu coração com Seu amor. Que eu possa amar como Tu amas, sem condições e com misericórdia. Amém."
    }
  ]
};

export const mockUsuario: Usuario = {
  id: "user1",
  nome: "Maria",
  email: "maria@email.com",
  jornada_ativa_id: "1",
  dia_atual: 1,
  streak: [1, 1, 0, 1, 1, 1, 0] // S, T, Q, Q, S, S, D (1 = completo, 0 = não completo)
};
