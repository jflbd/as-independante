
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import SafeLink from "./SafeLink";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      setIsScrolling(true);
      setIsOpen(false); // Close mobile menu before scrolling
      
      // Use setTimeout to allow menu to close before scrolling
      setTimeout(() => {
        section.scrollIntoView({ behavior: "smooth" });
        setActiveSection(sectionId);
        
        // Reset scrolling state after animation completes
        setTimeout(() => {
          setIsScrolling(false);
        }, 1000);
      }, 50);
    }
  };

  // Track scroll position to highlight active section and navbar background
  useEffect(() => {
    const handleScroll = () => {
      // Set background effect when scrolled
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      if (isScrolling) return; // Don't update during programmatic scrolling
      
      const sections = navItems.map(item => item.id);
      
      // Find the current section based on scroll position
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      } else if (window.scrollY <= 100) {
        setActiveSection("accueil");
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolling]);

  // Handle body scroll locking when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      // Prevent body scrolling when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling when menu is closed
      document.body.style.overflow = '';
    }
    
    return () => {
      // Cleanup - ensure scrolling is enabled when component unmounts
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navItems = [
    { id: "accueil", label: "Accueil" },
    { id: "a-propos", label: "Mon parcours" },
    { id: "missions", label: "Mes missions" },
    { id: "temoignages", label: "Ils me font confiance" },
    { id: "services", label: "Mes services" },
    { id: "referentiel", label: "Cadre d'intervention" },
    { id: "deontologie", label: "Déontologie" },
    { id: "pricing", label: "Tarifs" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled 
        ? "bg-white/90 backdrop-blur-md shadow-lg py-2" 
        : "bg-transparent py-4"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo and Name */}
          <SafeLink 
            to="#accueil" 
            className="flex items-center space-x-3 transition-all duration-300 hover:scale-105"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              setActiveSection("accueil");
              setIsOpen(false); // Close mobile menu when clicking on logo
            }}
            aria-label="Retour à l'accueil"
          >
            <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-primary/20 p-0.5 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md">
              <img 
                src="/lovable-uploads/afb2d7e4-424f-4531-a659-f56373a4175d.png" 
                alt="Rachel Gervais" 
                className="h-full w-full rounded-full object-cover"
                loading="eager"
                width={48}
                height={48}
              />
            </div>
            <span className="text-xl font-serif font-bold text-primary tracking-wider">Rachel Gervais</span>
          </SafeLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <SafeLink 
                key={item.id}
                to={`#${item.id}`} 
                className={`
                  px-3 py-2 text-sm rounded-full transition-all duration-300 
                  ${activeSection === item.id 
                    ? "text-white font-semibold bg-primary shadow-md transform -translate-y-0.5" 
                    : "text-gray-600 hover:text-primary hover:bg-primary/5"}
                `}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                aria-label={`Naviguer vers la section ${item.label}`}
              >
                <span className="relative">
                  {item.label}
                </span>
              </SafeLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden rounded-full p-2 bg-primary/10 text-primary transition-all duration-300 hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isOpen ? 
              <X size={24} className="animate-scale-in" /> : 
              <Menu size={24} />
            }
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 animate-fade-in fixed inset-x-0 top-[4.5rem] overflow-y-auto bg-white/95 backdrop-blur-lg shadow-xl max-h-[calc(100vh-4.5rem)] z-50">
            <div className="container mx-auto px-4">
              <div className="flex flex-col space-y-1 p-4 rounded-xl">
                {navItems.map((item) => (
                  <SafeLink
                    key={item.id}
                    to={`#${item.id}`}
                    className={`
                      flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 
                      ${activeSection === item.id 
                        ? "text-white font-semibold bg-primary border-l-4 border-primary/60" 
                        : "text-gray-600 hover:text-primary hover:bg-primary/5 border-l-4 border-transparent"}
                    `}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }}
                    aria-label={`Naviguer vers la section ${item.label}`}
                  >
                    <ChevronDown 
                      size={16} 
                      className={`transform transition-transform duration-300 ${
                        activeSection === item.id ? "rotate-180 text-white" : ""
                      }`} 
                    />
                    <span>{item.label}</span>
                  </SafeLink>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
