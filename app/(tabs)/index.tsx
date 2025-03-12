import {
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  View,
  Text,
  Switch,
} from "react-native";
import React, { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Tasks, { Task } from "@/components/Task";
import {
  Gesture,
  GestureDetector,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";

// Separate TaskItem component for swipe gestures and animations
const TaskItem: React.FC<{
  item: Task;
  handleCompleteTask: (id: string) => void;
  handleDeleteTask: (id: string) => void;
}> = ({ item, handleCompleteTask, handleDeleteTask }) => {
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  // Background label for "Complete"
  const completeLabelStyle = useAnimatedStyle(() => ({
    opacity: translateX.value > 0 ? Math.min(translateX.value / 100, 1) : 0,
  }));

  // Background label for "Delete"
  const deleteLabelStyle = useAnimatedStyle(() => ({
    opacity: translateX.value < 0 ? Math.min(-translateX.value / 100, 1) : 0,
  }));

  const panGesture = Gesture.Pan()
    .onUpdate((event: PanGestureHandlerEventPayload) => {
      translateX.value = event.translationX;
    })
    .onEnd((event: PanGestureHandlerEventPayload) => {
      if (event.translationX > 100) {
        runOnJS(handleCompleteTask)(item.id);
        translateX.value = withTiming(0);
      } else if (event.translationX < -100) {
        runOnJS(handleDeleteTask)(item.id);
        translateX.value = withTiming(0);
      } else {
        translateX.value = withTiming(0);
      }
    });

  return (
    <View style={styles.rowContainer}>
      {/* Background label for complete action */}
      <Animated.View
        style={[
          styles.backgroundLabel,
          styles.completeBackground,
          completeLabelStyle,
        ]}
      >
        <Text style={styles.backgroundLabelText}>
          {item.completed ? "Reopen" : "Complete"}
        </Text>
      </Animated.View>
      {/* Background label for delete action */}
      <Animated.View
        style={[
          styles.backgroundLabel,
          styles.deleteBackground,
          deleteLabelStyle,
        ]}
      >
        <Text style={styles.backgroundLabelText}>Delete</Text>
      </Animated.View>

      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[
            styles.taskContainer,
            animatedStyle,
            item.completed && styles.completedContainer,
          ]}
        >
          <TouchableOpacity
            style={styles.checkmarkContainer}
            onPress={() => handleCompleteTask(item.id)}
          >
            <Text style={styles.checkmark}>{item.completed ? "✓" : "○"}</Text>
          </TouchableOpacity>

          <View style={styles.taskTextContainer}>
            <ThemedText
              style={[styles.taskText, item.completed && styles.completedTask]}
            >
              {item.text}
            </ThemedText>
            <Text style={styles.taskDate}>{item.date}</Text>
          </View>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteTask(item.id)}
          >
            <Text style={styles.deleteButtonText}>X</Text>
          </TouchableOpacity>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const HeaderComponent: React.FC<{
  filterUncompleted: boolean;
  setFilterUncompleted: (val: boolean) => void;
}> = ({ filterUncompleted, setFilterUncompleted }) => {
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

export default function HomeScreen() {
  const [input, setInput] = useState("");
  const [statusChanged, setStatusChanged] = useState("");
  const [filterUncompleted, setFilterUncompleted] = useState(false);

  return (
    <Tasks>
      {({ tasks, addTask, toggleTask, deleteTask }) => {
        // If filterUncompleted is true, show only tasks that are not completed;
        // otherwise, show all tasks.
        const displayedTasks = filterUncompleted
          ? tasks.filter((task) => !task.completed)
          : tasks;

        const handleAddTask = () => {
          if (input.trim()) {
            addTask(input);
            setInput("");
            setStatusChanged("Task added successfully!");
            setTimeout(() => setStatusChanged(""), 2000);
          }
        };

        const handleCompleteTask = (id: string) => {
          const task = tasks.find((t) => t.id === id);
          toggleTask(id);
          if (task && !task.completed) {
            setStatusChanged("🎉 Task completed successfully!");
          }
          setTimeout(() => setStatusChanged(""), 2000);
        };

        const handleDeleteTask = (id: string) => {
          deleteTask(id);
          setStatusChanged("Task deleted successfully!");
          setTimeout(() => setStatusChanged(""), 2000);
        };

        return (
          <>
            <FlatList
              data={displayedTasks}
              keyExtractor={(item) => item.id}
              ListHeaderComponent={() => (
                <HeaderComponent
                  filterUncompleted={filterUncompleted}
                  setFilterUncompleted={setFilterUncompleted}
                />
              )}
              ListFooterComponent={() =>
                displayedTasks.length === 0 ? (
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
          </>
        );
      }}
    </Tasks>
  );
}

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
  rowContainer: {
    marginHorizontal: 13,
    marginVertical: 8,
  },
  backgroundLabel: {
    position: "absolute",
    top: 0,
    bottom: 0,
    justifyContent: "center",
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  completeBackground: {
    left: 0,
    backgroundColor: "#A1CEDC",
  },
  deleteBackground: {
    right: 0,
    backgroundColor: "#ff5c5c",
  },
  backgroundLabelText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#DDD",
    backgroundColor: "#fff",
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
  taskTextContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  taskText: {
    fontSize: 16,
    color: "#333",
  },
  completedTask: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  taskDate: {
    fontSize: 12,
    color: "#aaa",
    marginTop: 2,
    textAlign: "right",
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
  statusChangedContainer: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  statusChangedText: {
    color: "#fff",
    fontSize: 14,
  },
});
