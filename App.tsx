import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { StatusBar } from 'expo-status-bar'
import { Loading } from '@components/loading/Loading'
import { config } from './config/gluestack-ui.config'
import { Routes } from '@routes/index'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_700Bold, Roboto_400Regular })

  return (
    <GluestackUIProvider config={config}>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      {fontsLoaded ? (
        <Routes />
      ) : (
        <Loading />
      )}
    </GluestackUIProvider>
  );
}
