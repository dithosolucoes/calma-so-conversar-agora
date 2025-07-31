import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const skeletonVariants = cva(
  "animate-pulse rounded-md bg-muted",
  {
    variants: {
      variant: {
        default: "",
        text: "rounded-sm",
        circular: "rounded-full",
        rectangular: "rounded-lg",
      },
      size: {
        xs: "h-3 w-16",
        sm: "h-4 w-20",
        md: "h-5 w-24",
        lg: "h-6 w-32",
        xl: "h-8 w-40",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

function Skeleton({
  className,
  variant,
  size,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof skeletonVariants>) {
  return (
    <div
      className={cn(skeletonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

// Skeletons pré-configurados para componentes comuns
const SkeletonCard = () => (
  <div className="space-y-3 p-4 border rounded-lg">
    <Skeleton variant="text" className="h-4 w-3/4" />
    <Skeleton variant="text" className="h-3 w-1/2" />
    <div className="space-y-2">
      <Skeleton variant="text" className="h-3 w-full" />
      <Skeleton variant="text" className="h-3 w-5/6" />
    </div>
  </div>
)

const SkeletonProfile = () => (
  <div className="flex items-center space-x-3">
    <Skeleton variant="circular" className="h-12 w-12" />
    <div className="space-y-2">
      <Skeleton variant="text" className="h-4 w-32" />
      <Skeleton variant="text" className="h-3 w-20" />
    </div>
  </div>
)

const SkeletonDevotional = () => (
  <div className="space-y-4 p-4 border rounded-lg">
    <div className="flex items-center justify-between">
      <Skeleton variant="text" className="h-5 w-1/3" />
      <Skeleton variant="circular" className="h-6 w-6" />
    </div>
    <Skeleton variant="rectangular" className="h-32 w-full" />
    <div className="space-y-2">
      <Skeleton variant="text" className="h-3 w-full" />
      <Skeleton variant="text" className="h-3 w-4/5" />
      <Skeleton variant="text" className="h-3 w-3/5" />
    </div>
    <div className="flex justify-between items-center">
      <Skeleton variant="text" className="h-3 w-16" />
      <Skeleton variant="rectangular" className="h-8 w-20" />
    </div>
  </div>
)

const SkeletonStats = () => (
  <div className="grid grid-cols-2 gap-4">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="space-y-2 p-3 border rounded-lg">
        <Skeleton variant="text" className="h-3 w-16" />
        <Skeleton variant="text" className="h-6 w-10" />
        <Skeleton variant="text" className="h-2 w-12" />
      </div>
    ))}
  </div>
)

const SkeletonList = ({ items = 3 }: { items?: number }) => (
  <div className="space-y-3">
    {Array.from({ length: items }).map((_, i) => (
      <div key={i} className="flex items-center space-x-3 p-3 border rounded-lg">
        <Skeleton variant="circular" className="h-8 w-8" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" className="h-4 w-3/4" />
          <Skeleton variant="text" className="h-3 w-1/2" />
        </div>
        <Skeleton variant="rectangular" className="h-6 w-16" />
      </div>
    ))}
  </div>
)

export { 
  Skeleton, 
  SkeletonCard, 
  SkeletonProfile, 
  SkeletonDevotional, 
  SkeletonStats, 
  SkeletonList,
  skeletonVariants 
}