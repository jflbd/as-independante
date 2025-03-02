
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");
  const [isScrolling, setIsScrolling] = useState(false);

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

  // Track scroll position to highlight active section
  useEffect(() => {
    const handleScroll = () => {
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
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <a 
            href="#" 
            className="flex items-center space-x-2 transition-transform duration-300 hover:scale-105"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              setActiveSection("accueil");
            }}
          >
            <img 
              src="/lovable-uploads/afb2d7e4-424f-4531-a659-f56373a4175d.png" 
              alt="Rachel Gervais" 
              className="h-10 w-10" 
            />
            <span className="text-xl font-serif font-bold text-primary">Rachel Gervais</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <a 
                key={item.id}
                href={`#${item.id}`} 
                className={`text-gray-600 hover:text-primary transition-colors relative text-sm ${
                  activeSection === item.id 
                    ? "text-primary font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary" 
                    : ""
                } after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                aria-label={`Naviguer vers la section ${item.label}`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden transition-colors duration-300 hover:text-primary"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isOpen ? <X size={24} className="animate-scale-in" /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`text-gray-600 hover:text-primary transition-colors px-3 py-2 rounded-md ${
                    activeSection === item.id 
                      ? "text-primary font-semibold bg-primary/10 border-l-4 border-primary" 
                      : ""
                  } hover:bg-gray-100`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  aria-label={`Naviguer vers la section ${item.label}`}
                >
                  {item.label}
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

