import { ReactNode } from 'react';

export interface BlogArticle {
  id: string;
  title: string;
  date: string;
  author: string;
  readTime: string;
  excerpt: string;
  image: string;
  tags: string[];
  content?: string;
  relatedArticles?: Array<{
    title: string;
    url: string;
    description?: string;
  }>;
}

// Liste centralisée des articles de blog
export const blogArticles: BlogArticle[] = [
  {
    id: 'role-assistante-sociale-independante',
    title: 'Le rôle d\'une assistante sociale indépendante en Normandie',
    date: '11 mai 2025',
    author: 'Rachel Gervais',
    readTime: '5 min',
    excerpt: 'Découvrez le rôle spécifique d\'une assistante sociale libérale et comment elle peut vous accompagner dans vos démarches sociales en Normandie.',
    image: '/assets/images/blog/assistante-sociale-independante-role.svg',
    tags: ['assistante sociale libérale', 'Normandie', 'accompagnement social'],
    content: `
## Le métier d'assistante sociale indépendante

Une assistante sociale indépendante, également appelée assistante sociale libérale, est une professionnelle diplômée d'État qui exerce son métier en dehors des structures traditionnelles. Contrairement aux assistantes sociales qui travaillent dans le service public (CCAS, hôpitaux, services départementaux), l'assistante sociale libérale a choisi un mode d'exercice autonome, tout en respectant le même cadre déontologique et éthique.

## Une profession encadrée et réglementée

Avant tout, il est important de préciser que pour exercer en tant qu'assistante sociale indépendante, il faut obligatoirement :

- Être titulaire du Diplôme d'État d'Assistant de Service Social (DEASS)
- Être inscrit·e aux organismes sociaux et fiscaux appropriés
- Respecter le code de déontologie de la profession
- Être soumis·e au secret professionnel (article 226-13 du Code Pénal)

## En quoi consiste mon accompagnement ?

En tant qu'assistante sociale libérale en Normandie, mon intervention s'articule autour de plusieurs axes :

### 1. L'évaluation globale de votre situation

Lors de nos premiers échanges, je prends le temps de comprendre l'ensemble de votre situation : familiale, professionnelle, financière, administrative, médicale si nécessaire. Cette évaluation me permet d'identifier vos besoins et de vous proposer un accompagnement sur mesure.

### 2. L'aide aux démarches administratives

- Constitution de dossiers (MDPH, aides sociales, retraite, etc.)
- Rédaction de courriers administratifs
- Demandes d'aides financières
- Accompagnement dans les procédures d'accès aux droits

### 3. La médiation et le conseil

- Médiation familiale
- Relations avec les institutions
- Conseil budgétaire
- Orientation vers des dispositifs adaptés

### 4. L'accompagnement spécifique

- Soutien aux personnes âgées et à leurs aidants
- Aide aux personnes en situation de handicap
- Accompagnement des familles en difficulté
- Soutien aux professionnels dans la gestion de situations complexes

## Pourquoi faire appel à une assistante sociale indépendante en Normandie ?

### Une disponibilité accrue

L'un des principaux avantages de faire appel à mes services est la disponibilité. Les services sociaux publics sont souvent surchargés, avec des délais d'attente qui peuvent atteindre plusieurs semaines, voire plusieurs mois. En tant qu'assistante sociale indépendante, je peux vous proposer un rendez-vous rapide (généralement sous 48h) et assurer un suivi régulier.

### Un accompagnement personnalisé

Je consacre le temps nécessaire à chaque situation, sans être limitée par les contraintes institutionnelles. Cette liberté me permet d'adapter précisément mon intervention à vos besoins spécifiques et d'être réactive face aux évolutions de votre situation.

### Une intervention sur toute la Normandie

J'interviens dans l'ensemble de la région normande, notamment dans les grandes agglomérations comme Caen, Rouen et Le Havre, mais également dans les zones rurales où l'accès aux services sociaux peut être plus compliqué. Je me déplace à votre domicile si nécessaire, ce qui est particulièrement adapté pour les personnes à mobilité réduite ou éloignées des services.

### Une confidentialité garantie

La confidentialité est au cœur de ma pratique. Je suis tenue au secret professionnel et m'engage à respecter strictement la confidentialité des informations que vous me confiez. Cet engagement déontologique est fondamental pour établir une relation de confiance, indispensable à un accompagnement social de qualité.

## Comment se déroule une intervention ?

### Première prise de contact

Vous pouvez me contacter par téléphone ou par email pour m'exposer brièvement votre situation et vos besoins. Nous conviendrons alors d'un premier rendez-vous, à mon cabinet ou à votre domicile selon vos possibilités.

### Premier rendez-vous d'évaluation

Cette première rencontre, d'une durée d'environ 1h30, me permet de recueillir les informations nécessaires à la compréhension de votre situation et de vos attentes. À l'issue de ce rendez-vous, je vous propose un plan d'accompagnement adapté.

### Accompagnement personnalisé

Selon vos besoins, je vous propose un accompagnement sur mesure qui peut comprendre :
- Des rendez-vous réguliers
- Des démarches administratives
- Des interventions auprès d'institutions
- La mise en relation avec des partenaires adaptés

### Suivi et bilan

Je reste disponible tout au long de l'accompagnement et vous propose un suivi régulier pour ajuster si nécessaire les actions mises en place. Un bilan est réalisé à la fin de l'accompagnement pour évaluer les résultats obtenus.

## Conclusion

En tant qu'assistante sociale indépendante en Normandie, mon objectif est de vous apporter un soutien efficace, personnalisé et réactif face à vos difficultés. N'hésitez pas à me contacter pour toute question ou pour prendre rendez-vous. Je serai ravie de mettre mes compétences à votre service pour vous accompagner vers une amélioration de votre situation.`,
    relatedArticles: [
      { 
        title: "Guide des aides sociales disponibles en Normandie", 
        url: "/blog/aides-sociales-normandie",
        description: "Un panorama complet des dispositifs d'aide disponibles dans notre région."
      },
      { 
        title: "Comment se préparer à un rendez-vous avec une assistante sociale", 
        url: "/blog/preparer-rendez-vous-assistante-sociale",
        description: "Conseils pratiques pour optimiser votre première rencontre."
      }
    ],
  },
  {
    id: 'aides-sociales-normandie',
    title: 'Guide des aides sociales disponibles en Normandie',
    date: '10 mai 2025',
    author: 'Rachel Gervais',
    readTime: '7 min',
    excerpt: 'Panorama complet des dispositifs d\'aide sociale accessibles en région normande : allocations, subventions, et accompagnements disponibles.',
    image: '/assets/images/blog/aides-sociales-normandie.svg',
    tags: ['aides sociales', 'Normandie', 'allocations', 'dispositifs'],
    content: `
## Guide complet des aides sociales en Normandie

La Normandie offre un large éventail d'aides sociales pour soutenir les personnes et familles en difficulté. Ce guide présente les principales ressources disponibles dans la région, classées par catégorie pour une meilleure lisibilité.

## Les aides au logement

### Le Fonds de Solidarité pour le Logement (FSL)

Le FSL est géré par les départements normands et propose :
- Des aides à l'accès au logement (dépôt de garantie, premier loyer)
- Des aides au maintien dans le logement (impayés de loyers)
- La prise en charge de factures d'énergie impayées
- Un accompagnement social lié au logement

Pour en bénéficier, contactez votre Conseil départemental ou votre travailleur social référent.

### Les aides de la CAF et de la MSA

- APL (Aide Personnalisée au Logement)
- ALF (Allocation de Logement Familiale)
- ALS (Allocation de Logement Sociale)

Ces aides sont calculées en fonction de vos ressources, de votre situation familiale et du montant de votre loyer.

## Les aides financières d'urgence

### Le Secours d'Urgence

Chaque département normand dispose d'un dispositif d'aide d'urgence permettant d'apporter une réponse rapide aux situations de détresse financière. Ces aides sont généralement accessibles via les CCAS (Centres Communaux d'Action Sociale) des communes.

### Les Commissions d'Aide Sociale d'Urgence

Ces commissions se réunissent régulièrement pour examiner les demandes d'aide financière exceptionnelle. Elles peuvent accorder des secours pour l'alimentation, les factures impayées ou d'autres besoins essentiels.

## Les aides spécifiques à la Normandie

### Le Pass Normandie Jeunes

Destiné aux 15-25 ans, ce dispositif régional aide les jeunes normands à financer leurs projets : permis de conduire, études, formation professionnelle, etc.

### Le Chèque Energie Normandie

En complément du chèque énergie national, la région Normandie propose dans certains cas une aide complémentaire pour les foyers en situation de précarité énergétique.

## Les aides aux personnes âgées

### L'Allocation Personnalisée d'Autonomie (APA)

Gérée par les Conseils départementaux normands, l'APA aide les personnes âgées de plus de 60 ans en perte d'autonomie à financer une partie des dépenses nécessaires pour rester à domicile ou payer les frais d'hébergement en établissement.

### Les services de maintien à domicile

De nombreux services sont disponibles en Normandie pour favoriser le maintien à domicile des seniors :
- Portage de repas
- Aide ménagère
- Téléassistance
- Adaptation du logement

## Les aides aux personnes en situation de handicap

### La Prestation de Compensation du Handicap (PCH)

Attribuée par la MDPH (Maison Départementale des Personnes Handicapées) de chaque département normand, la PCH permet de financer :
- Des aides humaines
- Des aides techniques
- L'aménagement du logement ou du véhicule
- Des aides spécifiques ou exceptionnelles

### L'Allocation aux Adultes Handicapés (AAH)

Cette aide financière est destinée aux personnes dont le taux d'incapacité est au moins de 80%, ou entre 50% et 79% avec une restriction substantielle d'accès à l'emploi.

## Les aides à l'insertion professionnelle

### Le Revenu de Solidarité Active (RSA)

Le RSA assure un revenu minimum aux personnes sans ressources et encourage l'insertion professionnelle. En Normandie, des dispositifs d'accompagnement renforcé sont proposés aux bénéficiaires.

### Les aides à la formation professionnelle

La région Normandie propose plusieurs dispositifs pour faciliter l'accès à la formation :
- Le Programme Qualif Collectif Normandie
- L'aide individuelle à la formation
- Les formations pour les demandeurs d'emploi

## Comment accéder à ces aides ?

### Les points d'accès aux droits en Normandie

Pour faciliter vos démarches, plusieurs structures peuvent vous accompagner :
- Les Centres Communaux d'Action Sociale (CCAS)
- Les Maisons du Département
- Les Points d'Accueil et d'Écoute Jeunes
- Les Centres Médico-Sociaux
- Les permanences des assistants sociaux de secteur

### Le rôle de l'assistante sociale indépendante

En tant qu'assistante sociale libérale, je peux vous accompagner dans vos démarches pour :
- Identifier les aides auxquelles vous pouvez prétendre
- Constituer vos dossiers
- Suivre l'avancement de vos demandes
- Faire valoir vos droits en cas de difficultés

## Conclusion

Ce guide n'est pas exhaustif et les dispositifs évoluent régulièrement. Pour obtenir des informations actualisées et adaptées à votre situation personnelle, n'hésitez pas à me contacter pour un accompagnement personnalisé.`,
    relatedArticles: [
      { 
        title: "Le rôle d'une assistante sociale indépendante en Normandie", 
        url: "/blog/role-assistante-sociale-independante",
        description: "Découvrez comment une assistante sociale libérale peut vous accompagner"
      },
      { 
        title: "Comment se préparer à un rendez-vous avec une assistante sociale", 
        url: "/blog/preparer-rendez-vous-assistante-sociale",
        description: "Conseils pratiques pour optimiser votre première rencontre"
      }
    ],
  },
  {
    id: 'preparer-rendez-vous-assistante-sociale',
    title: 'Comment se préparer à un rendez-vous avec une assistante sociale',
    date: '9 mai 2025',
    author: 'Rachel Gervais',
    readTime: '4 min',
    excerpt: 'Conseils pratiques pour préparer votre premier rendez-vous avec une assistante sociale et optimiser cette rencontre.',
    image: '/assets/images/blog/preparer-rendez-vous-assistante-sociale.svg',
    tags: ['rendez-vous', 'préparation', 'consultation sociale'],
    content: `
## Comment bien préparer votre rendez-vous avec une assistante sociale

La première rencontre avec une assistante sociale peut susciter des interrogations, voire des appréhensions. Ce guide pratique vous aidera à préparer au mieux ce rendez-vous pour qu'il soit le plus efficace possible et réponde à vos attentes.

## Les objectifs d'un premier rendez-vous

Lors de cette première rencontre, l'assistante sociale va chercher à :
- Comprendre votre situation globale
- Identifier vos besoins et vos attentes
- Évaluer les dispositifs d'aide auxquels vous pourriez avoir droit
- Établir avec vous un plan d'accompagnement adapté

Votre préparation en amont facilitera cette démarche et optimisera le temps de l'entretien.

## La préparation administrative : les documents à rassembler

### Documents d'identité et situation familiale

- Pièce d'identité (carte d'identité, passeport, titre de séjour)
- Livret de famille
- Attestation de sécurité sociale ou carte vitale
- Justificatif de situation familiale (jugement de divorce, attestation PACS, etc.)

### Documents financiers

- Derniers bulletins de salaire
- Attestations de paiement des allocations (CAF, Pôle Emploi, retraite)
- Dernier avis d'imposition
- Relevés bancaires des trois derniers mois
- Justificatifs des charges courantes (loyer, électricité, gaz, assurances)

### Documents concernant votre logement

- Contrat de bail ou titre de propriété
- Dernière quittance de loyer
- Factures d'énergie récentes
- Assurance habitation

### Documents spécifiques selon votre situation

Si vous avez des dettes :
- Récapitulatifs des sommes dues
- Courriers de relance ou de mise en demeure
- Plan d'apurement existant

Si vous avez des problèmes de santé :
- Certificats médicaux récents
- Notifications MDPH si vous en avez
- Ordonnances en cours

## Préparer votre discours

### Réfléchir à l'avance à votre situation

Prenez le temps, avant le rendez-vous, de réfléchir à :
- Les événements qui vous ont conduit à solliciter cette aide
- Les difficultés que vous rencontrez actuellement
- Ce que vous avez déjà entrepris pour résoudre ces difficultés
- Vos attentes vis-à-vis de cet accompagnement

### Noter vos questions

N'hésitez pas à préparer une liste de questions. Par exemple :
- Quelles aides pourraient correspondre à ma situation ?
- Quelles sont les démarches à entreprendre en priorité ?
- Quels sont les délais d'obtention des aides ?
- Comment se déroulera l'accompagnement ?

## Pendant l'entretien

### Adopter une attitude constructive

- Soyez ponctuel
- Expliquez clairement votre situation sans omettre d'éléments importants
- Restez ouvert aux propositions de l'assistante sociale
- N'hésitez pas à demander des précisions si certains points ne sont pas clairs

### Prendre des notes

Il est conseillé de noter les informations importantes pendant l'entretien :
- Les démarches à entreprendre
- Les documents complémentaires à fournir
- Les coordonnées des organismes à contacter
- La date du prochain rendez-vous

## Après l'entretien

### Mettre en œuvre les démarches conseillées

Dès que possible après le rendez-vous :
- Rassemblez les documents complémentaires demandés
- Effectuez les démarches suggérées
- Contactez les organismes ou personnes recommandés

### Tenir un journal de vos démarches

Pour faciliter le suivi, notez :
- La date de chaque démarche effectuée
- Le nom des personnes contactées
- Les réponses obtenues
- Les difficultés rencontrées

## Les spécificités d'un rendez-vous avec une assistante sociale indépendante

### Une approche personnalisée

En tant qu'assistante sociale indépendante, j'accorde une attention particulière à :
- La confidentialité de nos échanges
- La disponibilité et la flexibilité des rendez-vous
- L'accompagnement sur mesure adapté à votre situation
- Le rythme approprié à votre situation

### La question des honoraires

Lors du premier contact, nous aborderons la question des honoraires :
- Le tarif des consultations
- Les possibilités de prise en charge
- Les modalités de règlement

## Conclusion

Un rendez-vous bien préparé avec une assistante sociale permet d'optimiser le temps d'échange et d'accélérer la mise en place des solutions adaptées à votre situation. N'hésitez pas à me contacter pour toute question préalable à notre rencontre.`,
    relatedArticles: [
      { 
        title: "Le rôle d'une assistante sociale indépendante en Normandie", 
        url: "/blog/role-assistante-sociale-independante",
        description: "Découvrez comment une assistante sociale libérale peut vous accompagner"
      },
      { 
        title: "Guide des aides sociales disponibles en Normandie", 
        url: "/blog/aides-sociales-normandie",
        description: "Un panorama complet des dispositifs d'aide disponibles dans notre région"
      }
    ],
  }
];
