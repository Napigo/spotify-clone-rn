import React from "react";
import { LinearGradient } from "expo-linear-gradient";

export const TabbarBackground: React.FC = () => {
  return (
    <LinearGradient
      colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,1)"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{
        height: "100%",
      }}
    />
  );
};
