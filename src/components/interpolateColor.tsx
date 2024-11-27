import { StyleSheet, Switch, Text, View } from "react-native";
import React, { useState } from "react";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const Colors = {
  dark: {
    background: "#1e1e1e",
    circle: "#252525",
    text: "#f8f8f8",
  },
  light: {
    background: "#f8f8f8",
    circle: "#FFF",
    text: "#1e1e1e",
  },
};

const SWITCH_TRACK_COLOR = {
  true: "rgba(256, 0, 256, 0.2)",
  false: "rgba(0,0,0,0.1)",
};

type Theme = "light" | "dark";

const InterpolateColors = () => {
  const [theme, setTheme] = useState<Theme>("light");

  // const progress = useSharedValue(0);
  const progress = useDerivedValue(() => {
    return theme === 'dark' ? withTiming(1) : withTiming(0)
  }, [theme])

  const rStyles = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.background, Colors.dark.background]
    );

    return {
      backgroundColor,
    };
  }, []);

  return (
    <Animated.View style={[rStyles]} className='flex-1 items-center justify-center w-full h-full'>
      <Switch
        value={theme === "dark"}
        onValueChange={(toggled) => {
          setTheme(toggled ? "dark" : "light");
        }}
        trackColor={SWITCH_TRACK_COLOR}
        thumbColor={"violet"}
      />
    </Animated.View>
  );
};

export default InterpolateColors;

const styles = StyleSheet.create({});
