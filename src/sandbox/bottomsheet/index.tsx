import React, {
  PropsWithChildren,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet, View } from "react-native";
import BottomSheet, { SCREEN_HEIGHT } from "@gorhom/bottom-sheet";
import {
  DYNAMIC_BOTTOM_PLAYER_HEIGHT,
  FULL_BOTTOM_BAR_HEIGHT,
} from "../../theme/constants";
import { BottomSheetContent } from "./Content";
import { useThemeColors } from "../../theme/ThemeProvider";

export const BottomSheetSandbox: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const styles = useStyles();

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [enabledDrag, setEnabledDrag] = useState<boolean>(false);

  // variables
  const snapPoints = useMemo(
    () => [
      FULL_BOTTOM_BAR_HEIGHT,
      FULL_BOTTOM_BAR_HEIGHT + DYNAMIC_BOTTOM_PLAYER_HEIGHT,
      SCREEN_HEIGHT,
    ],
    []
  );

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    if (index === 0) {
      setEnabledDrag(false);
    }
  }, []);

  const handleAnimate = (fromIndex: number, toIndex: number) => {
    if (toIndex === 0 && fromIndex === 2) {
      bottomSheetRef.current?.snapToIndex(1);
    }
    if (fromIndex === 0) {
      bottomSheetRef.current?.snapToIndex(0);
    }
  };

  return (
    <>
      {children}
      {/* <UIButton
        variant="primary"
        size="md"
        text="Hello"
        onPress={() => {
          bottomSheetRef.current?.snapToIndex(2);
          setEnabledDrag(true);
        }}
      /> */}
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        onAnimate={handleAnimate}
        style={{ flex: 1 }}
        handleComponent={null}
        backgroundStyle={styles.sheet}
        enableContentPanningGesture={enabledDrag}
        detached={true}
        animateOnMount={false}
        animationConfigs={{
          duration: 250,
        }}
      >
        <BottomSheetContent setEnabledDrag={setEnabledDrag} />
      </BottomSheet>
    </>
  );
};

const useStyles = () => {
  const { scheme } = useThemeColors();
  return StyleSheet.create({
    container: {
      height: SCREEN_HEIGHT,
      backgroundColor: scheme.systemBackground,
    },
    sheet: {
      borderRadius: 0,
      backgroundColor: scheme.secondaryBackground,
    },
    appContent: {
      backgroundColor: "green",
      height: SCREEN_HEIGHT,
      width: "100%",
    },
  });
};

const Testing: React.FC<{ name: string }> = ({ name }) => {
  return <View></View>;
};

const Comp = React.memo(Testing);
