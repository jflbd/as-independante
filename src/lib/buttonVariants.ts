import { cva, type VariantProps } from "class-variance-authority";

// Définition des variantes d'animation
export const animationVariants = {
  hover: {
    subtle: "hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200",
    medium: "hover:shadow-md hover:-translate-y-1 transition-all duration-300",
    strong: "hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300",
    none: "",
  },
  click: {
    bounce: "active:translate-y-0.5 active:shadow-inner transition-all duration-75",
    scale: "active:scale-95 transition-all duration-75",
    glow: "active:shadow-md active:shadow-primary/20 transition-all duration-75",
    none: "",
  },
};

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  animation?: {
    hover?: keyof typeof animationVariants.hover;
    click?: keyof typeof animationVariants.click;
  };
}
