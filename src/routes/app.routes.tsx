import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { ExerciseScreen } from "@screens/exercise"
import { HistoryScreen } from "@screens/history"
import { HomeScreen } from "@screens/home"
import { ProfileScreen } from "@screens/profile"

type AppRoutesParams = {
  home: undefined
  history: undefined
  profile: undefined
  exercise: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutesParams>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesParams>()

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ 
      headerShown: false,
      tabBarShowLabel: false
    }}>
      <Screen
        name="home"
        component={HomeScreen}
      />

      <Screen
        name="history"
        component={HistoryScreen}
      />

      <Screen
        name="profile"
        component={ProfileScreen}
      />

      <Screen
        name="exercise"
        component={ExerciseScreen}
      />
    </Navigator>
  )
}