// Declare a module mock for expo-secure-store
jest.mock("expo-secure-store", () => ({
  setItemAsync: jest.fn(),
  getItemAsync: jest.fn().mockResolvedValue("testValue"),
}));

import { save, get } from "./index"; // Replace with your module path
import * as SecureStore from "expo-secure-store"; // Import SecureStore for types

describe("save", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("save() : should save a value", async () => {
    await save("testKey", "testValue");
    expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
      "testKey",
      "testValue"
    );
  });
  it("get() : should get a value", async () => {
    // Declare a module mock for expo-secure-store
    jest.mock("expo-secure-store", () => ({
      setItemAsync: jest.fn(),
      getItemAsync: jest.fn().mockResolvedValue("napi"),
    }));
    const result = await get("testKey");
    expect(result).toBe("testValue");
  });
});
