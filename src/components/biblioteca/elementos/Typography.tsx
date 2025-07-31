import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const typographyVariants = cva("", {
  variants: {
    variant: {
      // Títulos
      h1: "scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 text-3xl font-semibold tracking-tight",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      h5: "scroll-m-20 text-lg font-semibold tracking-tight",
      h6: "scroll-m-20 text-base font-semibold tracking-tight",
      
      // Textos
      body: "text-base leading-7",
      bodyLarge: "text-lg leading-8",
      bodySmall: "text-sm leading-6",
      caption: "text-xs text-muted-foreground",
      
      // Especialidades
      quote: "border-l-4 border-primary pl-6 italic text-lg",
      code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      verse: "text-center italic text-lg leading-8 text-foreground/80",
      
      // Labels e UI
      label: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      link: "text-primary underline-offset-4 hover:underline cursor-pointer",
      button: "text-sm font-medium",
    },
    color: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      secondary: "text-secondary-foreground",
      accent: "text-accent-foreground",
      success: "text-green-600",
      warning: "text-yellow-600",
      error: "text-red-600",
      white: "text-white",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
    weight: {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    }
  },
  defaultVariants: {
    variant: "body",
    color: "default",
    align: "left",
    weight: "normal",
  },
});

export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof typographyVariants> {
  as?: keyof JSX.IntrinsicElements;
  gradient?: boolean;
}

function Typography({
  className,
  variant,
  color,
  align,
  weight,
  as,
  gradient = false,
  children,
  ...props
}: TypographyProps) {
  // Mapear variant para elemento HTML adequado se 'as' não foi especificado
  const getElement = () => {
    if (as) return as;
    
    switch (variant) {
      case 'h1': return 'h1';
      case 'h2': return 'h2';
      case 'h3': return 'h3';
      case 'h4': return 'h4';
      case 'h5': return 'h5';
      case 'h6': return 'h6';
      case 'quote': return 'blockquote';
      case 'code': return 'code';
      case 'link': return 'a';
      default: return 'p';
    }
  };

  const Comp = getElement() as any;

  const classes = cn(
    typographyVariants({ variant, color, align, weight }),
    gradient && "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent",
    className
  );

  return (
    <Comp className={classes} {...props}>
      {children}
    </Comp>
  );
}

// Componentes de conveniência
export const Title = (props: Omit<TypographyProps, 'variant'> & { level: 1 | 2 | 3 | 4 | 5 | 6 }) => {
  const { level, ...rest } = props;
  return <Typography variant={`h${level}` as any} {...rest} />;
};

export const Text = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="body" {...props} />
);

export const Caption = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="caption" {...props} />
);

export const Quote = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="quote" {...props} />
);

export const Verse = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="verse" {...props} />
);

export { Typography, typographyVariants };