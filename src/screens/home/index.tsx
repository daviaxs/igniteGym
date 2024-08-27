import { Group } from "@components/group/Group";
import { HomeHeader } from "@components/home-header/HomeHeader";
import { Center, Text, VStack } from "@gluestack-ui/themed";

export function HomeScreen() {
  return (
    <VStack flex={1}>
      <HomeHeader />

      <Group name="Costas" isActive={false} />
    </VStack>
  )
}