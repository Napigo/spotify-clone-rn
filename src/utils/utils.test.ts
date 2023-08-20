import { getNumberType, isStringifiedJSON } from "./utils";

describe("utils", () => {
  it("(getNumberType) should identify integers correctly", () => {
    expect(getNumberType("123")).toBe("integer");
    expect(getNumberType("-456")).toBe("integer");
    expect(getNumberType("0")).toBe("integer");
  });

  it("(getNumberType) should identify floats correctly", () => {
    expect(getNumberType("12.34")).toBe("float");
    expect(getNumberType("-0.567")).toBe("float");
    expect(getNumberType("0.0")).toBe("float");
  });

  it("(getNumberType) should identify invalid values", () => {
    expect(getNumberType("abc")).toBe("invalid");
    expect(getNumberType("12.34.56")).toBe("invalid");
    expect(getNumberType("")).toBe("invalid");
    expect(getNumberType("123abc")).toBe("invalid");
  });

  it("(getNumberType) should handle edge cases", () => {
    expect(getNumberType("0")).toBe("integer");
    expect(getNumberType("-0")).toBe("integer");
    expect(getNumberType("0.")).toBe("float");
    expect(getNumberType("-0.")).toBe("float");
    expect(getNumberType("0.12345678901234567890")).toBe("float");
  });

  it("(isStringifiedJSON) should return true for valid JSON strings", () => {
    expect(isStringifiedJSON('{"key": "value"}')).toBe(true);
    expect(isStringifiedJSON("[1, 2, 3]")).toBe(true);
    expect(isStringifiedJSON('"string"')).toBe(false);
  });

  it("(isStringifiedJSON) should return false for invalid JSON strings", () => {
    expect(isStringifiedJSON('{"key": "value"')).toBe(false); // Missing closing brace
    expect(isStringifiedJSON("invalid json")).toBe(false); // Non-JSON string
    expect(isStringifiedJSON("")).toBe(false); // Empty string
  });

  it("(isStringifiedJSON) should return false for non-string values", () => {
    expect(isStringifiedJSON("123")).toBe(false);
    expect(isStringifiedJSON("null")).toBe(false);
    expect(isStringifiedJSON("undefined")).toBe(false);
  });

  it("(isStringifiedJSON) should return false for non-object JSON values", () => {
    expect(isStringifiedJSON("123")).toBe(false); // Number, not object
    expect(isStringifiedJSON('["array"]')).toBe(true); // Array, still object
    expect(isStringifiedJSON('"string"')).toBe(false); // String, not object
  });
});
