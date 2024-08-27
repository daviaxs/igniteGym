import { Group } from "@components/group/Group";
import { HomeHeader } from "@components/home-header/HomeHeader";
import { HStack, ScrollView, VStack } from "@gluestack-ui/themed";
import { useState } from "react";

export function HomeScreen() {
  const [groupActive, setGroupActive] = useState('costas')

  return (
    <VStack flex={1}>
      <HomeHeader />

      <ScrollView horizontal>
        <HStack gap={10} marginHorizontal="$8" marginVertical="$4">
          <Group
            name="costas"
            isActive={groupActive === 'costas'}
            onPress={() => setGroupActive('costas')}
          />
          <Group
            name="pernas"
            isActive={groupActive === 'pernas'}
            onPress={() => setGroupActive('pernas')}
          />
        </HStack>
      </ScrollView>
    </VStack>
  )
}