/**
 * JSON-LD (dados estruturados) para SEO local.
 * Tudo vem de company.ts — ao trocar a empresa, o schema acompanha.
 *
 * ⚠️ Não adicione `aggregateRating` / `review` com avaliações de demonstração:
 * o Google considera spam. Quando tiver avaliações reais e verificáveis,
 * inclua-as aqui (veja o comentário em localBusinessSchema).
 */
import { company } from '../config/company';
import { services } from '../config/services';
import { seo } from '../config/content';

const abs = (path: string) => new URL(path, company.url).toString();

export function localBusinessSchema() {
  const { address, geo } = company.location;
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    // HVACBusiness = empresa de climatização (subtipo de LocalBusiness).
    '@type': 'HVACBusiness',
    '@id': `${company.url}/#empresa`,
    name: company.name,
    description: company.description,
    url: company.url,
    image: abs(seo.ogImage),
    logo: abs(company.logo.image ?? '/favicon.svg'),
    telephone: company.contact.phone,
    ...(company.contact.email ? { email: company.contact.email } : {}),
    // SUBSTITUIR: com endereço real, preencha company.location.address.
    address: {
      '@type': 'PostalAddress',
      ...(address.street ? { streetAddress: address.street } : {}),
      ...(address.postalCode ? { postalCode: address.postalCode } : {}),
      addressLocality: company.location.city,
      addressRegion: company.location.state,
      addressCountry: 'BR',
    },
    geo: { '@type': 'GeoCoordinates', latitude: geo.lat, longitude: geo.lng },
    areaServed: company.serviceAreas.cities.map((c) => ({ '@type': 'City', name: `${c.name} - ${company.location.state}` })),
    openingHoursSpecification: company.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.open,
      closes: h.close,
    })),
    sameAs: [company.social.instagram.url, company.social.facebook].filter(Boolean),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços de climatização',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.title, description: s.description },
      })),
    },
    priceRange: '$$',
    // Avaliações REAIS (opcional), quando existirem:
    // aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '57' },
  };
  return schema;
}

export function serviceSchema(name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: abs(path),
    serviceType: name,
    provider: { '@id': `${company.url}/#empresa` },
    areaServed: company.serviceAreas.cities.map((c) => ({ '@type': 'City', name: c.name })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}
