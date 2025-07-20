
import { cn } from '@/lib/utils';

interface JornadaDiasProps {
  diasTotais: number;
  diaAtual: number;
}

export const JornadaDias = ({ diasTotais, diaAtual }: JornadaDiasProps) => {
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {Array.from({ length: diasTotais }, (_, index) => {
        const numeroDia = index + 1;
        const isCompleto = numeroDia < diaAtual;
        const isAtual = numeroDia === diaAtual;
        const isFuturo = numeroDia > diaAtual;

        return (
          <div
            key={numeroDia}
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors",
              isCompleto && "bg-green-500 text-white",
              isAtual && "bg-primary text-primary-foreground ring-2 ring-primary/20",
              isFuturo && "bg-muted text-muted-foreground"
            )}
          >
            {numeroDia}
          </div>
        );
      })}
    </div>
  );
};
