import { Link } from "expo-router";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";


const SIZE = 100.0 

const handleRotation = (progress: Animated.SharedValue<number>) => {
  'worklet'
  return `${progress.value * Math.PI * 2}rad`
} 

export default function Intro() {

  const progress = useSharedValue(1)
  const scale = useSharedValue(2)

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: (progress.value * SIZE) / 2,
      transform: [{ scale: scale.value }, {rotate: handleRotation(progress)} ]
    }
  }, [])

  useEffect(() => {
    progress.value = withRepeat(withSpring(0.5), -1, true)
    scale.value = withRepeat(withSpring(1), -1, true)
  }, [])

  return (
    <View className="flex flex-1 justify-center items-center">
      <Animated.View style={[reanimatedStyle, { height: SIZE, width: SIZE, backgroundColor: "blue" }]} />
    </View>
  );
}
