import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "subtitle" | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "GeistMedium",
  },
  title: {
    fontFamily: "GeistSemiBold",
    fontSize: 32,
    lineHeight: 32,
  },
  subtitle: {
    fontFamily: "GeistRegular",
    fontSize: 14.5,
    lineHeight: 24,
  },
  link: {
    fontFamily: "GeistRegular",
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
});
