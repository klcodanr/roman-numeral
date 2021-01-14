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
  const integer = getInteger(num);

  /*
   break down the number into digits and reverse so 0 = ones, 
   1 = 10's, 2 = 100's and 3 = 1000's
   */
  const roman = numerals.mapping;
  const digits = [...integer.toString()].reverse();

  /*
   retrieve the appropriate mapping from the table, using 0 if no 
   value for a digit
   */
  const thousands = roman[3][digits[3] || 0];
  const hundreds = roman[2][digits[2] || 0];
  const tens = roman[1][digits[1] || 0];
  const ones = roman[0][digits[0]];
  logger.debug(
    `Loaded: \n\tThousands: ${thousands}\n\tHundreds: ${hundreds}\n\tTens: ${tens}\n\tOnes: ${ones}`
  );

  return `${thousands}${hundreds}${tens}${ones}`;
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
  // being really strict here about the values given as strings, must be a whole, decimal number
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
