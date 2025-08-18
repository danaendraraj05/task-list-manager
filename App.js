import { StatusBar, View, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import AppManager from './manager/AppManager';
import { PaperProvider } from 'react-native-paper';

const { height } = Dimensions.get('window');

export default function App() {
  return (
    <PaperProvider>
      <View style={{ flex: 1 }}>
        {/* This view gives color to the status bar area */}
        <View style={styles.statusBarBackground} />
        
        {/* StatusBar is translucent so background color shows through */}
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

        <SafeAreaView style={styles.container}>
          <AppManager />
        </SafeAreaView>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  statusBarBackground: {
    height: StatusBar.currentHeight, // Fills status bar space
    backgroundColor: '#00eaffff', // Your desired color
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: height * 0.01,
  },
});
