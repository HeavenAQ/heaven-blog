export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}

export function deslugify(input: string): string {
  return input
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

export function titleCase(input: string): string {
  // Special cases that should not be changed
  const specialCases: Record<string, string> = {
    'ci-cd': 'CI-CD',
    'ml': 'ML',
    'ai': 'AI',
    'api': 'API',
    'ui': 'UI',
    'ux': 'UX',
  };

  // Check if the entire input is a special case
  const lowerInput = input.toLowerCase();
  if (specialCases[lowerInput]) {
    return specialCases[lowerInput];
  }

  // Otherwise, apply title case
  return input
    .toLowerCase()
    .split(' ')
    .map(word => {
      // Check if this word is a special case
      const lowerWord = word.toLowerCase();
      if (specialCases[lowerWord]) {
        return specialCases[lowerWord];
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

