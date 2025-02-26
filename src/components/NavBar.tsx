
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <a href="/" className="text-2xl font-serif font-bold text-primary">
            AS Indépendante
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <a href="#accueil" className="text-gray-600 hover:text-primary transition-colors">
              Accueil
            </a>
            <a href="#a-propos" className="text-gray-600 hover:text-primary transition-colors">
              À propos
            </a>
            <a href="#services" className="text-gray-600 hover:text-primary transition-colors">
              Services
            </a>
            <a href="#contact" className="text-gray-600 hover:text-primary transition-colors">
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
                onClick={() => setIsOpen(false)}
              >
                Accueil
              </a>
              <a
                href="#a-propos"
                className="text-gray-600 hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                À propos
              </a>
              <a
                href="#services"
                className="text-gray-600 hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Services
              </a>
              <a
                href="#contact"
                className="text-gray-600 hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
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
