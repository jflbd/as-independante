import { useEffect, useRef, useState } from "react";

type AnimationDirection = "up" | "down" | "left" | "right" | "none";
type AnimationType = "fade" | "slide" | "scale" | "none";

interface FadeInSectionProps {
  children: React.ReactNode;
  direction?: AnimationDirection;
  type?: AnimationType;
  delay?: number;
  threshold?: number;
  className?: string;
  rootMargin?: string;
  once?: boolean;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  direction = "up",
  type = "fade",
  delay = 0,
  threshold = 0.2,
  className = "",
  rootMargin = "0px",
  once = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (once && hasAnimated) return;
          
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) setHasAnimated(true);
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      { 
        threshold,
        rootMargin
      }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, once, hasAnimated]);

  // Calculer les classes CSS en fonction des propriétés
  const getAnimationClass = () => {
    if (type === "none") return "";
    
    let baseClass = "";
    
    if (type === "fade") baseClass = "opacity-0 transition-opacity duration-700";
    if (type === "scale") baseClass = "opacity-0 scale-95 transition-all duration-700";
    if (type === "slide") {
      switch(direction) {
        case "up":
          baseClass = "opacity-0 translate-y-10 transition-all duration-700";
          break;
        case "down":
          baseClass = "opacity-0 -translate-y-10 transition-all duration-700";
          break;
        case "left":
          baseClass = "opacity-0 translate-x-10 transition-all duration-700";
          break;
        case "right":
          baseClass = "opacity-0 -translate-x-10 transition-all duration-700";
          break;
        default:
          baseClass = "opacity-0 translate-y-10 transition-all duration-700";
      }
    }
    
    return isVisible 
      ? `${baseClass} opacity-100 transform-none` 
      : baseClass;
  };

  const delayStyle = delay ? { transitionDelay: `${delay}ms` } : {};

  return (
    <div
      ref={domRef}
      className={`${getAnimationClass()} ${className}`}
      style={delayStyle}
    >
      {children}
    </div>
  );
};

export default FadeInSection;