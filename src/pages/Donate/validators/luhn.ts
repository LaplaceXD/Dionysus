/**
 * Developed by a German Computer Scientist named Hans Peter Luhn in 1954 while working as a researcher at IBM.
 * A simple check digit formula used to validate a variety of identification numbers.
 *
 * @link https://www.investopedia.com/terms/l/luhn-algorithm.asp
 * @param {string} n A number string
 * @return {boolean} Validity of the identification number
 */
export function mod10(n: string): boolean {
  let checksum, i, digit;

  checksum = 0;
  for (i = 0; i < n.length; ++i) {
    digit = parseInt(n.charAt(i));
    if (isNaN(digit)) return false;

    if (i % 2 === 0) {
      digit *= 2;
      digit = digit > 9 ? 1 + (digit % 10) : digit;
    }

    checksum += digit;
  }

  return checksum % 10 === 0;
}
