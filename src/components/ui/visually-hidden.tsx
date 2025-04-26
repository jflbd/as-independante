import * as React from "react"
import { cn } from "@/lib/utils"

interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {
  asChild?: boolean;
}

/**
 * Composant qui permet de masquer visuellement du contenu tout en le rendant accessible aux lecteurs d'écran.
 * Utile pour l'accessibilité lorsque vous avez besoin d'éléments comme des titres qui ne sont pas visibles mais nécessaires pour l'accessibilité.
 */
const VisuallyHidden = React.forwardRef<
  HTMLSpanElement,
  VisuallyHiddenProps
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? React.Fragment : "span"
  return (
    <Comp
      ref={ref}
      className={cn(
        "sr-only",
        className
      )}
      {...props}
    />
  )
})
VisuallyHidden.displayName = "VisuallyHidden"

export { VisuallyHidden }