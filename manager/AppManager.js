import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import AddTaskScreen from '../screens/AddTaskScreen';
import HomeScreen from '../screens/HomeScreen';
import { AppScreens } from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

const AppManager = () => {
  const [CurrentScreen, setCurrentScreen] = useState(AppScreens.HomeScreen);
  const [Tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load tasks from AsyncStorage on mount
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error('Error loading tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  // Save tasks whenever they change
  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(Tasks));
      } catch (error) {
        console.error('Error saving tasks:', error);
      }
    };

    if (!loading) {
      saveTasks();
    }
  }, [Tasks, loading]);

  const addTask = (task) => {
    setTasks((prev) => [...prev, task]);
    setCurrentScreen(AppScreens.HomeScreen);
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isComplete: !task.isComplete } : task
      )
    );
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.screenContainer}>
        {CurrentScreen === AppScreens.AddTaskScreen ? (
          <AddTaskScreen
            onAddTask={addTask}
            goBack={() => setCurrentScreen(AppScreens.HomeScreen)}
          />
        ) : (
          <HomeScreen
            tasks={Tasks}
            onDelete={deleteTask}
            onComplete={toggleComplete}
            goToAddTask={() => setCurrentScreen(AppScreens.AddTaskScreen)}
          />
        )}
      </View>

      {/* ✅ Custom Bottom Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setCurrentScreen(AppScreens.HomeScreen)}
        >
          <Icon
            name="home-outline"
            size={28}
            color={CurrentScreen === AppScreens.HomeScreen ? '#00eaffff' : '#888'}
          />
          <Text style={CurrentScreen === AppScreens.HomeScreen ? styles.activeText : styles.inactiveText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setCurrentScreen(AppScreens.AddTaskScreen)}
        >
          <Icon
            name="add-circle-outline"
            size={28}
            color={CurrentScreen === AppScreens.AddTaskScreen ? '#00eaffff' : '#888'}
          />
          <Text style={CurrentScreen === AppScreens.AddTaskScreen ? styles.activeText : styles.inactiveText}>Add Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppManager;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    elevation: 4,
  },
  navItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeText: {
    color: '#00eaffff',
    fontSize: 12,
  },
  inactiveText: {
    color: '#888',
    fontSize: 12,
  },
});
