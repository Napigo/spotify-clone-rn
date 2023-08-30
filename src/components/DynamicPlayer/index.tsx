import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { uniqueId } from "lodash";
import { Keyboard, StyleSheet, TextStyle, View } from "react-native";
import { UIPressable } from "../common/UIPressable";
import { UIText } from "../common/UIText";
import { useThemeColors } from "../../theme/ThemeProvider";

const DEFAULT_FIRST_HEIGHT = "20%";

type SheetConfig = {
  showHandleBar: boolean;
  menuHeight: string;
  showDivider: boolean;
  dismissKeyboardOnOpen?: boolean;
  destructiveIndex: number;
  renderHeader?: () => React.ReactElement;
  optionContentAlignCentered?: boolean;
  options?: Option[];
  content?: React.ReactElement;
};

const DefaultConfig: SheetConfig = {
  showHandleBar: true,
  menuHeight: "50%",
  showDivider: true,
  destructiveIndex: -1,
};

export type Option = {
  label?: string;
  icon?: React.ReactElement;
  renderComponent?: () => React.ReactElement;
  onPress?: () => void;
};

interface UIBottomSheetContextProps {
  openSheet: (config: SheetConfig) => void;
  dismissSheet: () => void;
}
const UIBottomSheetContext = React.createContext<UIBottomSheetContextProps>(
  {} as UIBottomSheetContextProps
);
export const useBottomSheet = () => {
  return React.useContext(UIBottomSheetContext);
};

export const UIBottomSheetProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [config, setConfig] = useState<SheetConfig>(DefaultConfig);

  const styles = useStyles();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(
    () => [DEFAULT_FIRST_HEIGHT, config.menuHeight],
    [config]
  );

  const handleSheetChanges = useCallback((index: number) => {
    if (index === 0) {
      bottomSheetModalRef.current?.close();
    }
  }, []);

  /**
   *
   */
  const openSheet = useCallback((config: SheetConfig) => {
    setConfig(config);
    bottomSheetModalRef.current?.present();
    if (config.dismissKeyboardOnOpen) {
      Keyboard.dismiss();
    }
  }, []);

  const dismissSheet = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const optionItems = useMemo(() => {
    return config.options ? config.options : [];
  }, [config]);

  const isNotLastOptionIndex = useCallback(
    (index: number) => {
      return config.showDivider && index < optionItems.length - 1;
    },
    [config.showDivider, optionItems]
  );

  useEffect(() => {
    if (config.options && config.content) {
      throw new Error(
        "You cant have both options menu sheet and custom content sheet at the same time"
      );
    }
  }, [config]);

  const value = useMemo(() => {
    return {
      openSheet,
      dismissSheet,
    };
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        style={[props.style]}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    []
  );

  return (
    <UIBottomSheetContext.Provider value={value}>
      {children}

      <BottomSheetModalProvider>
        <BottomSheetModal
          backdropComponent={renderBackdrop}
          onDismiss={dismissSheet}
          stackBehavior="replace"
          backgroundStyle={styles.modal}
          handleIndicatorStyle={{
            display: config.showHandleBar ? "flex" : "none",
          }}
          ref={bottomSheetModalRef}
          index={1}
          enableOverDrag={false}
          enableDismissOnClose={true}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enableContentPanningGesture={true}
        >
          <View style={styles.contentContainer}>
            {config.renderHeader && <>{config?.renderHeader()}</>}
            {config.content && <>{config.content}</>}
            {optionItems.length > 0 && (
              <>
                {optionItems.map((item: Option, index: number) => {
                  if (item.renderComponent) {
                    return (
                      <View style={[styles.defaultItemRow]} key={uniqueId()}>
                        {item.renderComponent()}
                        {isNotLastOptionIndex(index) && (
                          <View style={styles.divider} />
                        )}
                      </View>
                    );
                  }

                  return (
                    <UIPressable
                      key={uniqueId()}
                      style={[
                        styles.item,
                        config.optionContentAlignCentered &&
                          styles.alignCentered,
                        isNotLastOptionIndex(index)
                          ? styles.itemDivider
                          : undefined,
                      ]}
                      onPress={item.onPress}
                    >
                      <UIText
                        style={[
                          styles.itemText,
                          index === config.destructiveIndex
                            ? styles.destructive
                            : undefined,
                        ]}
                      >
                        {item.label ?? "No Label"}
                      </UIText>
                    </UIPressable>
                  );
                })}
              </>
            )}
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </UIBottomSheetContext.Provider>
  );
};

const useStyles = () => {
  const { scheme } = useThemeColors();

  return StyleSheet.create({
    sheetPortalContainer: {},
    headerContainer: {
      width: "100%",
    },
    modal: {
      borderRadius: 0,
      backgroundColor: scheme.secondaryBackground,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.59,
      shadowRadius: 8.3,

      elevation: 13,
    },
    contentContainer: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
    },
    cancelButton: {
      borderWidth: 0,
      width: "90%",
    },
    item: {
      flexDirection: "row",
      alignItems: "center",
      height: 50,
      width: "100%",
    },
    alignCentered: {
      justifyContent: "center",
    },
    itemDivider: {
      borderBottomWidth: 1,
    },
    itemText: {},
    iconBox: {
      flexDirection: "row",
      justifyContent: "center",
    },
    icon: {},
    defaultItemRow: {
      width: "100%",
    },
    destructive: {},
    divider: {
      height: 1,
      width: "100%",
    },
  });
};
