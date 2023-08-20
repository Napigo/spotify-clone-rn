import * as SecureStore from "expo-secure-store";
import { getNumberType, isStringifiedJSON } from "../../utils/utils";

/**
 *
 * @param key
 * @param value
 */
export async function save(key: string, value: any) {
  let payload: string = value;
  switch (true) {
    case typeof value === "string":
      payload = value;
      break;
    case typeof value === "object":
      payload = JSON.stringify(value);
      break;
    case typeof value === "number":
      payload = value.toString();
      break;
    default:
      payload = value as string;
  }
  await SecureStore.setItemAsync(key, payload);
}

export async function get(key: string): Promise<any> {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    switch (true) {
      case isStringifiedJSON(result):
        return JSON.stringify(result);
      case getNumberType(result) === "float":
        return Number.parseFloat(result);
      case getNumberType(result) === "integer":
        return Number.parseInt(result);
      default:
        return result;
    }
  }
  return null;
}
