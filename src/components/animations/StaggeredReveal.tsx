import { useEffect, useRef, useState } from "react";

interface StaggeredRevealProps {
  children: React.ReactNode[];
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Un composant pour animer les enfants avec un effet d'apparition en cascade.
 * Idéal pour les listes, les grilles et les galeries.
 */
const StaggeredReveal: React.FC<StaggeredRevealProps> = ({
  children,
  className = "",
  staggerDelay = 100,
  initialDelay = 0,
  threshold = 0.1,
  rootMargin = "0px",
  once = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, once, hasAnimated]);

  return (
    <div ref={containerRef} className={className}>
      {isVisible && 
        children.map((child, index) => (
          <div
            key={index}
            className="opacity-0 translate-y-4 animate-fade-up"
            style={{
              animationDelay: `${initialDelay + (index * staggerDelay)}ms`,
              animationFillMode: "forwards"
            }}
          >
            {child}
          </div>
        ))
      }
      {!isVisible && 
        children.map((child, index) => (
          <div key={index} className="opacity-0">
            {child}
          </div>
        ))
      }
    </div>
  );
};

export default StaggeredReveal;