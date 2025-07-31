import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        xs: "h-6 w-6",
        sm: "h-8 w-8", 
        md: "h-10 w-10",
        lg: "h-12 w-12",
        xl: "h-16 w-16",
        "2xl": "h-20 w-20",
        "3xl": "h-24 w-24",
      },
      variant: {
        default: "",
        ring: "ring-2 ring-background ring-offset-2 ring-offset-background",
        badge: "ring-2 ring-primary ring-offset-2 ring-offset-background",
        status: "relative",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
)

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & 
  VariantProps<typeof avatarVariants>
>(({ className, size, variant, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(avatarVariants({ size, variant, className }))}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground font-medium",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

// Status indicator para avatares
interface StatusIndicatorProps {
  status: "online" | "offline" | "away" | "busy"
  size?: "sm" | "md" | "lg"
}

const StatusIndicator = ({ status, size = "md" }: StatusIndicatorProps) => {
  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-400", 
    away: "bg-yellow-500",
    busy: "bg-red-500",
  }

  const sizeClasses = {
    sm: "h-2 w-2",
    md: "h-3 w-3", 
    lg: "h-4 w-4",
  }

  return (
    <div className={cn(
      "absolute bottom-0 right-0 rounded-full border-2 border-background",
      statusColors[status],
      sizeClasses[size]
    )} />
  )
}

// Avatar com badge de nivel
interface UserAvatarProps {
  src?: string
  name: string
  level?: number
  status?: "online" | "offline" | "away" | "busy"
  size?: VariantProps<typeof avatarVariants>["size"]
  showLevel?: boolean
  showStatus?: boolean
}

const UserAvatar = ({
  src,
  name,
  level,
  status,
  size = "md",
  showLevel = false,
  showStatus = false,
}: UserAvatarProps) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="relative">
      <Avatar size={size} variant={showStatus ? "status" : "default"}>
        <AvatarImage src={src} alt={name} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      
      {showStatus && status && (
        <StatusIndicator 
          status={status} 
          size={size === "xs" || size === "sm" ? "sm" : size === "xl" || size === "2xl" || size === "3xl" ? "lg" : "md"} 
        />
      )}
      
      {showLevel && level && (
        <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full min-w-5 h-5 flex items-center justify-center px-1">
          {level}
        </div>
      )}
    </div>
  )
}

export { Avatar, AvatarImage, AvatarFallback, UserAvatar, StatusIndicator, avatarVariants }