import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { Ref } from "react";
import { TaskInterface } from "@/components/swipeToDelete";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";

interface ListItemProps {
  task: TaskInterface;
  onDismiss? : (task: TaskInterface) => void,
  simGesture: any
}

const LIST_ITEM_HEIGHT = 70;
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const THRESHOLD = SCREEN_WIDTH * 0.35;

const ListItem = ({ task, onDismiss, simGesture }: ListItemProps) => {
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT)
  const marginVertical = useSharedValue(10)
  const opacity = useSharedValue(1)

  const panGesture = Gesture.Pan()
    .onChange((event) => {
      translateX.value = event.translationX <= 0 ? event.translationX : 0;
    })
    .onEnd(() => {
      const shouldBeDismissed = translateX.value < -THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0)
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if(isFinished && onDismiss){
           runOnJS(onDismiss)(task)
          }
        } )
      } else {
        translateX.value = withSpring(0);
      }
    })
    .simultaneousWithExternalGesture(simGesture)

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = translateX.value < -THRESHOLD ? withTiming(1) : withTiming(0)
    return {
      opacity: opacity,
    }
  })

  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    }
  })

  return (
    <Animated.View style={rTaskContainerStyle} className="w-full items-center">
      <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
        <FontAwesome5
          name={"trash-alt"}
          size={LIST_ITEM_HEIGHT * 0.4}
          color={"red"}
        />
      </Animated.View>
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[rStyle]}
          className="w-[90%] h-20 bg-white rounded-md shadow shadow-slate-500/30  pl-5 justify-center"
        >
          <Text className="text-md font-regular">{task.title}</Text>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  iconContainer: {
    height: LIST_ITEM_HEIGHT,
    width: LIST_ITEM_HEIGHT,
    // backgroundColor: 'red',
    position: "absolute",
    right: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
});
