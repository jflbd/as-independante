
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

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
            }}
          >
            AS Indépendante
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <a 
              href="#accueil" 
              className="text-gray-600 hover:text-primary transition-colors"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("accueil");
              }}
            >
              Accueil
            </a>
            <a 
              href="#a-propos" 
              className="text-gray-600 hover:text-primary transition-colors"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("a-propos");
              }}
            >
              Qui suis-je ?
            </a>
            <a 
              href="#services" 
              className="text-gray-600 hover:text-primary transition-colors"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("services");
              }}
            >
              Services
            </a>
            <a 
              href="#contact" 
              className="text-gray-600 hover:text-primary transition-colors"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <a
                href="#accueil"
                className="text-gray-600 hover:text-primary transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("accueil");
                }}
              >
                Accueil
              </a>
              <a
                href="#a-propos"
                className="text-gray-600 hover:text-primary transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("a-propos");
                }}
              >
                Qui suis-je ?
              </a>
              <a
                href="#services"
                className="text-gray-600 hover:text-primary transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("services");
                }}
              >
                Services
              </a>
              <a
                href="#contact"
                className="text-gray-600 hover:text-primary transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
