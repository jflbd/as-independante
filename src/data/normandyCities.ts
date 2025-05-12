/**
 * Liste des villes d'intervention en Normandie
 * Centralisé pour faciliter la maintenance et la cohérence
 */
export const normadyCities = [
  {
    name: "Caen",
    department: "14",
    url: "/",
    isMainCity: true
  },
  {
    name: "Rouen",
    department: "76",
    url: "/",
    isMainCity: true
  },
  {
    name: "Le Havre",
    department: "76",
    url: "/",
    isMainCity: true
  },
  {
    name: "Bayeux",
    department: "14",
    url: "/",
    isMainCity: false
  },
  {
    name: "Deauville",
    department: "14",
    url: "/",
    isMainCity: false
  },
  {
    name: "Lisieux",
    department: "14",
    url: "/",
    isMainCity: false
  },
  {
    name: "Honfleur",
    department: "14",
    url: "/",
    isMainCity: false
  },
  {
    name: "Falaise",
    department: "14",
    url: "/",
    isMainCity: false
  },
  {
    name: "Evreux",
    department: "27",
    url: "/",
    isMainCity: true
  },
  {
    name: "Dieppe",
    department: "76",
    url: "/",
    isMainCity: false
  },
  {
    name: "Cherbourg",
    department: "50",
    url: "/",
    isMainCity: true
  },
  {
    name: "Saint-Lô",
    department: "50",
    url: "/",
    isMainCity: false
  },
  {
    name: "Granville",
    department: "50",
    url: "/",
    isMainCity: false
  },
  {
    name: "Alençon",
    department: "61",
    url: "/",
    isMainCity: true
  },
  {
    name: "Argentan",
    department: "61",
    url: "/",
    isMainCity: false
  }
];

/**
 * Interface pour les villes
 */
export interface City {
  name: string;
  department: string;
  url: string;
  isMainCity: boolean;
}

/**
 * Obtenir les villes par département
 */
export function getCitiesByDepartment(department: string): City[] {
  return normadyCities.filter(city => city.department === department);
}

/**
 * Obtenir les villes principales (préfectures)
 */
export function getMainCities(): City[] {
  return normadyCities.filter(city => city.isMainCity);
}

export default normadyCities;
