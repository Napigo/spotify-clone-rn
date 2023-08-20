import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { UISchemeColor, appSchemeColor } from "./colors";

type ContextProps = {
  scheme: UISchemeColor;
};

const ThemeContext = createContext<ContextProps>({
  scheme: appSchemeColor,
});

export const useThemeColors = () => {
  return useContext(ThemeContext);
};

export const ThemeContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [scheme, setSheme] = useState<UISchemeColor>(appSchemeColor);

  return (
    <ThemeContext.Provider value={{ scheme: scheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
