/**
 * Removes all non-numeric characters except for a decimal point.
 */
export function cleanNumberString(val: string | number): string {
  const strVal = String(val);
  // Remove all non-numeric and non-decimal characters (dots)
  // Commas are separators, so we strip them first
  let cleaned = strVal.replace(/,/g, '').replace(/[^0-9.]/g, '');

  const parts = cleaned.split('.');
  if (parts.length > 2) {
    cleaned = `${parts[0]}.${parts.slice(1).join('')}`;
  }

  // Limit to 2 decimal places
  const finalParts = cleaned.split('.');
  if (finalParts.length > 1) {
    cleaned = `${finalParts[0]}.${finalParts[1].slice(0, 2)}`;
  }

  return cleaned;
}

/**
 * Formats a clean number string with thousands separators (commas).
 * Example: 1000000.34 -> 1,000,000.34
 */
export function formatWithSeparators(val: string | number): string {
  if (val === null || val === undefined || val === '') return '';

  const strVal = String(val);
  const parts = strVal.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return parts.join('.');
}

/**
 * Combined clean and format for display.
 */
export function formatNumberInput(val: string | number): string {
  return formatWithSeparators(cleanNumberString(val));
}

/**
 * Strip separators for internal storage/API.
 */
export function stripSeparators(val: string | number): string {
  const strVal = String(val);
  return strVal.replace(/,/g, '');
}
