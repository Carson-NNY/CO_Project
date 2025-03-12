import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
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
import { ThemedText } from "@/components/ThemedText";
import { Task } from "@/components/Task";

interface TaskItemProps {
  item: Task;
  handleCompleteTask: (id: string) => void;
  handleDeleteTask: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  item,
  handleCompleteTask,
  handleDeleteTask,
}) => {
  const translateX = useSharedValue(0);

  // Animates task movement based on swipe interaction
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  // Controls opacity of "Complete" label when swiping right
  const completeLabelStyle = useAnimatedStyle(() => ({
    opacity: translateX.value > 0 ? Math.min(translateX.value / 100, 1) : 0,
  }));

  // Controls opacity of "Delete" label when swiping left
  const deleteLabelStyle = useAnimatedStyle(() => ({
    opacity: translateX.value < 0 ? Math.min(-translateX.value / 100, 1) : 0,
  }));

  const panGesture = Gesture.Pan()
    .onUpdate((event: PanGestureHandlerEventPayload) => {
      translateX.value = event.translationX;
    })
    .onEnd((event: PanGestureHandlerEventPayload) => {
      if (event.translationX > 100) {
        runOnJS(handleCompleteTask)(item.id); // Marks task as complete when swiped right
      } else if (event.translationX < -100) {
        runOnJS(handleDeleteTask)(item.id); // Deletes task when swiped left
      }
      translateX.value = withTiming(0);
    });

  return (
    <View style={styles.rowContainer}>
      {/* when swiped right, show the Complete background */}
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

      {/* when swiped left, show the Delete background */}
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
          {/* handle complete/incomplete status */}
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

const styles = StyleSheet.create({
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
});

export default TaskItem;
