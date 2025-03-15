import React from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, Text, View } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";

interface FlowBarProps {
  currentIndex: SharedValue<number | null>;
  totalSections: number;
}

export default function FlowBar({ currentIndex, totalSections }: FlowBarProps) {
  const backgroundColor = useThemeColor({}, "text");

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity =
      currentIndex.value !== null
        ? interpolate(currentIndex.value, [0, totalSections - 1], [0.2, 1])
        : 0;
    return {
      opacity,
    };
  });

  return (
    <Animated.View style={animatedTextStyle}>
      <ThemedView invert style={[styles.container, { backgroundColor }]}>
        <ThemedText invert>FlowBar </ThemedText>
      </ThemedView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "red",
    alignSelf: "center",
    width: "82%",
    height: 48,
    borderRadius: 50,
    bottom: "4%",
    overflow: "hidden",
  },
});
