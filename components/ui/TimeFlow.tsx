import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
  useDerivedValue,
  SharedValue,
  Extrapolation,
} from "react-native-reanimated";
import { ThemedText } from "../ThemedText";
import { useScaleFont } from "@/hooks/useFontScale";

type TimeFlowProps = {
  seconds: SharedValue<number>;
  hours?: boolean;
};

const DIGIT_HEIGHT = 16;
const TOTAL_DIGITS = 10;

const TimeFlowDigit: React.FC<{ digit: SharedValue<number> }> = ({ digit }) => {
  const scaleFont = useScaleFont();
  const fontSize = scaleFont(11.5);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            digit.value,
            [0, 9],
            [0, -9 * DIGIT_HEIGHT],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <View style={styles.digitContainer}>
      <Animated.View style={animatedStyle}>
        {[...Array(TOTAL_DIGITS).keys()].map((num) => (
          <ThemedText
            light
            key={num}
            style={[styles.digitText, { fontSize }]}
            type="title"
          >
            {num}
          </ThemedText>
        ))}
      </Animated.View>
    </View>
  );
};

const extractDigit = (
  value: SharedValue<number>,
  divisor: number,
  place: number
) => {
  return useDerivedValue(() => {
    return Math.floor(((value.value / divisor) % 60) / place) % 10;
  });
};

const TimeFlow: React.FC<TimeFlowProps> = ({ seconds, hours = true }) => {
  const hoursTens = extractDigit(seconds, 3600, 10);
  const hoursOnes = extractDigit(seconds, 3600, 1);
  const minutesTens = extractDigit(seconds, 60, 10);
  const minutesOnes = extractDigit(seconds, 60, 1);
  const secondsTens = extractDigit(seconds, 1, 10);
  const secondsOnes = extractDigit(seconds, 1, 1);
  const scaleFont = useScaleFont();
  const fontSize = scaleFont(11.5);

  const hourWidth = useAnimatedStyle(() => {
    return {
      width: hours || hoursOnes.value > 0 ? "auto" : 0,
      overflow: "hidden",
      flexDirection: "row",
    };
  });

  return (
    <View style={styles.timeFlow}>
      <Animated.View style={hourWidth}>
        <TimeFlowDigit digit={hoursTens} />
        <TimeFlowDigit digit={hoursOnes} />
        <ThemedText light style={[styles.separator, { fontSize }]}>
          :
        </ThemedText>
      </Animated.View>
      <TimeFlowDigit digit={minutesTens} />
      <TimeFlowDigit digit={minutesOnes} />
      <ThemedText light style={[styles.separator, { fontSize }]}>
        :
      </ThemedText>
      <TimeFlowDigit digit={secondsTens} />
      <TimeFlowDigit digit={secondsOnes} />
    </View>
  );
};

export default TimeFlow;

const styles = StyleSheet.create({
  timeFlow: {
    flexDirection: "row",
    alignItems: "center",
    opacity: 0.4,
  },
  digitContainer: { width: "auto", height: DIGIT_HEIGHT, overflow: "hidden" },
  digitText: {
    textAlign: "center",
    lineHeight: DIGIT_HEIGHT,
    height: DIGIT_HEIGHT,
  },
  separator: {
    marginHorizontal: 1.5,
    lineHeight: DIGIT_HEIGHT,
  },
});
