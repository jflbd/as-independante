
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
    { id: "services", label: "Services" },
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
            className="text-2xl font-serif font-bold text-primary"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              setActiveSection("accueil");
            }}
          >
            AS Indépendante
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <a 
                key={item.id}
                href={`#${item.id}`} 
                className={`text-gray-600 hover:text-primary transition-colors text-sm ${
                  activeSection === item.id ? "text-primary font-medium" : ""
                }`}
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
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
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
                  className={`text-gray-600 hover:text-primary transition-colors ${
                    activeSection === item.id ? "text-primary font-medium" : ""
                  }`}
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
