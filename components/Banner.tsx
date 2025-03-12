import React from "react";
import { View, Text, Switch, Image, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

interface HeaderProps {
  filterUncompleted: boolean;
  setFilterUncompleted: (val: boolean) => void;
}

const BannerComponent: React.FC<HeaderProps> = ({
  filterUncompleted,
  setFilterUncompleted,
}) => {
  return (
    <View style={styles.headerWrapper}>
      <Image
        source={require("@/assets/images/home_banner.png")}
        style={styles.home_banner}
      />
      <ThemedView style={styles.titleContainer}>
        <View style={styles.headerRow}>
          <ThemedText type="light" style={styles.headerText}>
            Can also left/right swipe to complete/delete tasks
          </ThemedText>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Show Uncompleted Tasks</Text>
            <Switch
              value={filterUncompleted}
              onValueChange={setFilterUncompleted}
            />
          </View>
        </View>
      </ThemedView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    flex: 1,
  },
  home_banner: {
    height: 258,
    width: "100%",
    resizeMode: "cover",
  },
  titleContainer: {
    backgroundColor: "#lightgrey",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    flex: 1,
    fontSize: 13,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchLabel: {
    fontSize: 14,
    marginRight: 4,
  },
});

export default BannerComponent;
