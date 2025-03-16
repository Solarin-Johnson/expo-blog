import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";

type ArticleProps = {
  title: string;
  content: string[];
  index: number;
};

const Article: React.FC<ArticleProps> = ({ title, content, index }) => {
  return (
    <View style={styles.article} accessibilityRole="tab">
      <View style={styles.header}>
        <ThemedText style={styles.title} type="default">
          {title}
        </ThemedText>
      </View>
      <View style={styles.section}>
        {content.map((paragraph, i) => (
          <ThemedText key={i} style={styles.content} type="subtitle">
            {paragraph}
          </ThemedText>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  article: {
    marginVertical: 10,
    paddingHorizontal: 16,
    padding: 10,
    borderRadius: 5,
  },
  header: {
    // marginBottom: 5,
  },
  title: {
    // fontSize: 20,
  },
  section: {
    marginTop: 10,
    gap: 20,
  },
  content: {
    // fontSize: 14.5,
    opacity: 0.8,
  },
});

export default Article;
