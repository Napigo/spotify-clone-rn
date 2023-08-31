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

export function hexToRGBA(hex: string, alpha = 1) {
  // Remove any hash character (#) if present
  hex = hex.replace("#", "");

  // Check if the hex code is short (e.g., #ABC) or long (e.g., #AABBCC)
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  // Convert hex values to decimal
  const red = parseInt(hex.substr(0, 2), 16);
  const green = parseInt(hex.substr(2, 2), 16);
  const blue = parseInt(hex.substr(4, 2), 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

export function darkenColor(hex: string, factor: number) {
  // Remove the "#" symbol if present
  hex = hex.replace("#", "");

  // Convert the hex string to RGB values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate the darker RGB values
  const newR = Math.max(0, Math.floor(r - r * factor));
  const newG = Math.max(0, Math.floor(g - g * factor));
  const newB = Math.max(0, Math.floor(b - b * factor));

  // Convert the new RGB values to a hex color string
  const newHex =
    "#" +
    newR.toString(16).padStart(2, "0") +
    newG.toString(16).padStart(2, "0") +
    newB.toString(16).padStart(2, "0");

  return newHex;
}
