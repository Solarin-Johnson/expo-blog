import React from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Platform, StyleSheet, Text, TextStyle, View } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import Animated, {
  Easing,
  interpolate,
  SharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { BLOG_DATA } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const isWeb = Platform.OS === "web";

interface FlowBarProps {
  currentIndex: SharedValue<number>;
  progress: SharedValue<number>;
  scrollHeight: SharedValue<number>;
  totalSections: number;
}

const PEEK_VIEW_HEIGHT = 52;

const { author, content, title, sections } = BLOG_DATA;
const SECTIONS_TITLE = sections.map((section) => section.title);

export default function FlowBar({
  currentIndex,
  progress,
  scrollHeight,
  totalSections,
}: FlowBarProps) {
  const backgroundColor = useThemeColor({}, "barColor");

  const scrollProgress = useDerivedValue(() => progress.value);

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity =
      currentIndex.value !== null
        ? interpolate(progress.value, [0, 1], [1, 1])
        : 0;
    return {
      opacity,
    };
  });

  const scrollTitleViewStyle = useAnimatedStyle(() => {
    const translateY = withTiming(
      interpolate(
        currentIndex.value,
        [0, totalSections],
        [0, -totalSections * PEEK_VIEW_HEIGHT]
      ),
      { duration: 400 }
    );
    return {
      transform: [{ translateY }],
    };
  });

  return (
    <Animated.View
      style={[styles.container, { backgroundColor }, animatedTextStyle]}
    >
      <View style={styles.main}>
        <View style={styles.handle}>
          <View style={styles.handleCircle} />
        </View>
        <View style={styles.peek}>
          <Animated.View style={[scrollTitleViewStyle]}>
            <SectionList height={PEEK_VIEW_HEIGHT} />
          </Animated.View>
          <Overlay />
        </View>
        <RadialProgress progress={scrollProgress} />
      </View>
    </Animated.View>
  );
}

const SectionList = ({ height }: { height?: number | 24 }): JSX.Element => {
  return (
    <View>
      {SECTIONS_TITLE.map((title, index) => (
        <ThemedText
          key={index}
          invert
          light
          style={{
            height,
            lineHeight: height,
            fontSize: 14.8,
            fontFamily: "GeistSemiBold",
            maxWidth: "95%",
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </ThemedText>
      ))}
    </View>
  );
};

const RadialProgress = ({ progress }: { progress: SharedValue<number> }) => {
  const radius = PEEK_VIEW_HEIGHT - 10;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const size = 32;
  const text = useThemeColor({}, "text");

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: (1 - progress.value) * circumference,
  }));

  return (
    <View
      style={{
        paddingHorizontal: 8,
        alignItems: "flex-end",
        justifyContent: "center",
        // backgroundColor: "red",
        height: "100%",
      }}
    >
      <Svg width={size} height={size} viewBox={`-50 -50 100 100`}>
        {/* Background Circle */}
        <Circle
          cx="0"
          cy="0"
          r={radius}
          stroke="#ffffff50"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress Circle */}
        <AnimatedCircle
          cx="0"
          cy="0"
          r={radius}
          stroke={"#ffffff"}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap="round"
          transform="rotate(-90)"
        />
      </Svg>
    </View>
  );
};

const Overlay = () => {
  const color = useThemeColor({}, "barColor");
  return (
    <LinearGradient
      colors={[color, "transparent", "transparent", color]}
      style={styles.overlay}
      // locations={[0, 0.5, 0.5, 1]}
      dither
    />
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "red",
    alignSelf: "center",
    width: "86%",
    maxWidth: 360,
    // height: 100,
    borderRadius: 100,
    bottom: "3.2%",
    overflow: "hidden",
  },

  peek: {
    height: PEEK_VIEW_HEIGHT,
    flex: 1,
    overflow: "hidden",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
  },

  main: {
    flexDirection: "row",
    alignItems: "center",
    // padding: 8,
  },
  handle: {
    padding: 10,
    height: isWeb ? PEEK_VIEW_HEIGHT : "auto",
  },
  handleCircle: {
    height: "100%",
    aspectRatio: 1,
    backgroundColor: "#fff",
    borderRadius: "50%",
  },
});
