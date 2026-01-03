import React from 'react';
import './htmlContent.css';

/**
 * Composant pour afficher du contenu HTML en toute sécurité
 * Nettoie les balises potentiellement dangereuses
 */
export const HtmlContent = ({ html, className = '' }) => {
  if (!html) return null;

  // Nettoyer le HTML en supprimant les scripts et les événements
  const sanitizeHtml = (content) => {
    const div = document.createElement('div');
    div.innerHTML = content;
    
    // Supprimer les scripts
    const scripts = div.querySelectorAll('script');
    scripts.forEach(script => script.remove());
    
    // Supprimer les attributs onclick, onerror, etc.
    const allElements = div.querySelectorAll('*');
    allElements.forEach(el => {
      const attrs = Array.from(el.attributes || []);
      attrs.forEach(attr => {
        if (attr.name.startsWith('on')) {
          el.removeAttribute(attr.name);
        }
      });
    });
    
    return div.innerHTML;
  };

  const cleanHtml = sanitizeHtml(html);

  return (
    <div
      className={`html-content ${className}`}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
};

/**
 * Extraire le texte brut d'un contenu HTML
 */
export const stripHtmlTags = (html) => {
  if (!html) return '';
  if (typeof window === 'undefined') {
    // Mode SSR
    return html.replace(/<[^>]*>/g, '').trim();
  }
  // Mode client
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};

/**
 * Limiter le texte à une certaine longueur
 */
export const truncateHtml = (html, length = 100) => {
  const text = stripHtmlTags(html);
  if (text.length > length) {
    return text.substring(0, length).trim() + '...';
  }
  return text;
};
