const numerals = require("./numerals.json");
const logger = require("./logger");

/**
 * Converts a number from arabic numerals to roman numerals
 *
 * @param {int} num The number to convert
 * @returns {string} the number in roman numeral format
 */
function convert(num) {
  logger.debug(`Converting '${num}' to roman numeral`);
  let integer = getInteger(num);

  // break down the number by decimal places
  const thousands = parseInt(integer / 1000, 10);
  integer = integer - thousands * 1000;
  const hundreds = parseInt(integer / 100, 10);
  integer = integer - hundreds * 100;
  const tens = parseInt(integer / 10, 10);
  const ones = integer - tens * 10;
  logger.debug(
    `Loaded: \n\tThousands: ${thousands}\n\tHundreds: ${hundreds}\n\tTens: ${tens}\n\tOnes: ${ones}`
  );

  // map the decimal values into the appropriate roman numeral
  const map = numerals.mapping;
  return `${map[0][thousands]}${map[1][hundreds]}${map[2][tens]}${map[3][ones]}`;
}

/**
 * Gets the integer value from the specified value
 * @param {*} num  the value, which can be of any type
 * @returns {integer} the value
 */
function getInteger(num) {
  if (Number.isInteger(num)) {
    return num;
  }
  if (typeof num === "string" && /^[1-9]\d*$/.test(num.trim())) {
    return parseInt(num.trim(), 10);
  }
  return NaN;
}

/**
 * Validate if the provided string is a valid number and lies within the expected range
 *
 * @param {int} num The number to validate
 * @returns {string} the number in roman numeral format
 */
function validate(num) {
  const integer = getInteger(num);
  return !isNaN(num) && integer >= numerals.min && integer <= numerals.max;
}

exports.convert = convert;
exports.validate = validate;
