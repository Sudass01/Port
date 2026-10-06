import { company } from '../config/company';

/** Substitui {city}, {region}, {state}, {name} e {short} pelos dados de company.ts. */
export function fill(text: string): string {
  return text
    .replaceAll('{city}', company.location.city)
    .replaceAll('{region}', company.location.regionShort)
    .replaceAll('{state}', company.location.state)
    .replaceAll('{name}', company.name)
    .replaceAll('{short}', company.shortName);
}

/** Endereço em uma linha, ignorando campos vazios. */
export function addressLine(): string {
  const { street, district } = company.location.address;
  const cityState = `${company.location.city} - ${company.location.state}`;
  return [street, district, cityState].filter(Boolean).join(', ');
}
