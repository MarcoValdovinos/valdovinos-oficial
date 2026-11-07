import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
const buttonVariants = cva(
"group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transpare
{
variants: {
variant: {
default: 'bg-accent text-background shadow-[0_0_15px_oklch(0.82_0.22_145/0.3)] hover:bg-acc
outline: 'border-primary/50 bg-background text-primary hover:bg-primary/10 hover:border-pri
secondary: 'bg-muted text-muted-foreground hover:bg-muted/80',
ghost: 'text-foreground/70 hover:text-accent hover:bg-accent/5',
destructive: 'bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive
},
size: {
default: 'h-9 gap-2 px-4',
xs: 'h-7 gap-1 px-2 text-[10px]',
sm: 'h-8 gap-1.5 px-3 text-xs',
lg: 'h-11 gap-2.5 px-6 text-base',
},
},
defaultVariants: {
variant: 'default',
size: 'default',
},
}
)
export function Button({ className, variant, size, ...props }: ButtonPrimitive.Props & VariantProps
return (
<ButtonPrimitive
data-slot="button"
className={cn(buttonVariants({ variant, size, className }))}
{...props}
/>
)
}
