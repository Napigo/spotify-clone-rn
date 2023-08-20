import { appSchemeColor } from "./colors";

export type Font<T> = {
  largetitle: T;
  title1: T;
  title2: T;
  title3: T;
  headline: T;
  body: T;
  callout: T;
  subhead: T;
  caption: T;
};

export type Weight =
  | "normal"
  | "bold"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | undefined;

export const fontSizes: Font<number> = {
  largetitle: 34,
  title1: 28,
  title2: 22,
  title3: 20,
  headline: 17,
  body: 17,
  callout: 16,
  subhead: 15,
  caption: 13,
};

export const fontWeights: Font<Weight> = {
  largetitle: "500",
  title1: "500",
  title2: "500",
  title3: "500",
  headline: "700",
  body: "400",
  callout: "400",
  subhead: "400",
  caption: "400",
};

export const fontColors: Font<string> = {
  largetitle: appSchemeColor.systemTint,
  title1: appSchemeColor.systemTint,
  title2: appSchemeColor.systemTint,
  title3: appSchemeColor.systemTint,
  headline: appSchemeColor.systemTint,
  body: appSchemeColor.systemTint,
  callout: appSchemeColor.systemTint,
  subhead: appSchemeColor.systemTint,
  caption: appSchemeColor.systemTint,
};
