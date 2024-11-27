import InterpolateColors from "@/components/interpolateColor";
import InterpolateWithScrollView from "@/components/interpolateWithScroll";
import Intro from "@/components/intro";
import PanGesture from "@/components/panGesture";
import { Link } from "expo-router";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Page() {
  return (
    <View className="flex flex-1 justify-center items-center">
      {/* <Intro />  */}
      {/* <GestureHandlerRootView className="flex-1 justify-center items-center mx-3">
        <PanGesture />
      </GestureHandlerRootView> */}
      {/* <InterpolateWithScrollView /> */}
      <InterpolateColors />
    </View>
  );
}
