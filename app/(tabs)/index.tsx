import React, { useState, useCallback } from "react";
import {
  FlatList,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Platform,
  StyleSheet,
} from "react-native";
import Tasks from "@/components/Task";
import TaskItem from "@/components/TaskItem";
import BannerComponent from "@/components/Banner";
import { ThemedView } from "@/components/ThemedView";

// the main screen of the app
export default function HomeScreen() {
  const [input, setInput] = useState("");
  const [statusChanged, setStatusChanged] = useState("");
  const [filterUncompleted, setFilterUncompleted] = useState(false);

  return (
    <Tasks>
      {({ tasks, addTask, toggleTask, deleteTask }) => {
        const displayedTasks = filterUncompleted
          ? tasks.filter((task) => !task.completed)
          : tasks;

        // handlers for new changes(include a message to show the status of the action)
        const handleCompleteTask = (id) => {
          // Toggle task completion status
          toggleTask(id);
          const task = tasks.find((t) => t.id === id);
          if (task) {
            setStatusChanged(
              task.completed
                ? "Task marked as incomplete!"
                : "🎉 Task completed successfully!"
            );
            setTimeout(() => setStatusChanged(""), 2000);
          }
        };

        // Define the handler for deleting a task
        const handleDeleteTask = (id) => {
          deleteTask(id);
          setStatusChanged("Task deleted successfully!");
          setTimeout(() => setStatusChanged(""), 2000);
        };

        // Define the handler for adding a task
        const handleAddTask = () => {
          if (input.trim()) {
            addTask(input);
            setInput("");
            setStatusChanged("💪🏻 Task added successfully!");
            setTimeout(() => setStatusChanged(""), 2000);
          }
        };

        // Memoize the header to avoid unnecessary re-renders of the image
        const renderHeader = useCallback(() => {
          return (
            <BannerComponent
              filterUncompleted={filterUncompleted}
              setFilterUncompleted={setFilterUncompleted}
            />
          );
        }, [filterUncompleted, setFilterUncompleted]);

        return (
          <View style={styles.container}>
            <FlatList
              data={displayedTasks}
              keyExtractor={(item) => item.id}
              ListHeaderComponent={renderHeader}
              ListFooterComponent={() =>
                displayedTasks.length === 0 ? (
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No tasks at the moment</Text>
                    <Text style={styles.emptySubText}>
                      Start by adding a new task in the box below.
                    </Text>
                  </View>
                ) : null
              }
              renderItem={({ item }) => (
                <TaskItem
                  item={item}
                  handleCompleteTask={handleCompleteTask}
                  handleDeleteTask={handleDeleteTask}
                />
              )}
            />

            {statusChanged ? (
              <ThemedView style={styles.statusChangedContainer}>
                <Text style={styles.statusChangedText}>{statusChanged}</Text>
              </ThemedView>
            ) : null}

            <ThemedView style={styles.taskInputContainer}>
              <TouchableOpacity
                onPress={handleAddTask}
                style={styles.addButton}
              >
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                placeholder="Add a new task"
                placeholderTextColor="#aaa"
                value={input}
                onChangeText={setInput}
                maxLength={40}
                returnKeyType="done"
                onSubmitEditing={handleAddTask}
              />
            </ThemedView>
          </View>
        );
      }}
    </Tasks>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 200,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
  },
  emptySubText: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
  statusChangedContainer: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  statusChangedText: {
    color: "#fff",
    fontSize: 14,
  },
  taskInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: Platform.select({
      ios: 84,
      android: 84,
      default: 0,
    }),
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    width: "90%",
    height: 50,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: "#A1CEDC",
    padding: 12,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  addButtonText: {
    fontSize: 24,
    color: "#fff",
  },
});
