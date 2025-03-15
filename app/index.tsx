import { StyleSheet, View, ViewToken } from "react-native";
import React, { useRef, useState } from "react";
import Animated, { useSharedValue } from "react-native-reanimated";
import Header from "@/components/ui/Header";
import { BLOG_DATA } from "@/constants";
import { ThemedView } from "@/components/ThemedView";
import Article from "@/components/ui/Article";
import FlowBar from "@/components/ui/FlowBar";

export default function Index() {
  const { author, content, title, sections } = BLOG_DATA;
  const lastLoggedIndex = useSharedValue<number | null>(null);

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    const lastItem = viewableItems[viewableItems.length - 1];

    if (
      lastItem?.isViewable &&
      lastItem.index !== null &&
      lastItem.index !== lastLoggedIndex.value
    ) {
      lastLoggedIndex.value = lastItem.index;
      console.log(`Item ${lastItem.index} is in view`);
    }
  };

  const viewabilityConfigCallbackPairs = React.useRef([
    {
      viewabilityConfig: { itemVisiblePercentThreshold: 100 },
      onViewableItemsChanged,
    },
  ]);

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
        style={{
          flex: 1,
          alignSelf: "center",
          maxWidth: 640,
        }}
        contentContainerStyle={{ gap: 16, paddingBottom: 120 }}
        data={sections}
        renderItem={({ item, index }) => (
          <Article
            content={item.content}
            title={item.title}
            index={index + 1}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
      <FlowBar currentIndex={lastLoggedIndex} totalSections={sections.length} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
