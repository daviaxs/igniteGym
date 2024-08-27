import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

export default function App() {
  const [fontsLoaded] = useFonts({Roboto_700Bold, Roboto_400Regular})

  return (
    <View style={{flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center"}}>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      {fontsLoaded ? <Text>Home</Text> : <View />}
    </View>
  );
}
