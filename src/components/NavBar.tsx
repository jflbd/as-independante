import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, ChevronUp, User, Building, Mail, FileText } from "lucide-react";
import SafeLink from "./SafeLink";
import { OptimizedImage } from "./OptimizedImage";
import { siteConfig } from "@/config/siteConfig";
import { Link } from "react-router-dom";
import ContactButton from "./ContactButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { scrollToSectionWithNavOffset, scrollToSubSection } from "@/utils/scroll-utils";
import { lockScroll, unlockScroll } from "@/lib/utils"; 
import { useModal } from "@/hooks/use-modal"; 
import { ModalContext } from "@/contexts/ModalContext";

const NavBar = () => {
  // Hook pour la gestion des modales
  const { openModal } = useModal();
  
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
  const [showMobileServiceDropdown, setShowMobileServiceDropdown] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [navHeight, setNavHeight] = useState(70); // Hauteur initiale de la navbar
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
  
  // Ajout d'un effet pour mesurer et mettre à jour la hauteur du nav de façon fiable
  useEffect(() => {
    const updateNavHeight = () => {
      if (navRef.current) {
        const height = navRef.current.getBoundingClientRect().height;
        if (height !== navHeight && height > 0) {
          setNavHeight(height);
          // Mettre à jour la marge du contenu principal avec un délai pour assurer la transition complète
          document.body.style.paddingTop = `${height}px`;
        }
      }
    };
    
    // Initialisation et mise à jour lors du redimensionnement
    updateNavHeight();
    
    // Créer un ResizeObserver pour suivre les changements de taille réels plutôt que juste les événements window
    const resizeObserver = new ResizeObserver(() => {
      updateNavHeight();
    });
    
    if (navRef.current) {
      resizeObserver.observe(navRef.current);
    }
    
    // Observer les mutations pour détecter les changements de hauteur
    const mutationObserver = new MutationObserver(() => {
      // Utiliser un délai court pour laisser les animations se terminer
      setTimeout(updateNavHeight, 50);
    });
    
    if (navRef.current) {
      mutationObserver.observe(navRef.current, { 
        attributes: true, 
        childList: true, 
        subtree: true 
      });
    }
    
    // Mettre à jour après les transitions CSS et après le chargement complet
    window.addEventListener('resize', updateNavHeight);
    window.addEventListener('load', updateNavHeight);
    
    // Mise à jour différée pour capturer les changements après les transitions CSS
    const timeoutIds = [
      setTimeout(updateNavHeight, 100),
      setTimeout(updateNavHeight, 300),
      setTimeout(updateNavHeight, 500)
    ];
    
    return () => {
      window.removeEventListener('resize', updateNavHeight);
      window.removeEventListener('load', updateNavHeight);
      timeoutIds.forEach(id => clearTimeout(id));
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [scrolled, isOpen, navHeight]); // Ajout de navHeight dans les dépendances
  
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
    setIsScrolling(true);
    
    // Fermer les menus avant de défiler
    setTimeout(() => {
      setIsOpen(false);
      setShowServiceDropdown(false);
      setShowMobileServiceDropdown(false);
    
      // Attendre que les animations de fermeture soient terminées
      setTimeout(() => {
        // Utiliser la fonction utilitaire de scroll
        scrollToSectionWithNavOffset(sectionId, navHeight, 20, () => {
          setIsScrolling(false);
        });
        
        setActiveSection(sectionId);
      }, 150);
    }, 50);
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
      
      const sections = [
        "accueil", "a-propos", "missions", "temoignages", 
        "services", "referentiel", "deontologie", "pricing", "contact"
      ];
      
      // Find the current section based on scroll position
      let found = false;
      const currentNavHeight = navRef.current?.getBoundingClientRect().height || navHeight;
      
      const visibleSections = sections
        .map(section => {
          const element = document.getElementById(section);
          if (!element) return { id: section, visible: false, position: Infinity };
          
          const rect = element.getBoundingClientRect();
          // Utiliser la hauteur actuelle de la navbar pour déterminer la visibilité
          const visible = rect.top - currentNavHeight <= 100 && rect.bottom >= 100 + currentNavHeight;
          return { 
            id: section, 
            visible,
            position: Math.abs(rect.top - currentNavHeight - 50) // Distance from ideal position
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
  }, [isScrolling, navHeight]); // Ajout de navHeight dans les dépendances

  // Handle body scroll locking when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      // Utiliser la fonction lockScroll au lieu de manipuler directement le style
      lockScroll();
    } else {
      // Utiliser la fonction unlockScroll au lieu de manipuler directement le style
      unlockScroll();
      // Close mobile service dropdown when menu closes
      setShowMobileServiceDropdown(false);
    }
    
    return () => {
      // Cleanup - ensure scrolling is enabled when component unmounts
      unlockScroll();
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

  // Fonction utilitaire pour défiler vers des sous-sections de services
  const scrollToServiceSection = (idx: number) => {
    // Utiliser notre fonction utilitaire pour défiler vers une sous-section
    setTimeout(() => {
      scrollToSubSection("services", idx, navHeight, 20, 300);
    }, 50);
  };

  return (
    <>
      <nav 
        ref={navRef}
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled || isOpen
            ? "bg-white/95 backdrop-blur-md shadow-lg py-2"
            : "bg-transparent py-3"
        }`}
        aria-label="Navigation principale"
        style={{ fontFamily: 'var(--font-primary)', top: 0 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-0">
            {/* Logo - Correction pour éviter le débordement sur mobile */}
            <Link to="/" className="flex items-center z-[60] relative">
              <div className="flex items-center justify-center">
                <div className="w-auto h-auto relative rounded-md p-1 my-0">
                  <OptimizedImage
                    src={siteConfig.ui.logo}
                    alt="logo Assistante Sociale indépendante"
                    className="w-auto h-auto object-contain max-h-[35px] md:max-h-[45px] opacity-100"
                    width={160}
                    height={50}
                    priority
                  />
                </div>
              </div>
            </Link>

            {/* Desktop Menu - Optimisation pour tablette */}
            <div className="hidden md:flex items-center">
              {/* Primary Navigation Items - Espacement minimal pour tablettes */}
              <div className="flex space-x-0.5 lg:space-x-4">
                {mainNavItems.map((item) => (
                  item.hasDropdown ? (
                    <div key={item.id} className="relative" ref={serviceButtonRef}>
                      <button
                        className={`
                          px-1 sm:px-1.5 md:px-2 lg:px-3 py-2 text-[10px] md:text-xs lg:text-sm rounded-full transition-all duration-300 flex items-center
                          ${activeSection === item.id || showServiceDropdown
                            ? "text-white font-semibold bg-primary shadow-md transform -translate-y-0.5" 
                            : "text-gray-600 hover:text-primary hover:bg-primary/5"}
                        `}
                        onClick={() => setShowServiceDropdown(!showServiceDropdown)}
                        aria-expanded={showServiceDropdown}
                        aria-label={`Menu ${item.label}`}
                      >
                        <span className="relative whitespace-nowrap mr-1">
                          {item.label}
                        </span>
                        {showServiceDropdown ? 
                          <ChevronUp size={12} className="transition-transform" /> : 
                          <ChevronDown size={12} className="transition-transform" />
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
                                scrollToServiceSection(idx);
                                setShowServiceDropdown(false);
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
                        px-1 sm:px-1.5 md:px-2 lg:px-3 py-2 text-[10px] md:text-xs lg:text-sm rounded-full transition-all duration-300 
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
                      <span className="relative whitespace-nowrap">
                        {item.label}
                      </span>
                    </SafeLink>
                  )
                ))}
              </div>
            </div>

            {/* Mobile Menu Button - Z-index augmenté pour iOS */}
            <div className="md:hidden flex items-center z-[60]">
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

          {/* Menu mobile - Structure optimisée pour éviter le décalage en haut */}
          {isOpen && (
            <div
              className="fixed inset-0 z-[55] md:hidden"
              onClick={() => setIsOpen(false)}
              style={{ top: 0 }}
            >
              {/* Fond opaque */}
              <div className="absolute inset-0 bg-white opacity-100"></div>
              
              {/* Zone de contenu du menu - avec position explicite depuis le haut */}
              <div 
                className="fixed inset-x-0 overflow-y-auto shadow-lg bg-white"
                onClick={(e) => e.stopPropagation()}
                style={{ 
                  top: `${navRef.current?.offsetHeight || 60}px`,
                  maxHeight: `calc(100vh - ${navRef.current?.offsetHeight || 60}px)`,
                  height: 'auto',
                  paddingTop: 0,
                  paddingBottom: 20,
                  overscrollBehavior: 'contain',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                <div className="py-0 px-4 flex flex-col space-y-3 pt-2">
                  {mainNavItems.map((item) => (
                    item.hasDropdown ? (
                      <div key={item.id}>
                        <button
                          className={`
                            w-full flex justify-between items-center px-4 py-3 text-left rounded-lg transition-all
                            ${activeSection === item.id ? "bg-primary/10 text-primary font-medium" : "text-gray-700"}
                          `}
                          onClick={() => setMobileDropdown(mobileDropdown === item.id ? null : item.id)}
                          aria-expanded={mobileDropdown === item.id}
                        >
                          <span>{item.label}</span>
                          {mobileDropdown === item.id ? 
                            <ChevronUp size={18} /> : 
                            <ChevronDown size={18} />
                          }
                        </button>
                        
                        {mobileDropdown === item.id && item.dropdownItems && (
                          <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-4">
                            {item.dropdownItems.map((subItem, idx) => (
                              <button
                                key={subItem.id}
                                className="w-full flex items-center px-4 py-3 text-left rounded-lg text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  scrollToServiceSection(idx);
                                  setIsOpen(false);
                                  setMobileDropdown(null);
                                }}
                              >
                                {subItem.icon}
                                <span className="ml-2">{subItem.label}</span>
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
                          block px-4 py-3 rounded-lg transition-all
                          ${activeSection === item.id ? "bg-primary/10 text-primary font-medium" : "text-gray-700"}
                        `}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(item.id);
                          setIsOpen(false);
                        }}
                      >
                        {item.label}
                      </SafeLink>
                    )
                  ))}
                  
                  <div className="border-t border-gray-200 my-2"></div>
                  
                  {/* Boutons de contact dans le menu mobile */}
                  <div className="grid gap-4" onClick={e => e.stopPropagation()}>
                    {/* Bouton "Me contacter" - redirige vers la section contact */}
                    <Button 
                      variant="default" 
                      className="w-full flex items-center gap-2" 
                      onClick={(e) => {
                        e.stopPropagation(); // Empêcher la propagation de l'événement
                        setIsOpen(false); // Ferme le menu mobile
                        setTimeout(() => {
                          // Défilement vers la section contact
                          scrollToSectionWithNavOffset("contact", navHeight, 20, () => {
                            setIsScrolling(false);
                          });
                          setActiveSection("contact");
                        }, 150); // Délai pour permettre la fermeture du menu
                      }}
                    >
                      <Mail size={16} />
                      Me contacter
                    </Button>

                    
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
