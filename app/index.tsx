import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated from "react-native-reanimated";
import Header from "@/components/ui/Header";
import { BLOG_DATA } from "@/constants";
import { ThemedView } from "@/components/ThemedView";
import Article from "@/components/ui/Article";

export default function Index() {
  const { author, content, title, sections } = BLOG_DATA;
  return (
    <ThemedView style={{ flex: 1 }}>
      <Animated.FlatList
        ListHeaderComponent={() => (
          <Header
            title={title}
            content={content}
            onBackPress={() => {}}
            onBookmarkPress={() => {}}
            isBookmarked={false}
          />
        )}
        style={{ flex: 1, alignSelf: "center", maxWidth: 640 }}
        contentContainerStyle={{ gap: 16 }}
        data={sections}
        renderItem={({ item, index }) => (
          <Article
            content={item.content}
            title={item.title}
            index={index + 1}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
