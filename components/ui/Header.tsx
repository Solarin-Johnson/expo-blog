import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "../ThemedText";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ResponsiveText from "../ResponsiveText";

interface HeaderProps {
  title: string;
  content: string;
  onBackPress: () => void;
  onBookmarkPress: () => void;
  isBookmarked?: boolean;
}

const Header = ({
  title,
  content,
  onBackPress,
  onBookmarkPress,
  isBookmarked = false,
}: HeaderProps) => {
  const { top } = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity onPress={onBackPress} style={styles.actionBtn}>
          <ThemedText>
            <Ionicons name="chevron-back-outline" size={24} />
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity onPress={onBookmarkPress} style={styles.actionBtn}>
          <ThemedText>
            <Ionicons
              name={isBookmarked ? "bookmark" : "bookmark-outline"}
              size={23}
            />
          </ThemedText>
        </TouchableOpacity>
      </View>
      <View style={styles.head}>
        <View>
          <ResponsiveText
            style={styles.title}
            text={title}
            baseSize={28}
            type="title"
          />
        </View>
        <ThemedText style={styles.content} type="subtitle">
          {content}
        </ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 4,
  },
  nav: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 16,
    justifyContent: "space-between",
  },
  actionBtn: {},
  title: {
    flex: 1,
  },
  head: {
    flexDirection: "column",
    width: "100%",
    gap: 8,
  },
  content: {
    paddingVertical: 5,
  },
});

export default Header;
