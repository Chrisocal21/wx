/**
 * Format a number with proper thousand separators
 */
export function formatNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Format a distance in meters to miles with one decimal place
 */
export function formatDistance(meters: number): string {
  const miles = meters * 0.000621371;
  return formatNumber(miles, 1);
}

/**
 * Format a temperature value (rounding to nearest integer)
 */
export function formatTemperature(celsius: number): string {
  return formatNumber(Math.round(celsius), 0);
}

/**
 * Format a percentage value
 */
export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`;
}
