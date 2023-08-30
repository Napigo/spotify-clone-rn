import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet } from "react-native";
import { useThemeColors } from "../../theme/ThemeProvider";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProvider as ModalProvider,
} from "@gorhom/bottom-sheet";
import {
  DYNAMIC_BOTTOM_PLAYER_HEIGHT,
  FULL_BOTTOM_BAR_HEIGHT,
  SCREEN_HEIGHT,
} from "../../theme/constants";
import { BottomSheetContent } from "../bottomsheet/Content";

type BottomSheetModalContextProps = {
  minimizeSheet: () => void;
  openFullSheet: () => void;
  dismissSheet: () => void;
};

const BottomSheetModalContext = createContext<BottomSheetModalContextProps>({
  minimizeSheet: () => {},
  openFullSheet: () => {},
  dismissSheet: () => {},
});

export const useBottomSheetModal = () => {
  return useContext(BottomSheetModalContext);
};

export const BottomSheetModalProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const styles = useStyles();

  const [enabledDrag, setEnabledDrag] = useState<boolean>(false);

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(
    () => [
      FULL_BOTTOM_BAR_HEIGHT,
      FULL_BOTTOM_BAR_HEIGHT + DYNAMIC_BOTTOM_PLAYER_HEIGHT,
      SCREEN_HEIGHT,
    ],
    []
  );

  const handleSheetChanges = useCallback((index: number) => {
    console.log(index);
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

  const minimizeSheet = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(1);
  }, []);

  const openFullSheet = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(2);
  }, []);

  const dismissSheet = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        style={[props.style, { backgroundColor: "blue" }]}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={1}
        pressBehavior="close"
      />
    ),
    []
  );
  useEffect(() => {
    bottomSheetRef.current?.present();
  }, []);

  return (
    <BottomSheetModalContext.Provider
      value={{
        minimizeSheet,
        openFullSheet,
        dismissSheet,
      }}
    >
      {children}
      <ModalProvider>
        <BottomSheetModal
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          onAnimate={handleAnimate}
          style={{ flex: 1 }}
          backgroundStyle={styles.sheet}
          enableContentPanningGesture={enabledDrag}
          detached={true}
          animateOnMount={false}
          animationConfigs={{
            duration: 250,
          }}
          backdropComponent={renderBackdrop}
        >
          {/* <BottomSheetContent /> */}
        </BottomSheetModal>
      </ModalProvider>
    </BottomSheetModalContext.Provider>
  );
};

const useStyles = () => {
  const { scheme } = useThemeColors();

  return StyleSheet.create({
    container: {
      height: SCREEN_HEIGHT,
      backgroundColor: scheme.systemBackground,
      paddingVertical: 300,
    },
    sheet: {
      borderRadius: 0,
      backgroundColor: scheme.secondaryBackground,
    },
  });
};
