/**
 * Fichier utilitaire contenant les fonctions liées au défilement et à la navigation
 */

/**
 * Fait défiler la page vers une section spécifique avec un décalage configurable
 * @param sectionId - ID de la section vers laquelle défiler (sans le #)
 * @param offset - Décalage optionnel en pixels (par défaut: 80px)
 */
export const scrollToSectionWithOffset = (sectionId: string, offset: number = 80): void => {
  const targetElement = document.getElementById(sectionId);
  if (!targetElement) return;

  const elementPosition = targetElement.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });
};

/**
 * Fait défiler la page vers le haut
 * @param behavior - Comportement du défilement ('auto' ou 'smooth'), par défaut: 'smooth'
 */
export const scrollToTop = (behavior: ScrollBehavior = 'smooth'): void => {
  window.scrollTo({
    top: 0,
    behavior
  });
};

/**
 * Fait défiler la page vers le bas
 * @param behavior - Comportement du défilement ('auto' ou 'smooth'), par défaut: 'smooth'
 */
export const scrollToBottom = (behavior: ScrollBehavior = 'smooth'): void => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior
  });
};

/**
 * Fait défiler la page vers une section spécifique en tenant compte de la hauteur de la navbar
 * @param sectionId - ID de la section vers laquelle défiler (sans le #)
 * @param navHeight - Hauteur de la barre de navigation en pixels
 * @param additionalOffset - Décalage supplémentaire en pixels (par défaut: 20px)
 * @param callback - Fonction de rappel optionnelle à exécuter après le défilement
 */
export const scrollToSectionWithNavOffset = (
  sectionId: string, 
  navHeight: number, 
  additionalOffset: number = 20,
  callback?: () => void
): void => {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const sectionTop = section.getBoundingClientRect().top + window.scrollY;
  
  window.scrollTo({
    top: sectionTop - navHeight - additionalOffset,
    behavior: "smooth"
  });
  
  // Exécuter le callback après l'animation si fourni
  if (callback) {
    setTimeout(callback, 1000); // Délai standard pour animation de défilement
  }
};

/**
 * Fait défiler la page vers une sous-section spécifique à l'intérieur d'une section principale
 * @param mainSectionId - ID de la section principale (ex: "services")
 * @param subSectionIndex - Index de la sous-section à cibler (0, 1, etc.)
 * @param navHeight - Hauteur de la navbar en pixels
 * @param additionalOffset - Décalage supplémentaire en pixels (par défaut: 20px)
 * @param delay - Délai avant de défiler vers la sous-section (par défaut: 300ms)
 * @param selector - Sélecteur CSS pour trouver les sous-sections (par défaut: 'article')
 */
export const scrollToSubSection = (
  mainSectionId: string,
  subSectionIndex: number,
  navHeight: number,
  additionalOffset: number = 20,
  delay: number = 300,
  selector: string = 'article'
): void => {
  // D'abord, faire défiler vers la section principale
  scrollToSectionWithNavOffset(mainSectionId, navHeight, additionalOffset);
  
  // Puis, après un délai, cibler la sous-section spécifique
  setTimeout(() => {
    const mainSection = document.getElementById(mainSectionId);
    if (!mainSection) return;
    
    const subSections = mainSection.querySelectorAll(selector);
    if (subSections && subSections.length > subSectionIndex) {
      const targetSection = subSections[subSectionIndex];
      const sectionTop = targetSection.getBoundingClientRect().top + window.scrollY;
      
      window.scrollTo({
        top: sectionTop - navHeight - additionalOffset,
        behavior: "smooth"
      });
    }
  }, delay);
};

/**
 * Fonction dédiée pour la navigation dans les mentions légales
 * @param sectionId - ID de la section des mentions légales vers laquelle défiler
 * @param pushHistory - Si true, met à jour l'URL avec l'ancre (par défaut: true)
 */
export const navigateToLegalSection = (sectionId: string, pushHistory: boolean = true): void => {
  // Force le recalcul de la position après un court délai
  setTimeout(() => {
    const section = document.getElementById(sectionId);
    if (!section) {
      console.warn(`Section "${sectionId}" non trouvée dans le document.`);
      return;
    }

    // Obtenir le header des mentions légales
    const headerElement = document.querySelector('header');
    const headerHeight = headerElement ? headerElement.getBoundingClientRect().height : 80;
    
    // Calcul du décalage avec une valeur fixe pour assurer la cohérence
    const additionalOffset = 20;
    const totalOffset = headerHeight + additionalOffset;
    
    // Recalcul de la position absolue (depuis le haut de la page)
    const sectionRect = section.getBoundingClientRect();
    const absoluteTop = sectionRect.top + window.pageYOffset;
    
    // Appliquer le défilement avec l'offset
    window.scrollTo({
      top: absoluteTop - totalOffset,
      behavior: "smooth"
    });
    
    // Mise à jour de l'URL si demandé
    if (pushHistory) {
      window.history.pushState(null, "", `#${sectionId}`);
    }
    
    // Mettre en évidence visuellement la section
    section.classList.add('highlight-section');
    setTimeout(() => {
      section.classList.remove('highlight-section');
    }, 1000);
    
    // En cas d'erreur de position, réessayer après un délai plus long
    setTimeout(() => {
      const newRect = section.getBoundingClientRect();
      // Si la section n'est toujours pas correctement positionnée (trop haut ou trop bas)
      if (newRect.top < 70 || newRect.top > 150) {
        const newAbsoluteTop = newRect.top + window.pageYOffset;
        window.scrollTo({
          top: newAbsoluteTop - totalOffset,
          behavior: "smooth"
        });
      }
    }, 500);
  }, 100);
};