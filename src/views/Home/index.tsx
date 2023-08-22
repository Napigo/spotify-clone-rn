import React, { useEffect, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from "react-native";
import { SCREEN_HEIGHT } from "../../theme/constants";
import { UIText } from "../../components/common/UIText";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export const HomeView: React.FC = () => {
  const height = useBottomTabBarHeight();

  const [isContentUnderBottomBar, setIsContentUnderBottomBar] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    console.log(offsetY);
    const isUnderBottomBar = offsetY >= height;
    setIsContentUnderBottomBar(isUnderBottomBar);
  };

  useEffect(() => {
    console.log(isContentUnderBottomBar);
  }, [isContentUnderBottomBar]);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: height,
      }}
      scrollEventThrottle={30}
      onScroll={handleScroll}
      style={{ backgroundColor: "D", height: SCREEN_HEIGHT, flex: 1 }}
    >
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
      <View>
        <UIText level="largetitle">hello Wolrd</UIText>
      </View>
    </ScrollView>
  );
};
