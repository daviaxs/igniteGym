import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto'
import { Center, GluestackUIProvider, Text } from '@gluestack-ui/themed'
import { StatusBar } from 'expo-status-bar'
import { Loading } from '@components/loading/Loading'
import { config } from './config/gluestack-ui.config'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_700Bold, Roboto_400Regular })

  return (
    <GluestackUIProvider config={config}>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      {fontsLoaded ? (
        <Center flex={1} bg='$gray700'>
          <Text color='white'>Home</Text>
        </Center>
      ) : (
        <Loading />
      )}
    </GluestackUIProvider>
  );
}
