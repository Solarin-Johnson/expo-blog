import { StyleSheet, View, ViewToken } from "react-native";
import React, { useRef, useState } from "react";
import Animated, {
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import Header from "@/components/ui/Header";
import { BLOG_DATA } from "@/constants";
import { ThemedView } from "@/components/ThemedView";
import Article from "@/components/ui/Article";
import FlowBar from "@/components/ui/FlowBar";
import TimeFlow from "@/components/ui/TimeFlow";

const { content, title, sections } = BLOG_DATA;

export default function Index() {
  const lastLoggedIndex = useSharedValue<number>(0);

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    const lastItem = viewableItems[viewableItems.length - 1];

    if (lastItem?.isViewable && lastItem.index !== null) {
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

  const scrollY = useSharedValue(0);
  const totalHeight = useSharedValue(1);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
      totalHeight.value =
        event.contentSize.height - event.layoutMeasurement.height;
      // console.log(totalHeight.value, scrollY.value);
    },
  });

  const progress = useDerivedValue(() =>
    totalHeight.value > 0 ? scrollY.value / totalHeight.value : 0
  );

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
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      />
      <FlowBar
        scrollHeight={totalHeight}
        currentIndex={lastLoggedIndex}
        totalSections={sections.length}
        progress={progress}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
