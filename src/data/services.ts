import { ArrowRight, Check, Heart, Home, FileText, DollarSign, Users, User, Briefcase, BookOpen } from "lucide-react";

export const services = [
  {
    title: "Vous êtes un Particulier",
    description: "Vous avez une demande ponctuelle, un besoin de conseil, d'écoute, de soutien, ou d'un accompagnement plus approfondi dans la durée, je suis là pour vous !",
    scenarios: [
      { icon: Home, text: "Mes enfants ont quitté le domicile, je souhaite obtenir un logement plus petit." },
      { icon: FileText, text: "Je ne sais pas comment remplir ma déclaration d'impôts." },
      { icon: FileText, text: "J'ai besoin d'aide pour remplir mon dossier de demande de retraite." },
      { icon: DollarSign, text: "J'ai des problèmes dans la gestion de mon budget." },
      { icon: User, text: "Je me sens seul(e), isolé(e)..." },
      { icon: FileText, text: "Je suis perdue dans les démarches administratives." },
      { icon: DollarSign, text: "J'ai trop de dettes, je ne m'en sors plus." },
      { icon: Briefcase, text: "Suite à un accident de travail je me retrouve en invalidité, mon entreprise ne peut pas me reclasser. Comment-faire ?" },
      { icon: Heart, text: "Parfois mon conjoint me fait peur et ne me respecte pas. Je pense à le quitter, mais je l'aime. J'ai besoin de conseils." },
      { icon: Users, text: "Ma sœur dépense son argent n'importe comment, elle est vulnérable et influençable. On m'a parlé d'une tutelle, qu'est ce que c'est ?" },
      { icon: Users, text: "Mes parents vieillissent et ne sont plus en sécurité chez eux, comment les aider ?" },
      { icon: Heart, text: "Je ne peux plus passer une journée sans boire d'alcool, cela a des conséquences sur ma vie sociale." },
    ],
    details: [
      "Il s'agit d'une prestation de service, qui vous est directement adressée, sans intermédiaire.",
      "Il est important de savoir que mon métier est répertorié à l'Agence Régional de Santé dans le secteur d'activité médico-social.",
    ],
    interventions: [
      "Mon intervention débute par un premier entretien d'évaluation et de diagnostic",
      "En fonction de la problématique et de la demande, l'aide pourra s'étaler dans le temps pour devenir un véritable accompagnement social global.",
      "Dans le cadre de cette mission, je suis amenée à constituer divers dossiers : dossier DALO (Droit au Logement Opposable), surendettement, ACS (Aide Complémentaire Santé), CSS (Complémentaire Santé Solidaire), demande de retraite, dossier MDPH (Maison Départementale des Personnes Handicapées), demande de mise sous protection, demande de logement, renouvellement et/ou demandes de titre de séjour…"
    ]
  },
  {
    title: "Vous êtes un Professionnel",
    description: "PEU IMPORTE VOTRE SECTEUR D'ACTIVITE, JE M'ADAPTE A VOS BESOINS ET AUX BESOINS DE VOS SALARIES.",
    highlights: [
      { title: "VOUS ÊTES SOUCIEUX DU BIEN ÊTRE DE VOS SALARIÉS", description: "Vous souhaitez prévenir les risques psycho-sociaux." },
      { title: "VOUS ÊTES SENSIBLE AUX TAUX D'ABSENTÉISME DE VOS SALARIÉS", description: "Vous êtes conscient qu'une situation personnelle difficile peut avoir un impact sur la situation professionnelle et l'activité au sein de l'entreprise." },
      { title: "VOUS SOUHAITEZ TRAVAILLER AU SEIN D'UNE AMBIANCE BIENVEILLANTE", description: "Vous avez besoin de médiation afin de faciliter le dialogue avec vos employés." },
      { title: "VOUS ÊTES UN BAILLEUR OU UNE AGENCE IMMOBILIÈRE", description: "Vous souhaitez prévenir les expulsions locatives." },
      { title: "VOUS ÊTES UNE ENTREPRISE D'AIDE À LA PERSONNE", description: "Vos salariés ont besoin d'un appui pour répondre aux différentes questions des bénéficiaires et de leurs familles." },
      { title: "VOUS ÊTES UNE COLLECTIVITÉ", description: "Vous souhaitez apporter un service de qualité à vos agents." },
    ],
    companies: [
      {
        type: "Vous êtes une entreprise :",
        description: "Je viens en aide à vos salariés et vos agents et je représente un soutien à votre service RH. Avant d'être salariée, une personne est un individu à part entière avec une famille, un réseau, un environnement. Chaque personne salariée peut rencontrer à un moment donné des difficultés de différents ordres : problèmes financiers, de santé, familiaux, de logement, d'addiction, professionnels… Mon rôle est de réaliser un accompagnement social global par la mise en œuvre de différentes actions : soutien, écoute, orientation, constitution de dossiers divers (surendettement, demande de mutuelle, demande de logement…), aide à la gestion budgétaire, lien avec les professionnels de santé, médiation…"
      },
      {
        type: "Vous êtes une collectivité :",
        description: "Mon but est d'offrir des conditions de travail optimales à vos agents en agissant sur leur confort personnel et professionnel. L'intérêt pour la collectivité est d'améliorer le service rendu à l'usager, d'avoir des agents épanouis et opérationnels dans le respect des grands principes de leurs missions de service public tels que la mutabilité et la continuité par exemple. Il s'agit de leur offrir un lieu d'écoute et de soutien et un accompagnement social adapté à leur situation en cas d'absence de service social du personnel. Mon intervention est basée sur le plan personnel mais aussi sur le plan professionnel en abordant le déroulement de carrière des agents, les évolutions possibles, le passage de concours, la possibilité de mobilité interne en lien avec le service RH… afin d'optimiser les différents services publics."
      },
      {
        type: "Vous êtes un bailleur social ou une agence immobilière :",
        description: "J'interviens auprès de vos locataires. De nombreuses personnes font l'objet d'expulsions locatives et j'ai pu observer que beaucoup de leurs difficultés auraient pu être évitées, ou amoindries, si un travail de prévention avait été fait en amont. Cette démarche est indispensable pour connaître l'origine du non paiement des loyers, et pouvoir venir en aide aux personnes en trouvant des solutions avant la mise en place d'une procédure. Il s'agit de travailler sur le parcours logement des personnes et d'actionner les différentes aides existantes : mise en place d'un plan d'apurement, dossier FSL maintien (Fond Solidarité Logement), dossier Action Logement, travail autour de la gestion budgétaire, demande d'une mutation de bail…"
      },
      {
        type: "Vous êtes une maison de retraite :",
        description: "Mon intervention se fait par le biais d'entretiens psycho-sociaux afin d'apporter une écoute, un soutien et des conseils. Cette mission repose également sur des Interventions Sociales d'Intérêt Collectif (ISIC), par la mise en place d'animations, de temps d'échange, de recueil des souhaits des résidents par des groupes de parole… Il s'agit aussi de faire remonter les besoins et d'effectuer, si besoin, de la médiation."
      },
      {
        type: "Vous êtes une entreprise d'aide à la personne :",
        description: "Mes missions ont pour but de rompre l'isolement et favoriser le lien social en mobilisant l'environnement global de la personne (territoire,famille, amis, réseau de professionnels, associations…). L'objectif est aussi de représenter un soutien à vos salariés, n'ayant pas toujours les réponses aux questions des personnes ou de leur famille. Ma mission est aussi de préparer la personne à une éventuelle entrée en maison de retraite et de soutenir sa famille par la constitution des démarches administratives (dossiers de demande d'entrée en maison de retraite, EHPA ou EHPAD, demande de mise sous protection…)"
      }
    ],
    interventions: [
      "JE VOUS PROPOSE DE TRAVAILLER EN COLLABORATION ET DE FORMALISER NOTRE ENGAGEMENT MUTUEL PAR LE BIAIS D'UN CONTRAT DE PRESTATIONS DE SERVICES."
    ]
  }
];
