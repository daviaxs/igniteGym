import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto'
import { Text } from '@gluestack-ui/themed'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { Loading } from '@components/loading/Loading'

export default function App() {
  const [fontsLoaded] = useFonts({Roboto_700Bold, Roboto_400Regular})

  return (
    <View style={{flex: 1, backgroundColor: "#202024", alignItems: "center", justifyContent: "center"}}>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      {fontsLoaded ? <Text color='white'>Home</Text> : <Loading />}
    </View>
  );
}
