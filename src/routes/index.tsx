import { DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { AuthRoutes } from "./auth.routes"
import { Box } from "@gluestack-ui/themed"
import { gluestackUIConfig } from "../../config/gluestack-ui.config"
import { AppRoutes } from "./app.routes"
import { useAuth } from "@hooks/useAuth"
import { Loading } from "@components/loading/Loading"

export function Routes() {
  const theme = DefaultTheme
  theme.colors.background = gluestackUIConfig.tokens.colors.gray700

  const { user, isLoadingUserData } = useAuth()

  if (isLoadingUserData) {
    return <Loading />
  }

  return (
    <Box flex={1} bg="$gray700">
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  )
}