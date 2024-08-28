import { ExerciseCard } from "@components/exercise-card/ExerciseCard"
import { Group } from "@components/group/Group"
import { HomeHeader } from "@components/home-header/HomeHeader"
import { Heading, HStack, Text, VStack } from "@gluestack-ui/themed"
import { useNavigation } from "@react-navigation/native"
import { AppNavigatorRoutesProps } from "@routes/app.routes"
import { useState } from "react"
import { FlatList } from "react-native"

export function HomeScreen() {
  const [groups, setGroups] = useState(['costas', 'bíceps', 'tríceps', 'ombro'])
  const [groupActive, setGroupActive] = useState('costas')
  const [exercises, setExercises] = useState([
    'Puxada frontal',
    'Remada curvada',
    'Remada unilateral',
    'Levantamento terra',
    'Levantamento direta',
    'Levantamento direta',
    'Levantamento direta',
    'Levantamento direta',
  ])

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleOpenExerciseDetails() {
    navigation.navigate("exercise")
  }

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
            isActive={groupActive.toLowerCase() === item.toLowerCase()}
            onPress={() => setGroupActive(item)}
            style={{ marginRight: 16 }}
          />
        )}
      />

      <VStack px="$8" flex={1}>
        <HStack justifyContent="space-between" alignItems="center" marginBottom="$8">
          <Heading color="$gray200" fontFamily="$body">
            Exercícios
          </Heading>

          <Text>
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(_, index) => String(index)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ExerciseCard name={item} onPress={handleOpenExerciseDetails} />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  )
}