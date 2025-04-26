import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, ChevronUp, User, Building } from "lucide-react";
import SafeLink from "./SafeLink";
import { OptimizedImage } from "./OptimizedImage";
import { siteConfig } from "@/config/siteConfig";
import { Link } from "react-router-dom";
import ContactButton from "./ContactButton";
import QuoteButton from "./QuoteButton";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
  const [showMobileServiceDropdown, setShowMobileServiceDropdown] = useState(false);
  const serviceDropdownRef = useRef<HTMLDivElement>(null);
  const serviceButtonRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();
  
  // Pour accessibilité - contrôle du menu par clavier
  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setShowServiceDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, []);
  
  // Fermer le dropdown quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        showServiceDropdown &&
        serviceDropdownRef.current &&
        serviceButtonRef.current &&
        !serviceDropdownRef.current.contains(e.target as Node) &&
        !serviceButtonRef.current.contains(e.target as Node)
      ) {
        setShowServiceDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showServiceDropdown]);

  // Fermer le menu mobile quand on change de page
  useEffect(() => {
    setIsOpen(false);
    setShowServiceDropdown(false);
    setShowMobileServiceDropdown(false);
  }, [location.pathname]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      setIsScrolling(true);
      
      // Fermer les menus avant de défiler
      setTimeout(() => {
        setIsOpen(false);
        setShowServiceDropdown(false);
        setShowMobileServiceDropdown(false);
      
        // Attendre que les animations de fermeture soient terminées
        setTimeout(() => {
          const navHeight = navRef.current?.offsetHeight || 0;
          const sectionTop = section.getBoundingClientRect().top + window.scrollY;
          
          // Scroll avec offset pour la hauteur du menu fixe
          window.scrollTo({
            top: sectionTop - navHeight - 20, // 20px additional padding
            behavior: "smooth"
          });
          
          setActiveSection(sectionId);
          
          // Reset scrolling state after animation completes
          setTimeout(() => {
            setIsScrolling(false);
          }, 1000);
        }, 150);
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
      
      const navHeight = navRef.current?.offsetHeight || 0;
      const sections = [
        "accueil", "a-propos", "missions", "temoignages", 
        "services", "referentiel", "deontologie", "pricing", "contact"
      ];
      
      // Find the current section based on scroll position
      let found = false;
      const visibleSections = sections
        .map(section => {
          const element = document.getElementById(section);
          if (!element) return { id: section, visible: false, position: Infinity };
          
          const rect = element.getBoundingClientRect();
          const visible = rect.top - navHeight <= 100 && rect.bottom >= 100 + navHeight;
          return { 
            id: section, 
            visible,
            position: Math.abs(rect.top - navHeight - 50) // Distance from ideal position
          };
        })
        .filter(section => section.visible)
        .sort((a, b) => a.position - b.position); // Sort by closest to ideal position
      
      if (visibleSections.length > 0) {
        setActiveSection(visibleSections[0].id);
        found = true;
      }
      
      // Fallback to first section if none are visible and we're at the top
      if (!found && window.scrollY <= 100) {
        setActiveSection("accueil");
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
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
      // Close mobile service dropdown when menu closes
      setShowMobileServiceDropdown(false);
    }
    
    return () => {
      // Cleanup - ensure scrolling is enabled when component unmounts
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const mainNavItems = [
    { id: "accueil", label: "Accueil" },
    { id: "a-propos", label: "Mon parcours" },
    { id: "missions", label: "Mes missions" },
    { id: "temoignages", label: "Témoignages" },
    { 
      id: "services", 
      label: "Mes services",
      hasDropdown: true,
      dropdownItems: [
        { id: "services-particulier", label: "Pour particuliers", icon: <User className="h-4 w-4 mr-2" /> },
        { id: "services-professionnel", label: "Pour professionnels", icon: <Building className="h-4 w-4 mr-2" /> },
      ]
    },
    { id: "referentiel", label: "Cadre d'intervention" },
    { id: "deontologie", label: "Déontologie" },
    { id: "pricing", label: "Tarifs" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav 
      ref={navRef}
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled || isOpen
          ? "bg-white/95 backdrop-blur-md shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
      aria-label="Navigation principale"
      style={{ fontFamily: 'var(--font-primary)' }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          {/* Logo - Correction de l'affichage pour mobile */}
          <Link to="/" className="flex items-center">
            <div className="flex items-center justify-center relative">
              <div className="relative w-auto h-10 sm:h-12 md:h-16 z-10">
                <OptimizedImage
                  src="/assets/logo/logo-rachel-gervais.png"
                  alt="logo Assistante Sociale indépendante"
                  className="h-full w-auto object-contain"
                  width={180}
                  height={60}
                  priority
                />
              </div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            {/* Primary Navigation Items */}
            <div className="flex space-x-1 lg:space-x-2">
              {mainNavItems.map((item) => (
                item.hasDropdown ? (
                  <div key={item.id} className="relative" ref={serviceButtonRef}>
                    <button
                      className={`
                        px-3 py-2 text-sm rounded-full transition-all duration-300 flex items-center
                        ${activeSection === item.id || showServiceDropdown
                          ? "text-white font-semibold bg-primary shadow-md transform -translate-y-0.5" 
                          : "text-gray-600 hover:text-primary hover:bg-primary/5"}
                      `}
                      onClick={() => setShowServiceDropdown(!showServiceDropdown)}
                      aria-expanded={showServiceDropdown}
                      aria-label={`Menu ${item.label}`}
                    >
                      <span className="relative mr-1">
                        {item.label}
                      </span>
                      {showServiceDropdown ? 
                        <ChevronUp size={16} className="transition-transform" /> : 
                        <ChevronDown size={16} className="transition-transform" />
                      }
                    </button>
                    
                    {/* Dropdown Menu */}
                    {showServiceDropdown && (
                      <div 
                        ref={serviceDropdownRef}
                        className="absolute top-full mt-1 w-64 bg-white rounded-lg shadow-lg py-2 animate-fade-in-down origin-top-right z-50"
                        onMouseLeave={() => setShowServiceDropdown(false)}
                      >
                        {item.dropdownItems?.map((subItem, idx) => (
                          <button
                            key={subItem.id}
                            className="w-full text-left px-4 py-2 flex items-center text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                            onClick={(e) => {
                              e.stopPropagation(); // Empêcher la propagation de l'événement
                              scrollToSection("services");
                              setShowServiceDropdown(false);
                              
                              // Ajout d'un délai pour permettre au scrollToSection de finir
                              setTimeout(() => {
                                // Sélection des articles dans la section services (particuliers ou professionnels)
                                const articles = document.querySelectorAll('#services article');
                                if (articles && articles.length >= 2) {
                                  const targetSection = idx === 0 ? articles[0] : articles[1];
                                  const navHeight = navRef.current?.offsetHeight || 0;
                                  const sectionTop = targetSection.getBoundingClientRect().top + window.scrollY;
                                  
                                  window.scrollTo({
                                    top: sectionTop - navHeight - 20,
                                    behavior: "smooth"
                                  });
                                }
                              }, 200);
                            }}
                          >
                            {subItem.icon}
                            <span>{subItem.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
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
                    aria-current={activeSection === item.id ? "page" : undefined}
                  >
                    <span className="relative">
                      {item.label}
                    </span>
                  </SafeLink>
                )
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              className="rounded-full p-2 bg-primary/10 text-primary transition-all duration-300 hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? 
                <X size={24} className="animate-scale-in" /> : 
                <Menu size={24} />
              }
            </button>
          </div>
        </div>

        {/* Menu mobile - Correction du défilement */}
        {isOpen && (
          <div
            className="fixed inset-0 z-40 bg-white/80 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <div 
              className="fixed inset-x-0 top-0 z-50 overflow-y-auto bg-white shadow-lg"
              onClick={(e) => e.stopPropagation()}
              style={{ 
                top: navRef.current ? `${navRef.current.offsetHeight}px` : '56px',
                maxHeight: '85vh', // Limitation à 85% de la hauteur de la fenêtre
                height: 'auto',   // Hauteur automatique basée sur le contenu
                overscrollBehavior: 'contain' // Empêcher le scroll de se propager au body
              }}
            >
              <div className="py-6 px-4 flex flex-col space-y-4">
                {mainNavItems.map((item) => (
                  item.hasDropdown ? (
                    <div key={item.id} className="flex flex-col">
                      <button
                        onClick={() => setShowMobileServiceDropdown(!showMobileServiceDropdown)}
                        className="text-lg font-medium transition-colors hover:text-primary py-2 flex items-center justify-between"
                      >
                        <span>{item.label}</span>
                        {showMobileServiceDropdown ? 
                          <ChevronUp size={16} className="transition-transform" /> : 
                          <ChevronDown size={16} className="transition-transform" />
                        }
                      </button>
                      
                      {showMobileServiceDropdown && (
                        <div className="pl-4 flex flex-col space-y-2 mt-2">
                          {item.dropdownItems?.map((subItem, idx) => (
                            <button
                              key={subItem.id}
                              className="text-md flex items-center transition-colors hover:text-primary py-2 active:bg-gray-50 w-full text-left"
                              onClick={() => {
                                scrollToSection("services");
                                // Ajout d'un délai pour permettre au scrollToSection de finir
                                setTimeout(() => {
                                  // Sélection des articles dans la section services (particuliers ou professionnels)
                                  const articles = document.querySelectorAll('#services article');
                                  if (articles && articles.length >= 2) {
                                    const targetSection = idx === 0 ? articles[0] : articles[1];
                                    const navHeight = navRef.current?.offsetHeight || 0;
                                    const sectionTop = targetSection.getBoundingClientRect().top + window.scrollY;
                                    
                                    window.scrollTo({
                                      top: sectionTop - navHeight - 20,
                                      behavior: "smooth"
                                    });
                                  }
                                }, 300);
                              }}
                            >
                              {subItem.icon}
                              <span>{subItem.label}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <SafeLink
                      key={item.id}
                      to={`#${item.id}`}
                      className={`text-lg font-medium transition-colors hover:text-primary py-2 active:bg-gray-50 block w-full ${
                        activeSection === item.id ? "text-primary font-semibold" : "text-gray-600"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.id);
                      }}
                    >
                      {item.label}
                    </SafeLink>
                  )
                ))}
                
                <div className="pt-6 mt-4 border-t border-gray-200 flex flex-col space-y-4">
                  <ContactButton variant="default" className="w-full justify-center" />
                  <QuoteButton variant="outline" className="w-full justify-center" />
                  {/* Ajout d'un espace en bas pour améliorer le défilement sur mobile */}
                  <div className="h-12"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Ligne indicatrice en haut du menu quand on scroll */}
      <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary transition-all duration-500 ${scrolled ? 'w-full opacity-100' : 'w-0 opacity-0'}`}></div>
    </nav>
  );
};

export default NavBar;
