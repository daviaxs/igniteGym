import { HomeHeader } from "@components/home-header/HomeHeader";
import { Center, Text, VStack } from "@gluestack-ui/themed";

export function HomeScreen() {
  return (
    <VStack flex={1}>
      <HomeHeader />
    </VStack>
  )
}