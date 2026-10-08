// Gedeelde structured data (schema.org). Eén Person en één organisatie met een vast @id,
// zodat zoekmachines Stijn en Verborgen Wijnroutes op elke pagina als dezelfde herkennen.
import { site } from './site';

export const persoonId = `${site.url}/#stijn`;
export const organisatieId = `${site.url}/#organisatie`;
export const websiteId = `${site.url}/#website`;

const verhaalUrl = new URL('/mijn-verhaal/', site.url).href;
const logoUrl = new URL('/apple-touch-icon.png', site.url).href;

/** Korte verwijzing naar Stijn, voor `author` op artikelen. */
export const auteur = { '@type': 'Person', '@id': persoonId, name: site.oprichter, url: verhaalUrl };

/** Korte verwijzing naar de organisatie, voor `publisher` en `provider`. */
export const uitgever = {
  '@type': 'Organization',
  '@id': organisatieId,
  name: site.naam,
  url: site.url,
  logo: { '@type': 'ImageObject', url: logoUrl },
};

/** Volledige beschrijving van Stijn (op Mijn verhaal en de homepage). */
export function persoon(afbeelding?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': persoonId,
    name: site.oprichter,
    url: verhaalUrl,
    ...(afbeelding && { image: afbeelding }),
    jobTitle: 'Oprichter van Verborgen Wijnroutes',
    description:
      'Stelt persoonlijke wijnreizen samen naar minder bekende wijnregio’s, zoals Albanië, Kreta en Kroatië.',
    worksFor: { '@id': organisatieId },
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      name: 'WSET Level 1 Award in Wines',
      recognizedBy: { '@type': 'Organization', name: 'Wine & Spirit Education Trust', url: 'https://www.wsetglobal.com/' },
    },
    knowsAbout: ['Wijn', 'Wijnreizen', 'Albanese wijn', 'Inheemse druivenrassen', 'Albanië', 'Kreta', 'Dalmatië'],
    knowsLanguage: 'nl',
    sameAs: [site.instagram],
  };
}

/** Volledige beschrijving van de organisatie. */
export function organisatie() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': organisatieId,
    name: site.naam,
    url: site.url,
    email: site.email,
    sameAs: [site.instagram],
    description: site.omschrijving,
    logo: logoUrl,
    founder: { '@id': persoonId },
    areaServed: { '@type': 'Country', name: 'Nederland' },
    knowsLanguage: 'nl',
  };
}
