import { Group } from "@components/group/Group"
import { HomeHeader } from "@components/home-header/HomeHeader"
import { Heading, HStack, Text, VStack } from "@gluestack-ui/themed"
import { useState } from "react"
import { FlatList } from "react-native"

export function HomeScreen() {
  const [groups, setGroups] = useState(['costas', 'bíceps', 'tríceps', 'ombro'])
  const [groupActive, setGroupActive] = useState('costas')

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        horizontal
        data={groups}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 32 }}
        style={{ marginVertical: 40, maxHeight: 44, minHeight: 44 }}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupActive === item}
            onPress={() => setGroupActive(item)}
            style={{ marginRight: 16 }}
          />
        )}
      />

      <VStack px="$8">
        <HStack justifyContent="space-between" alignItems="center">
          <Heading color="$gray200" fontFamily="$body">
            Exercícios
          </Heading>

          <Text>
            4
          </Text>
        </HStack>
      </VStack>
    </VStack>
  )
}