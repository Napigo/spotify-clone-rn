import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../redux/app-store";
import { useThemeColors } from "../../../theme/ThemeProvider";
import { StyleSheet, View } from "react-native";
import { chunk, uniqueId } from "lodash";
import { SCREEN_EDGE_SPACING } from "../../../theme/constants";
import { UIText } from "../../common/UIText";
import { borderRadius } from "../../../theme/radius";
import { category_colors } from "../../../theme/colors";
import { Image } from "expo-image";
import { useAssets } from "expo-asset";
import Animated, { FadeIn } from "react-native-reanimated";

const getBackground = (index: number) => {
  const colorIndex = index % category_colors.length;
  return category_colors[colorIndex];
};

export const CategoryList: React.FC = () => {
  const styles = useStyles();

  const [assets] = useAssets([
    require("../../../../assets/images/category-cover.png"),
  ]);

  const { isReady, categories } = useSelector(
    (state: AppState) => state.CategoriesStore
  );

  const categWithColors = useMemo(() => {
    return categories.map((item, index) => ({
      ...item,
      background: getBackground(index),
    }));
  }, [categories]);

  const lists = chunk(categWithColors, 2);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <UIText level="body" style={styles.headerText}>
          Browse All
        </UIText>
      </View>
      {isReady ? (
        <Animated.View entering={FadeIn} style={{ flex: 1, gap: GUTTER }}>
          {lists.map((item, index) => (
            <View key={`${uniqueId()}-category-row`} style={styles.row}>
              {item.map((col) => (
                <View
                  style={[styles.col, { backgroundColor: col.background }]}
                  key={`${uniqueId()}-${col.id}`}
                >
                  <UIText level="body" style={styles.itemTitle}>
                    {col.name}
                  </UIText>
                  <View style={styles.imageContainer}>
                    <Image
                      source={col.coverPhoto ?? assets![0].uri}
                      style={styles.image}
                      contentFit="cover"
                    />
                  </View>
                </View>
              ))}
            </View>
          ))}
        </Animated.View>
      ) : (
        <></>
      )}
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
      position: "relative",
      flex: 1,
      height: "100%",
      width: "50%",
      backgroundColor: scheme.primary,
      borderRadius: borderRadius.sm,
      overflow: "hidden",
      padding: 10,
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
    itemTitle: {
      fontWeight: "700",
    },
    imageContainer: {
      height: 70,
      aspectRatio: 1,
      position: "absolute",
      right: -13,
      bottom: -10,
      backgroundColor: "blue",
      transform: [{ rotate: "30deg" }],
      borderRadius: borderRadius.sm,
      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 9,
      },
      shadowOpacity: 0.22,
      shadowRadius: 9.22,
      elevation: 12,
      overflow: "hidden",
    },
    image: {
      width: "100%",
      aspectRatio: 1,
    },
  });
};
