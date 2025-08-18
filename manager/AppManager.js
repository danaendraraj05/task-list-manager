import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AddTaskScreen from '../screens/AddTaskScreen';
import HomeScreen from '../screens/HomeScreen';
import { AppScreens, DUMMY_TASK } from '../utils/constants';

const AppManager = () => {
  const [CurrentScreen, setCurrentScreen] = useState(AppScreens.HomeScreen);
  const [Tasks, setTasks] = useState([...DUMMY_TASK]);
  return (
    <View>
      {CurrentScreen === AppScreens.AddTaskScreen ? ( 
        <AddTaskScreen/>)
        :
        (<HomeScreen tasks={Tasks}/>
      )}
    </View>
  )
}

export default AppManager

const styles = StyleSheet.create({})