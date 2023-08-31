import React, { ReactElement, useCallback } from "react";
import { useThemeColors } from "../../theme/ThemeProvider";
import { StyleSheet } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TabStackParamList } from "../../navigations/types";
import * as Haptics from "expo-haptics";
import { UIPressable } from "../common/UIPressable";
import { STANDARD_TOPBAR_HEIGHT } from "../../theme/constants";
import { UIText } from "../common/UIText";

type TabButtonProps = {
  tabName: string;
  icon: ReactElement;
  label: string;
  active: boolean;
  setActiveTab: (tabName: string) => void;
};

const Component: React.FC<TabButtonProps> = ({
  tabName,
  icon,
  label,
  active,
  setActiveTab,
}) => {
  const styles = useStyles();

  const runHaptics = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  const { navigate, canGoBack, goBack } =
    useNavigation<NavigationProp<TabStackParamList>>();

  const onPress = useCallback(() => {
    runHaptics();
    if (active && canGoBack()) {
      goBack();
    } else {
      navTo(tabName);
    }
    setActiveTab(tabName);
  }, [tabName]);

  const navTo = useCallback(
    (tabName: string) => {
      switch (tabName) {
        case "home":
          navigate("Home", {});
          break;
        case "search":
          navigate("Search");
          break;
        case "library":
          navigate("Library", {});
          break;
        default:
          break;
      }
    },
    [tabName]
  );

  return (
    <UIPressable style={styles.tabBox} onPress={onPress}>
      {React.cloneElement(icon, {
        color: active ? styles.labelActive.color : styles.label.color,
      })}
      <UIText
        level="caption"
        style={[styles.label, active && styles.labelActive]}
      >
        {label}
      </UIText>
    </UIPressable>
  );
};

export const TabButton = React.memo(Component);

const useStyles = () => {
  const { scheme } = useThemeColors();

  return StyleSheet.create({
    tabBox: {
      height: STANDARD_TOPBAR_HEIGHT,
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 3,
    },
    label: {
      color: scheme.systemGray,
      fontSize: 12,
    },
    labelActive: {
      color: scheme.systemTint,
    },
  });
};
