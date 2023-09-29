import React, { useEffect, useRef, useState } from "react";
import Slider from "@react-native-community/slider";
import { StyleSheet, View } from "react-native";
import { STANDARD_TOPBAR_HEIGHT } from "../../theme/constants";
import { useThemeColors } from "../../theme/ThemeProvider";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/app-store";
import { UIText } from "../common/UIText";
import { msToTime } from "../../utils/utils";

let seekInterval: NodeJS.Timeout | undefined;

export const PlayerTrackSlider: React.FC = () => {
  const styles = useStyles();
  const { scheme } = useThemeColors();
  const { source, isPlaying } = useSelector(
    (state: AppState) => state.PlayerStore
  );
  const [seek, setSeek] = useState<number>(0);
  const maxSeek = source?.duration_ms ?? 1000;

  const seekRef = useRef(seek);
  seekRef.current = seek;

  useEffect(() => {
    if (isPlaying) {
      seekInterval = setInterval(() => {
        if (seekRef.current < maxSeek) {
          setSeek(seekRef.current + 60);
        } else {
          setSeek(maxSeek);
        }
      }, 60);
    } else if (seekInterval) {
      clearInterval(seekInterval);
    }

    return () => {
      if (seekInterval) clearInterval(seekInterval);
    };
  }, [isPlaying]);

  return (
    <View style={styles.container}>
      <Slider
        style={{ width: "100%", height: 20 }}
        minimumValue={0}
        maximumValue={maxSeek}
        value={seek}
        onSlidingComplete={(val) => setSeek(val)}
        minimumTrackTintColor={scheme.systemTint}
        maximumTrackTintColor={scheme.secondaryBackground}
      />
      <View style={styles.labelRow}>
        <UIText level="subhead">{msToTime(seek)}</UIText>
        <UIText level="subhead">{msToTime(maxSeek)}</UIText>
      </View>
    </View>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    container: {
      height: STANDARD_TOPBAR_HEIGHT,
      width: "100%",
      alignItems: "center",
    },
    labelRow: {
      width: "100%",
      flexDirection: "row",
      alignItems: "flex-start",
      height: 30,
      justifyContent: "space-between",
      //   backgroundColor: "pink",
    },
  });
};
