import { Image, StyleSheet, TextInput, Button, Platform } from "react-native";
import React, { useState } from "react";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTasks } from "@/context/Task";

export default function HomeScreen() {
  const { addTask } = useTasks();
  const [input, setInput] = useState("");

  const handleAddTask = () => {
    // we prevent adding empty tasks here
    if (input.trim()) {
      addTask(input);
      setInput("");
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/home_banner.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">ListEase</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">
          easy-to-use task management solution.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.taskInputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          placeholderTextColor="#aaa"
          value={input}
          onChangeText={setInput}
        />
        <Button title="Add Task" onPress={handleAddTask} />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginLeft: 96,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 258,
    width: 420,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  taskInputContainer: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 12,
  },
});
