import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

interface PageProps {
  title: string;
  index: number;
  translateX: Animated.SharedValue<number>;
}

const { height, width } = Dimensions.get("window");
const SIZE = width * 0.7;

const InterpolatePage = ({ title, index, translateX }: PageProps) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];


  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolation.CLAMP
    );

    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, SIZE / 2, 0],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale: scale }],
      borderRadius: borderRadius,
    };
  }, []);

  const rTextStyle = useAnimatedStyle(() => {

    const translateY = interpolate(
      translateX.value,
      inputRange,
      [height/2, 0, -height/2],
      Extrapolation.CLAMP
    )
    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-2, 1, -2],
      Extrapolation.CLAMP
    )

    return {
      transform: [{ translateY: translateY }],
      opacity: opacity,
    }
  }, [])

  return (
    <View
      style={[
        styles.pageContainer,
        { backgroundColor: `rgba(0, 0, 256, ${index / 10})` },
      ]}
    >
      <Animated.View style={[styles.square, rStyle]} />
      <Animated.View className='absolute' style={[rTextStyle]}>
        <Text style={[styles.text]}>{title}</Text>
      </Animated.View>
    </View>
  );
};

export default InterpolatePage;

const styles = StyleSheet.create({
  pageContainer: {
    height,
    width,
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    height: SIZE,
    width: SIZE,
    backgroundColor: "rgba(0,0,256,0.4)",
  },
  text: {
    fontSize: 60,
    color: "white",
    fontWeight: "bold",
    textTransform: 'uppercase'
  }
});
