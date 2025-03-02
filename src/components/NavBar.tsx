
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      setIsScrolling(true);
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
      setActiveSection(sectionId);
      
      // Reset scrolling state after animation completes
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
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

  // Liste des sections mise à jour avec les nouveaux titres
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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-white/95 backdrop-blur-md shadow-md py-2" 
        : "bg-white/85 backdrop-blur-sm py-4"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <a 
            href="#" 
            className="flex items-center space-x-3 transition-all duration-300 hover:scale-105"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              setActiveSection("accueil");
            }}
            aria-label="Retour à l'accueil"
          >
            <div className="relative overflow-hidden rounded-full border-2 border-primary/20 p-0.5 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md">
              <img 
                src="/lovable-uploads/afb2d7e4-424f-4531-a659-f56373a4175d.png" 
                alt="Rachel Gervais" 
                className="h-10 w-10 rounded-full object-cover"
              />
            </div>
            <span className="text-xl font-serif font-bold text-primary tracking-wide">Rachel Gervais</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <a 
                key={item.id}
                href={`#${item.id}`} 
                className={`px-3 py-2 text-sm rounded-full transition-all duration-300 relative ${
                  activeSection === item.id 
                    ? "text-primary font-semibold bg-primary/10" 
                    : "text-gray-600 hover:text-primary hover:bg-gray-100"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                aria-label={`Naviguer vers la section ${item.label}`}
              >
                <span className="relative">
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full animate-fade-in"></span>
                  )}
                </span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden rounded-full p-2 transition-all duration-300 hover:bg-gray-100 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
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
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-1 bg-white/80 backdrop-blur-md p-3 rounded-xl shadow-lg border border-gray-100">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 ${
                    activeSection === item.id 
                      ? "text-primary font-semibold bg-primary/10 border-l-4 border-primary" 
                      : "text-gray-600 hover:text-primary hover:bg-gray-100 border-l-4 border-transparent"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  aria-label={`Naviguer vers la section ${item.label}`}
                >
                  <ChevronDown 
                    size={16} 
                    className={`transform transition-transform duration-300 ${activeSection === item.id ? "rotate-180 text-primary" : ""}`} 
                  />
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
