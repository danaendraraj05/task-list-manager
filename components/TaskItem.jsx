import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, Button, Chip } from 'react-native-paper';

const TaskItem = ({ title, description, date, onDelete, onComplete, isComplete }) => {
  return (
    <Card style={styles.card}>
      <Card.Title title={title} />
      <Card.Content>
        <View style={styles.contentRow}>
          <Text variant="bodyMedium">{description}</Text>
        </View>
        <Text style={styles.date}>{date}</Text>
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <Button
          mode="outlined"
          style={{ marginRight: 'auto' }}
          onPress={onDelete}
        >
          Delete
        </Button>
        {!isComplete && (
          <Button mode="contained" onPress={onComplete}>
            Complete
          </Button>
        )}
        {isComplete && <Chip style={styles.chip} icon="check" mode="outlined">Completed</Chip>}
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
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  chip: {
    marginLeft: 8,
  },
  date: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
  actions: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default TaskItem;
