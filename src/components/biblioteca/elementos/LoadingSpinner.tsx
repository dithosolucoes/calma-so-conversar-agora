import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const spinnerVariants = cva(
  "animate-spin rounded-full border-solid border-current border-r-transparent",
  {
    variants: {
      size: {
        sm: "h-4 w-4 border-2",
        md: "h-6 w-6 border-2",
        lg: "h-8 w-8 border-2",
        xl: "h-12 w-12 border-3",
      },
      variant: {
        default: "text-primary",
        secondary: "text-secondary",
        muted: "text-muted-foreground",
        white: "text-white",
      }
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

export interface LoadingSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  text?: string;
}

function LoadingSpinner({ 
  className, 
  size, 
  variant, 
  text,
  ...props 
}: LoadingSpinnerProps) {
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <div
        className={cn(spinnerVariants({ size, variant }))}
        role="status"
        aria-label="Carregando..."
      />
      {text && <span className="text-sm text-muted-foreground">{text}</span>}
    </div>
  );
}

// Componente de página de carregamento completo
export function LoadingPage({ text = "Carregando..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <LoadingSpinner size="xl" />
      <p className="text-muted-foreground">{text}</p>
    </div>
  );
}

// Componente de carregamento inline
export function InlineLoading({ text }: { text?: string }) {
  return (
    <div className="flex items-center justify-center p-4">
      <LoadingSpinner text={text} />
    </div>
  );
}

export { LoadingSpinner, spinnerVariants };