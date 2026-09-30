/**
 * Utilitaires d'affichage d'un service (couleur et initiales de l'avatar).
 * Centralisés ici pour ne pas dupliquer la logique dans chaque écran.
 */

const AVATAR_COLORS: readonly string[] = [
  '#1d6df2', '#12b886', '#7048e8', '#f76707',
  '#0ca5a5', '#e64980', '#4263eb', '#f59f00'
];

const FALLBACK_COLOR = AVATAR_COLORS[0] as string;

/** Couleur stable (toujours la même) pour une abréviation donnée. */
export function getServiceColor(abreviation: string | undefined): string {
  if (!abreviation) {
    return FALLBACK_COLOR;
  }

  let hash = 0;
  for (let i = 0; i < abreviation.length; i++) {
    hash = abreviation.charCodeAt(i) + ((hash << 5) - hash);
  }

  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length] ?? FALLBACK_COLOR;
}

/** Deux premières lettres significatives de l'abréviation (ex. « GPR-RNF » → « GR »). */
export function getServiceInitials(abreviation: string | undefined): string {
  if (!abreviation) {
    return '?';
  }

  const words = abreviation.split(/[^A-Za-z0-9À-ÿ]+/).filter(Boolean);
  const letters = words.length > 1
    ? words.slice(0, 2).map(word => word.charAt(0))
    : [abreviation.trim().slice(0, 2)];

  return letters.join('').toUpperCase();
}
