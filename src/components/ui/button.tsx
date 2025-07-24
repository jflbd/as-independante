import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"
import { buttonVariants, animationVariants, type ButtonProps } from "../../lib/buttonVariants"

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, animation, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    // Construction des classes d'animation
    const hoverAnimation = animation?.hover || "medium";
    const clickAnimation = animation?.click || "scale";
    
    const animatedClassName = cn(
      buttonVariants({ variant, size, className }),
      animationVariants.hover[hoverAnimation],
      animationVariants.click[clickAnimation],
    );
    
    return (
      <Comp
        className={animatedClassName}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
