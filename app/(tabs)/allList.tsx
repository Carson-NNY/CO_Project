import {
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  View,
  Text,
} from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ThemedText } from "@/components/ThemedText";
import { useTasks } from "@/context/Task";

export default function TabTwoScreen() {
  const { tasks, toggleTask, deleteTask } = useTasks();

  return (
    <FlatList
      data={tasks} // show all tasks
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <Image
            source={require("@/assets/images/home_banner.png")}
            style={styles.bannerContainer}
          />
          <ThemedText type="light">
            Click the circle on the left to mark a task as completed. Click the
            "X" on the right to remove a task.
          </ThemedText>
        </View>
      }
      renderItem={({ item }) => (
        <View
          style={[
            styles.taskContainer,
            item.completed && styles.completedContainer,
          ]}
        >
          {/* Mark or unmark the task as completed */}
          <TouchableOpacity
            style={styles.checkmarkContainer}
            onPress={() => toggleTask(item.id)}
          >
            <Text style={styles.checkmark}>{item.completed ? "✓" : "○"}</Text>
          </TouchableOpacity>
          {/* Task Text */}
          <ThemedText
            style={[styles.taskText, item.completed && styles.completedTask]}
          >
            {item.text}
          </ThemedText>
          <Text style={styles.taskDate}>{item.date}</Text>
          {/* Delete the task */}
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteTask(item.id)}
          >
            <Text style={styles.deleteButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

//     <Collapsible title="Animations">
//       <ThemedText>
//         This template includes an example of an animated component. The{" "}
//         <ThemedText type="defaultSemiBold">
//           components/HelloWave.tsx
//         </ThemedText>{" "}
//         component uses the powerful{" "}
//         <ThemedText type="defaultSemiBold">
//           react-native-reanimated
//         </ThemedText>{" "}
//         library to create a waving hand animation.
//       </ThemedText>
//       {Platform.select({
//         ios: (
//           <ThemedText>
//             The{" "}
//             <ThemedText type="defaultSemiBold">
//               components/ParallaxScrollView.tsx
//             </ThemedText>{" "}
//             component provides a parallax effect for the header image.
//           </ThemedText>
//         ),
//       })}
//     </Collapsible>

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    paddingBottom: 16,
  },
  bannerContainer: {
    width: "100%",
    height: 240,
    resizeMode: "cover",
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
  taskDate: {
    fontSize: 12,
    color: "#aaa",
    marginTop: 2,
    textAlign: "right",
  },
});
