import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../redux/app-store";
import { useThemeColors } from "../../../theme/ThemeProvider";
import { StyleSheet, View } from "react-native";
import { chunk, uniqueId } from "lodash";
import { SCREEN_EDGE_SPACING } from "../../../theme/constants";
import { UIText } from "../../common/UIText";
import { borderRadius } from "../../../theme/radius";

export const CategoryList: React.FC = () => {
  const styles = useStyles();
  const { isReady, categories } = useSelector(
    (state: AppState) => state.CategoriesStore
  );

  const lists = chunk(categories, 2);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <UIText level="body" style={styles.headerText}>
          Browse All
        </UIText>
      </View>
      {lists.map((item) => (
        <View key={`${uniqueId()}-category-row`} style={styles.row}>
          {item.map((col) => (
            <View style={styles.col} key={`${uniqueId()}-${col.id}`}></View>
          ))}
        </View>
      ))}
    </View>
  );
};

const ROW_HEIGHT = 100;
const GUTTER = 15;

const useStyles = () => {
  const { scheme } = useThemeColors();
  return StyleSheet.create({
    container: {
      flex: 1,
      height: "100%",
      backgroundColor: scheme.systemBackground,
      gap: GUTTER,
      paddingVertical: 0,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: ROW_HEIGHT,
      width: "100%",
      gap: GUTTER,
      paddingHorizontal: SCREEN_EDGE_SPACING,
    },
    col: {
      flex: 1,
      height: "100%",
      width: "50%",
      backgroundColor: scheme.primary,
      borderRadius: borderRadius.sm,
    },
    header: {
      flexDirection: "row",
      height: 50,
      paddingHorizontal: SCREEN_EDGE_SPACING,
      alignItems: "center",
    },
    headerText: {
      fontWeight: "600",
    },
  });
};
