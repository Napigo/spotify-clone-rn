import React, { useMemo } from "react";
import { useThemeColors } from "../../theme/ThemeProvider";
import { STANDARD_TOPBAR_HEIGHT } from "../../theme/constants";
import { ScrollView, StyleSheet } from "react-native";
import { UIChip } from "../common/UIChip";
import { darkenColor } from "../../utils/utils";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

type PlayerGroupButtonProps = {
  dominantColor?: string;
};
export const PlayerGroupButton: React.FC<PlayerGroupButtonProps> = ({
  dominantColor,
}) => {
  const styles = useStyles();
  const { scheme } = useThemeColors();

  const buttonColor = useMemo(() => {
    if (dominantColor) {
      return darkenColor(dominantColor ?? scheme.secondaryBackground, 0.6);
    }
    return scheme.secondaryBackground;
  }, [dominantColor]);
  return (
    <ScrollView
      horizontal
      style={{ flex: 1 }}
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
    >
      <UIChip
        buttonStyle={{ backgroundColor: buttonColor }}
        icon={<AntDesign name="like2" size={16} color="white" />}
      >
        13
      </UIChip>
      <UIChip
        buttonStyle={{ backgroundColor: buttonColor }}
        icon={<AntDesign name="dislike2" size={16} color="white" />}
      >
        123
      </UIChip>
      <UIChip
        buttonStyle={{ backgroundColor: buttonColor }}
        iconOnly
        icon={<FontAwesome5 name="comment" size={16} color="white" />}
      />
      <UIChip
        buttonStyle={{ backgroundColor: buttonColor }}
        icon={<AntDesign name="addfile" size={16} color="white" />}
      >
        Save
      </UIChip>
      <UIChip
        buttonStyle={{ backgroundColor: buttonColor }}
        icon={<AntDesign name="sharealt" size={16} color="white" />}
      >
        Share
      </UIChip>
      <UIChip
        buttonStyle={{ backgroundColor: buttonColor }}
        icon={<AntDesign name="download" size={16} color="white" />}
      >
        Download
      </UIChip>
    </ScrollView>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    container: {
      height: STANDARD_TOPBAR_HEIGHT,
      alignItems: "center",
      gap: 5,
    },
  });
};
