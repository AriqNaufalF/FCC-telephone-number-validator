/**
 * @param str string nomor telepon yg akan dicek
 * @returns boolean
 */

function telephoneCheck(str) {
  return /^([1]\s?)?((?:\(\d{3}\))|\d{3})(?:[-\s]?(\d{3})[-\s]|[-\s]?(\d{3})[-\s]|\d{3})\d{4}$/.test(
    str
  );
}
