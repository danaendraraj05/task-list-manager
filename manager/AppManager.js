import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AddTaskScreen from '../screens/AddTaskScreen';
import HomeScreen from '../screens/HomeScreen';
import { AppScreens } from '../utils/constants';

const AppManager = () => {
  const [CurrentScreen, setCurrentScreen] = useState(AppScreens.HomeScreen);
  return (
    <View>
      <Text>AppManager</Text>
      {CurrentScreen === AppScreens.AddTaskScreen ? ( 
        <AddTaskScreen/>)
        :
        (<HomeScreen/>
      )}
    </View>
  )
}

export default AppManager

const styles = StyleSheet.create({})