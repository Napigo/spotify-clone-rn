export function isStringifiedJSON(value: string) {
  try {
    const parsedValue = JSON.parse(value);
    return typeof parsedValue === "object" && parsedValue !== null;
  } catch (error) {
    return false;
  }
}

export function getNumberType(value: string) {
  // Regular expressions for integers, floats, and doubles
  const integerRegex = /^[+-]?\d+$/;
  const floatRegex = /^[+-]?(\d*\.\d+|\d+\.\d*)$/;

  if (integerRegex.test(value)) {
    return "integer";
  } else if (floatRegex.test(value)) {
    return "float";
  } else {
    return "invalid";
  }
}
