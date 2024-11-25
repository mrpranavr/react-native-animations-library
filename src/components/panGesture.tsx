import { View, Text } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  PanGestureHandler,
} from "react-native-gesture-handler";

const SIZE = 100;
const CIRCLE_RADIUS = 180;

const PanGesture = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const contextX = useSharedValue(0);
  const contextY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onStart((event) => {
      contextX.value = translateX.value;
      contextY.value = translateY.value;
    })
    .onChange((event) => {
      translateX.value = event.translationX + contextX.value;
      translateY.value = event.translationY + contextY.value;
    })
    .onEnd(() => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2)

      if (distance < CIRCLE_RADIUS + SIZE / 2) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  const reanimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  }, []);

  return (
    <View className="mx-3">
      <View
        style={[
          {
            width: CIRCLE_RADIUS * 2,
            height: CIRCLE_RADIUS * 2,
            borderRadius: CIRCLE_RADIUS,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 5,
            borderColor: "rgba(0, 0, 256, 0.5)",
          },
        ]}
      >
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[
              {
                height: SIZE,
                width: SIZE,
                backgroundColor: "blue",
                borderRadius: 20,
              },
              reanimatedStyles,
            ]}
          />
        </GestureDetector>
      </View>
    </View>
  );
};

export default PanGesture;
