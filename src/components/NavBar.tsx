
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
      setActiveSection(sectionId);
    }
  };

  // Track scroll position to highlight active section
  useEffect(() => {
    const handleScroll = () => {
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
  }, []);

  // Liste des sections pour le menu
  const navItems = [
    { id: "accueil", label: "Accueil" },
    { id: "a-propos", label: "Qui suis-je ?" },
    { id: "missions", label: "Mes missions" },
    { id: "services", label: "Mes services" },
    { id: "referentiel", label: "Référentiel" },
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
              src="/public/lovable-uploads/afb2d7e4-424f-4531-a659-f56373a4175d.png" 
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
                  activeSection === item.id ? "text-primary font-medium" : ""
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
                  className={`text-gray-600 hover:text-primary transition-colors px-2 py-1 rounded-md ${
                    activeSection === item.id ? "text-primary font-medium bg-primary/5" : ""
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
