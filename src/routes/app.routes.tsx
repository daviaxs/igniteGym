import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ExerciseScreen } from "@screens/exercise"
import { HistoryScreen } from "@screens/history"
import { HomeScreen } from "@screens/home"
import { ProfileScreen } from "@screens/profile"

const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {
  return (
    <Navigator>
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