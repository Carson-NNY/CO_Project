# Welcome!!!!

## Setup and Running Instructions

### Prerequisites

- Node.js
- npm or yarn
- Expo Go app on your mobile device

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/Carson-NNY/CO_Project.git
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install

   npm install react-native-gesture-handler

   ```

3. Install required gesture handler

   ```bash
   npm install react-native-gesture-handler

   ```

4. Start the development server

   ```bash
   npx expo start
   ```

5. Running on a device
   - press 'i' in the terminal to open on an iOS simulator

### Introduction

This app is a task management application that allows users to add, complete, and delete tasks with an intuitive interface. The app provides real-time feedback and multiple ways to interact with tasks.
<img width="332" alt="Screenshot 2025-03-11 at 10 36 32 PM" src="https://github.com/user-attachments/assets/eb8b84b0-3373-49c3-abb0-a83f8729762a" />

### Key Features

#### Task Management

- **Add Tasks**: Users can add new tasks via the input box at the bottom of the screen by either clicking the "+" icon or pressing the Enter key.
- **Complete Tasks**: Tasks can be marked as complete by either clicking the circle icon on the left side of the task or performing a right swipe gesture.
- **Delete Tasks**: Users can remove tasks by clicking the "X" icon on the right side or performing a left swipe gesture.
<img width="324" alt="Screenshot 2025-03-11 at 10 37 39 PM" src="https://github.com/user-attachments/assets/a5e49b6b-3f07-4666-a840-8f5e6f321a5b" />

#### User Interface

- **Date Tracking**: Each task displays the date it was created, helping users track when tasks were added.
- **Task Filtering**: A switch button allows users to toggle between viewing all tasks and only incomplete tasks. By default, all tasks are shown.
- **Visual Feedback**: Completed tasks are displayed with a strikethrough effect and in a lighter color to visually differentiate them from active tasks.
- **Action Notifications**: The app provides immediate feedback with notification messages at the bottom of the screen whenever a task is added, completed, or deleted.
<img width="258" alt="Screenshot 2025-03-11 at 10 50 41 PM" src="https://github.com/user-attachments/assets/9d6f2917-1c00-4763-aeb6-f4acd7f5ad12" />

#### Gesture Support

- **Swipe Actions**: The app supports intuitive swipe gestures - right swipe to complete tasks and left swipe to delete them (Requires react-native-gesture-handler dependency).
<img width="251" alt="Screenshot 2025-03-11 at 10 51 09 PM" src="https://github.com/user-attachments/assets/58a12720-9985-4388-a69a-a1eb92161277" />
