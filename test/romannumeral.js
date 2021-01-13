const assert = require("assert");
const { convert, validate } = require("../src/romannumeral");

describe("Roman Numeral", function () {
  describe("#convert()", function () {
    it("should correctly convert singular values", function () {
      assert.strictEqual("I", convert("1"));
      assert.strictEqual("IX", convert("9"));
    });
    it("should correctly convert two digit values", function () {
      assert.strictEqual("LXXII", convert("72"));
      assert.strictEqual("XXIII", convert("23"));
    });
    it("should correctly convert three digit values", function () {
      assert.strictEqual("CMXCIX", convert("999"));
      assert.strictEqual("CCXCIV", convert("294"));
    });
    it("should correctly convert four digit values", function () {
      assert.strictEqual("MMMCMXCIX", convert("3999"));
      assert.strictEqual("MMCM", convert("2900"));
    });
  });
  describe("#validate()", function () {
    it("should return false with negative numbers", function () {
      assert.strictEqual(false, validate("-1"));
    });
    it("should return false with zero or zero-padded numbers", function () {
      assert.strictEqual(false, validate("001"));
    });
    it("should return false with large numbers", function () {
      assert.strictEqual(false, validate("4000"));
      assert.strictEqual(false, validate("100000"));
    });
    it("should return false with non-numeric values", function () {
      assert.strictEqual(false, validate("bob"));
    });
    it("should return false for non-integer numbers", function () {
      assert.strictEqual(false, validate("1.2"));
    });
    it("should trim whitespace", function () {
      assert.strictEqual(true, validate(" 1"));
    });
    it("should support numeric values", function () {
      assert.strictEqual(true, validate(23));
    });
    it("should return false for integers between 1-3999", function () {
      for (let i = 1; i < 4000; i++) {
        assert.strictEqual(true, validate(`${i}`));
      }
    });
  });
});
