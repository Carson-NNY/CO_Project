import {
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import React, { useState } from "react";
import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTasks } from "@/context/Task";

export default function HomeScreen() {
  const { addTask, tasks, toggleTask, deleteTask } = useTasks();
  const [input, setInput] = useState("");

  const handleAddTask = () => {
    if (input.trim()) {
      addTask(input);
      setInput("");
    }
  };

  const HeaderComponent = () => (
    <View style={styles.headerWrapper}>
      <Image
        source={require("@/assets/images/home_banner.png")}
        style={styles.home_banner}
      />
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">ListEase</ThemedText>
        <HelloWave />
      </ThemedView>
    </View>
  );

  return (
    <>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={HeaderComponent}
        renderItem={({ item }) => (
          <View
            style={[
              styles.taskContainer,
              item.completed && styles.completedContainer,
            ]}
          >
            <TouchableOpacity
              style={styles.checkmarkContainer}
              onPress={() => toggleTask(item.id)}
            >
              <Text style={styles.checkmark}>{item.completed ? "✓" : "○"}</Text>
            </TouchableOpacity>
            <ThemedText
              style={[styles.taskText, item.completed && styles.completedTask]}
            >
              {item.text}
            </ThemedText>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteTask(item.id)}
            >
              <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <ThemedView style={styles.taskInputContainer}>
        <TouchableOpacity onPress={handleAddTask} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          placeholderTextColor="#aaa"
          value={input}
          onChangeText={setInput}
        />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    flex: 1,
    alignItems: "center",
    marginBottom: 16,
  },
  home_banner: {
    height: 258,
    width: "100%",
    resizeMode: "cover",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  listContainer: {
    backgroundColor: "#fff",
  },
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  completedContainer: {
    opacity: 0.8,
  },
  checkmarkContainer: {
    marginRight: 12,
  },
  checkmark: {
    fontSize: 25,
    color: "#333",
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  completedTask: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  deleteButton: {
    marginLeft: "auto",
    backgroundColor: "#ff5c5c",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  taskInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 86,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    width: "90%",
    height: 50,
  },
  addButton: {
    backgroundColor: "#A1CEDC",
    padding: 12,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 24,
    color: "#fff",
  },
});
