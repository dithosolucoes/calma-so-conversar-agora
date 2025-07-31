import { z } from 'zod';
import type { Jornada, DiaDevocional, Quiz } from '@/types/devocional';

// Schema de validação Zod
const QuizSchema = z.object({
  pergunta: z.string().min(1, "Pergunta é obrigatória"),
  opcoes: z.array(z.string()).length(4, "Quiz deve ter exatamente 4 opções"),
  resposta_correta: z.string().min(1, "Resposta correta é obrigatória")
});

const DiaDevocionalSchema = z.object({
  dia: z.number().min(1, "Dia deve ser maior que 0"),
  tema: z.string().min(1, "Tema é obrigatório"),
  devocional: z.string().min(50, "Devocional deve ter pelo menos 50 caracteres"),
  passagem: z.string().min(1, "Passagem bíblica é obrigatória"),
  quiz: QuizSchema,
  oracao: z.string().min(20, "Oração deve ter pelo menos 20 caracteres")
});

const JornadaSchema = z.object({
  titulo: z.string().min(1, "Título é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  duracao: z.number().min(1, "Duração deve ser maior que 0"),
  imagem_capa: z.string().url("URL da imagem deve ser válida").optional(),
  dias: z.array(DiaDevocionalSchema).min(1, "Deve ter pelo menos 1 dia")
});

export function processJSONContent(jsonString: string): {
  isValid: boolean;
  data?: Jornada;
  error?: string;
} {
  try {
    // Parse JSON
    let parsedData;
    try {
      parsedData = JSON.parse(jsonString);
    } catch (error) {
      return {
        isValid: false,
        error: "JSON inválido - verifique a sintaxe"
      };
    }

    // Validar com Zod
    const validationResult = JornadaSchema.safeParse(parsedData);
    
    if (!validationResult.success) {
      const errors = validationResult.error.issues
        .map(issue => `${issue.path.join('.')}: ${issue.message}`)
        .join(', ');
      
      return {
        isValid: false,
        error: `Estrutura inválida: ${errors}`
      };
    }

    // Validações adicionais
    const data = validationResult.data;
    
    // Verificar se a duração confere com o número de dias
    if (data.duracao !== data.dias.length) {
      return {
        isValid: false,
        error: `Duração (${data.duracao}) não confere com número de dias (${data.dias.length})`
      };
    }

    // Verificar se os dias estão em sequência
    const diasOrdenados = data.dias.sort((a, b) => a.dia - b.dia);
    for (let i = 0; i < diasOrdenados.length; i++) {
      if (diasOrdenados[i].dia !== i + 1) {
        return {
          isValid: false,
          error: `Dias devem estar em sequência de 1 a ${data.dias.length}`
        };
      }
    }

    // Verificar se as respostas corretas estão nas opções
    for (const dia of data.dias) {
      if (!dia.quiz.opcoes.includes(dia.quiz.resposta_correta)) {
        return {
          isValid: false,
          error: `Dia ${dia.dia}: resposta correta "${dia.quiz.resposta_correta}" não está nas opções`
        };
      }
    }

    // Gerar ID único - Como o Zod já validou, podemos fazer cast seguro
    const jornadaComId: Jornada = {
      id: generateId(),
      titulo: data.titulo,
      descricao: data.descricao,
      duracao: data.duracao,
      imagem_capa: data.imagem_capa || "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400",
      dias: data.dias as DiaDevocional[]
    };

    return {
      isValid: true,
      data: jornadaComId
    };

  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : "Erro desconhecido"
    };
  }
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}