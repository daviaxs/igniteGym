import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { ExerciseScreen } from "@screens/exercise"
import { HistoryScreen } from "@screens/history"
import { HomeScreen } from "@screens/home"
import { ProfileScreen } from "@screens/profile"

import HomeSvg from "@assets/home.svg"
import HistorySvg from "@assets/history.svg"
import ProfileSvg from "@assets/profile.svg"
import { gluestackUIConfig } from "../../config/gluestack-ui.config"
import { Platform } from "react-native"

type AppRoutesParams = {
  home: undefined
  history: undefined
  profile: undefined
  exercise: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutesParams>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesParams>()

export function AppRoutes() {
  const { tokens } = gluestackUIConfig
  const iconSize = tokens.space["7"]

  return (
    <Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: tokens.colors.green500,
      tabBarInactiveTintColor: tokens.colors.gray200,
      tabBarStyle: {
        backgroundColor: tokens.colors.gray600,
        borderTopWidth: 0,
        height: Platform.OS === "android" ? "auto" : 96,
        paddingBottom: tokens.space["10"],
        paddingTop: tokens.space["6"],
      }
    }}>
      <Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />

      <Screen
        name="history"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <HistorySvg fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />

      <Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />

      <Screen
        name="exercise"
        component={ExerciseScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Navigator>
  )
}