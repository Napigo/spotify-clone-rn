import React, {
  PropsWithChildren,
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { WithSpringConfig, WithTimingConfig } from "react-native-reanimated";
import { useThemeColors } from "../../theme/ThemeProvider";
import {
  DYNAMIC_BOTTOM_PLAYER_HEIGHT,
  FULL_BOTTOM_BAR_HEIGHT,
  SCREEN_HEIGHT,
} from "../../theme/constants";
import BottomSheet from "@gorhom/bottom-sheet";

type DynamicPlayerContextProps = {
  minimize: () => void;
  close: () => void;
  openFull: () => void;
  setDragEnable: (enabled: boolean) => void;
};

const DynamicPlayerContext = createContext<DynamicPlayerContextProps>({
  minimize() {},
  close() {},
  openFull() {},
  setDragEnable(_) {},
});

export const useDynamicPlayer = () => {
  return useContext(DynamicPlayerContext);
};

export interface DynamicPlayerRootViewConfigProps extends PropsWithChildren {
  defaultIndex?: number;
  sheetStyle?: ViewStyle;
  detached?: boolean;
  animateOnMount?: boolean;
  animationConfigs?: WithSpringConfig | WithTimingConfig;
  content: ReactElement;
}

export const DynamicPlayerRootView: React.FC<
  DynamicPlayerRootViewConfigProps
> = ({
  children,
  defaultIndex = 0,
  sheetStyle,
  detached = true,
  animateOnMount = false,
  animationConfigs = {
    duration: 250,
  },
  content,
}) => {
  const styles = useStyles();
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [enabledDrag, setDragEnable] = useState<boolean>(false);

  const snapPoints = useMemo(
    () => [
      FULL_BOTTOM_BAR_HEIGHT,
      FULL_BOTTOM_BAR_HEIGHT + DYNAMIC_BOTTOM_PLAYER_HEIGHT,
      SCREEN_HEIGHT,
    ],
    []
  );

  const handleSheetChanges = useCallback((index: number) => {
    if (index === 0) {
      setDragEnable(false);
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

  const minimize = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(1);
    setDragEnable(true);
  }, []);

  const openFull = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(snapPoints.length - 1);
    setDragEnable(true);
  }, []);

  const close = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
    setDragEnable(false);
  }, []);

  return (
    <DynamicPlayerContext.Provider
      value={{
        minimize,
        openFull,
        close,
        setDragEnable,
      }}
    >
      {children}
      <BottomSheet
        ref={bottomSheetRef}
        index={defaultIndex}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        onAnimate={handleAnimate}
        style={{ flex: 1 }}
        handleComponent={null}
        backgroundStyle={sheetStyle ?? styles.defaultSheet}
        enableContentPanningGesture={enabledDrag}
        detached={detached}
        animateOnMount={animateOnMount}
        animationConfigs={animationConfigs}
      >
        {content}
      </BottomSheet>
    </DynamicPlayerContext.Provider>
  );
};

const useStyles = () => {
  const { scheme } = useThemeColors();

  return StyleSheet.create({
    container: {
      height: SCREEN_HEIGHT,
      backgroundColor: "transparent",
    },
    defaultSheet: {
      borderRadius: 0,
      backgroundColor: scheme.secondaryBackground,
    },
  });
};
