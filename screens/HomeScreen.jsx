import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import TaskItem from '../components/TaskItem';

const HomeScreen = ({ tasks }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem
            date={item.date}
            title={item.title}
            description={item.description}
            isComplete={item.isComplete}
            id={item.id}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({

});

export default HomeScreen;
