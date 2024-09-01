import { ScreenHeader } from "@components/screen-header/ScreenHeader"
import { Heading, Text, useToast, VStack } from "@gluestack-ui/themed"
import { HistoryCard } from "./components/HistoryCard"
import { useCallback, useState } from "react"
import { SectionList } from "react-native"
import { appError } from "@utils/appError"
import { ToastAlert } from "@components/toast-alert/ToastAlert"
import { api } from "@services/api"
import { historyByDayDTO } from "@dtos/historyByDayDTO"
import { useFocusEffect } from "@react-navigation/native"
import { Loading } from "@components/loading/Loading"

export function HistoryScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [exercises, setExercises] = useState<historyByDayDTO[]>([])

  const toast = useToast()

  async function fetchHistory() {
    try {
      setIsLoading(true)

      const response = await api.get('/history')

      setExercises(response.data)
    } catch (error) {
      const isAppError = error instanceof appError
      const message = isAppError ? error.message : 'Não foi possível carregar o histórico.'

      ToastAlert({ message, toast })
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(useCallback(() => {
    fetchHistory()
  }, []))

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico" />


      {isLoading ? (
        <Loading />
      ) : (
        <SectionList
          sections={exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HistoryCard data={item} />}
          renderSectionHeader={({ section }) => (
            <Heading color="$gray200" fontSize="$md" mt="$10" mb="$3">
              {section.title}
            </Heading>
          )}
          style={{ paddingHorizontal: 32 }}
          contentContainerStyle={
            exercises.length === 0 && { flex: 1, justifyContent: 'center' }
          }
          ListEmptyComponent={() => (
            <Text color="$gray200" textAlign="center">
              Não há exercícios registrados ainda. {'\n'}
              Vamos começar?
            </Text>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </VStack>
  )
}