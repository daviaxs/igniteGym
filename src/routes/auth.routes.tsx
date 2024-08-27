import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack"
import { SignInScreen } from "@screens/signIn"
import { SignUpScreen } from "@screens/signUp"

type AuthRoutesParams = {
  sigIn: undefined
  signUp: undefined
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutesParams>

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutesParams>()

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name="sigIn"
        component={SignInScreen}
      />

      <Screen
        name="signUp"
        component={SignUpScreen}
      />
    </Navigator>
  )
}