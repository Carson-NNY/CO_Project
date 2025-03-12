import React, { useState } from "react";
import {
  FlatList,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import Tasks from "@/components/Task";
import TaskItem from "@/components/TaskItem";
import BannerComponent from "@/components/Banner";
import { ThemedView } from "@/components/ThemedView";

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

        const handleAddTask = () => {
          if (input.trim()) {
            addTask(input);
            setInput("");
            setStatusChanged("Task added successfully!");
            setTimeout(() => setStatusChanged(""), 2000); // Clear message after 2 seconds
          }
        };

        return (
          <View style={styles.container}>
            <FlatList
              data={displayedTasks}
              keyExtractor={(item) => item.id}
              ListHeaderComponent={() => (
                <BannerComponent
                  filterUncompleted={filterUncompleted}
                  setFilterUncompleted={setFilterUncompleted}
                />
              )}
              ListFooterComponent={() =>
                displayedTasks.length === 0 ? (
                  //  only show when there are no tasks
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No tasks at the moment</Text>
                    <Text style={styles.emptySubText}>
                      Add a new task to get started.
                    </Text>
                  </View>
                ) : null
              }
              renderItem={({ item }) => (
                <TaskItem
                  item={item}
                  handleCompleteTask={toggleTask}
                  handleDeleteTask={deleteTask}
                />
              )}
            />

            {/* Status Changed Notification(add/delete/complete tasks) */}
            {statusChanged ? (
              <ThemedView style={styles.statusChangedContainer}>
                <Text style={styles.statusChangedText}>{statusChanged}</Text>
              </ThemedView>
            ) : null}

            {/* Task Input Box */}
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
    marginBottom: 84,
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
    marginRight: 10,
  },
  addButtonText: {
    fontSize: 24,
    color: "#fff",
  },
});
