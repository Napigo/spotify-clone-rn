import React from "react";
import { View } from "react-native";
import { UIButton } from "../../components/common/UIButton";

export const LoginView: React.FC = () => {
  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        gap: 10,
      }}
    >
      <UIButton text="Sign up for free" />
      <UIButton variant="base-outlined" text="Sign up with Google" />
      <UIButton variant="base-outlined" text="Sign up with facebook" />
    </View>
  );
};
