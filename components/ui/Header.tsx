import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "../ThemedText";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ResponsiveText from "../ResponsiveText";
import { useScaleFont } from "@/hooks/useFontScale";
import { useThemeColor } from "@/hooks/useThemeColor";

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
  const scaleFont = useScaleFont();
  const text = useThemeColor({}, "text");
  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity onPress={onBackPress} style={styles.actionBtn}>
          <Ionicons
            name="chevron-back-outline"
            color={text}
            size={scaleFont(25)}
          />
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
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionBtn: {},
  title: {},
  head: {
    flexDirection: "column",
    width: "100%",
    gap: 6,
  },
  content: {
    paddingVertical: 5,
  },
});

export default Header;
