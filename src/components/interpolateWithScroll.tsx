import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import InterpolatePage from "./Page";

const WORDS = ["What's", "up", "?", "How's", "the", "day"];

const InterpolateWithScrollView = () => {

  const translateX = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x
  });

  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      scrollEventThrottle={16} // 60fps animation
      className="flex-1 bg-white"
      horizontal
      pagingEnabled
    >
      {WORDS.map((title, index) => {
        return (
          <InterpolatePage key={index.toString()} title={title} index={index} translateX={translateX}/>
        );
      })}
    </Animated.ScrollView>
  );
};

export default InterpolateWithScrollView;

const styles = StyleSheet.create({});
