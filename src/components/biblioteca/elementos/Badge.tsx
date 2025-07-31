import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "text-foreground border-border",
        success: "border-transparent bg-green-500 text-white",
        warning: "border-transparent bg-yellow-500 text-white",
        error: "border-transparent bg-red-500 text-white",
        // Variantes específicas para jornadas
        progresso: "border-transparent bg-blue-100 text-blue-800 border border-blue-200",
        completado: "border-transparent bg-green-100 text-green-800 border border-green-200",
        bloqueado: "border-transparent bg-gray-100 text-gray-600 border border-gray-200",
        // Variantes para categorias
        devocional: "border-transparent bg-purple-100 text-purple-800 border border-purple-200",
        oracao: "border-transparent bg-orange-100 text-orange-800 border border-orange-200",
        passagem: "border-transparent bg-blue-100 text-blue-800 border border-blue-200",
        quiz: "border-transparent bg-green-100 text-green-800 border border-green-200",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        bounce: "animate-bounce",
        glow: "shadow-lg shadow-primary/30",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      animation: "none",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
  onRemove?: () => void;
}

function Badge({ 
  className, 
  variant, 
  size, 
  animation, 
  icon, 
  onRemove, 
  children, 
  ...props 
}: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size, animation }), className)} {...props}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 hover:bg-black/10 rounded-full p-0.5 transition-colors"
          aria-label="Remover"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
}

export { Badge, badgeVariants };