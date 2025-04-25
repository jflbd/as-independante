import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, ChevronUp, User, Building } from "lucide-react";
import SafeLink from "./SafeLink";
import OptimizedImage from "./OptimizedImage";
import { siteConfig } from "@/config/siteConfig";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
  const [showMobileServiceDropdown, setShowMobileServiceDropdown] = useState(false);
  const serviceDropdownRef = useRef<HTMLDivElement>(null);
  const serviceButtonRef = useRef<HTMLDivElement>(null);
  
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

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      setIsScrolling(true);
      setIsOpen(false); // Close mobile menu before scrolling
      setShowServiceDropdown(false); // Close service dropdown
      
      // Use setTimeout to allow menu to close before scrolling
      setTimeout(() => {
        const navHeight = document.querySelector('nav')?.offsetHeight || 0;
        const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
        
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
      
      const navHeight = document.querySelector('nav')?.offsetHeight || 0;
      const sections = [
        "accueil", "a-propos", "missions", "temoignages", 
        "services", "referentiel", "deontologie", "ebook", "pricing", "contact"
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
    { id: "ebook", label: "Ebook" },
    { id: "pricing", label: "Tarifs" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg py-2" 
          : "bg-transparent py-4"
      }`}
      aria-label="Navigation principale"
      style={{ fontFamily: 'var(--font-primary)' }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo and Name */}
          <SafeLink 
            to="#accueil" 
            className="transition-all duration-300 hover:scale-105 group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              setActiveSection("accueil");
              setIsOpen(false);
            }}
            aria-label="Retour à l'accueil"
          >
            <div className="relative h-16 md:h-20 w-auto overflow-hidden rounded-md shadow-md transition-all duration-300 group-hover:shadow-lg">
              <OptimizedImage 
                src={siteConfig.ui.logo}
                alt={`${siteConfig.name} - Assistante Sociale Indépendante`}
                className="h-full w-auto object-contain"
                loading="eager"
                width={240}
                height={80}
              />
            </div>
          </SafeLink>

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
                        className="absolute top-full mt-1 w-64 bg-white rounded-lg shadow-lg py-2 animate-fade-in-down origin-top-right"
                        onMouseLeave={() => setShowServiceDropdown(false)}
                      >
                        {item.dropdownItems?.map((subItem) => (
                          <button
                            key={subItem.id}
                            className="w-full text-left px-4 py-2 flex items-center text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                            onClick={() => {
                              scrollToSection("services");
                              setShowServiceDropdown(false);
                              // Vous pouvez ajouter une logique pour faire défiler jusqu'à une sous-section spécifique si nécessaire
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

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 animate-fade-in fixed inset-x-0 top-[4.5rem] overflow-y-auto bg-white/95 backdrop-blur-lg shadow-xl max-h-[calc(100vh-4.5rem)] z-50">
            <div className="container mx-auto px-4">
              <div className="flex flex-col space-y-1 p-4 rounded-xl">
                {mainNavItems.map((item) => (
                  <div key={item.id}>
                    {item.hasDropdown ? (
                      <>
                        <button
                          className={`
                            flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all duration-300 
                            ${activeSection === item.id 
                              ? "text-white font-semibold bg-primary border-l-4 border-primary/60" 
                              : "text-gray-600 hover:text-primary hover:bg-primary/5 border-l-4 border-transparent"}
                          `}
                          onClick={() => setShowMobileServiceDropdown(!showMobileServiceDropdown)}
                          aria-expanded={showMobileServiceDropdown}
                        >
                          <span>{item.label}</span>
                          {showMobileServiceDropdown ? 
                            <ChevronUp size={18} className="transition-transform" /> : 
                            <ChevronDown size={18} className="transition-transform" />
                          }
                        </button>
                        
                        {showMobileServiceDropdown && (
                          <div className="pl-4 mt-1 mb-2 space-y-1 animate-fade-in">
                            {item.dropdownItems?.map((subItem) => (
                              <button
                                key={subItem.id}
                                className="w-full text-left px-4 py-3 flex items-center text-gray-600 hover:bg-primary/5 hover:text-primary transition-colors rounded-lg"
                                onClick={() => {
                                  scrollToSection("services");
                                }}
                              >
                                {subItem.icon}
                                <span>{subItem.label}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <SafeLink
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
                        aria-current={activeSection === item.id ? "page" : undefined}
                      >
                        <ChevronDown 
                          size={16} 
                          className={`transform transition-transform duration-300 ${
                            activeSection === item.id ? "rotate-180 text-white" : ""
                          }`} 
                        />
                        <span>{item.label}</span>
                      </SafeLink>
                    )}
                  </div>
                ))}
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
