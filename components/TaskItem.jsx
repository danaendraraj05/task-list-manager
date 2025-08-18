import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';

const TaskItem = ({ title, description, date, onDelete, onComplete }) => {
  return (
    <Card style={styles.card}>
      <Card.Title title={title} />
      <Card.Content>
        <Text variant="bodyMedium">{description}</Text>
        <Text style={styles.date}>{date}</Text>
      </Card.Content>
      <Card.Actions
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button
          mode="outlined"
          style={{ marginRight: 'auto' }}
          onPress={onDelete}
        >
          Delete
        </Button>
        <Button mode="contained" onPress={onComplete}>
          Complete
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 12,
    borderRadius: 10,
    elevation: 3,
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginTop: 8,
    textAlign: 'right',
  },
});

export default TaskItem;
