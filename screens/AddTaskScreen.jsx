import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Platform } from 'react-native';
import { TextInput, Button, Card, Text } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTaskScreen = ({ navigation, onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

const handleAddTask = async () => {
  if (!title.trim()) {
    alert('Please enter a title');
    return;
  }

  const newTask = {
    id: Date.now().toString(),
    title,
    description,
    date: date.toDateString(),
    isComplete: false,
  };

  try {
    const storedTasks = await AsyncStorage.getItem('tasks');
    const parsedTasks = storedTasks ? JSON.parse(storedTasks) : [];
    const updatedTasks = [...parsedTasks, newTask];

    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));

    onAddTask(newTask); // still update parent state
    setTitle('');
    setDescription('');
    setDate(new Date());

  } catch (error) {
    console.error('Error saving task:', error);
  }
};



  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Card style={styles.card}>
        <Card.Title title="Add New Task" />
        <Card.Content>
          <TextInput
            label="Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
            mode="outlined"
            multiline
          />

          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>Select Date:</Text>
            <Button
              icon="calendar"
              mode="outlined"
              onPress={() => setShowDatePicker(true)}
              style={styles.dateButton}
            >
              {date.toDateString()}
            </Button>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onChangeDate}
            />
          )}

          <Button
            mode="contained"
            onPress={handleAddTask}
            style={styles.button}
          >
            Add Task
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default AddTaskScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
  },
  card: {
    borderRadius: 12,
    elevation: 4,
    paddingVertical: 10,
  },
  input: {
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  dateLabel: {
    fontSize: 16,
    color: '#333',
  },
  dateButton: {
    flex: 1,
    marginLeft: 12,
  },
  button: {
    marginTop: 20,
    paddingVertical: 6,
  },
});
