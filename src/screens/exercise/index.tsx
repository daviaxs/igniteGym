import { Box, Heading, HStack, Icon, Image, Text, useToast, VStack } from "@gluestack-ui/themed"
import { useNavigation, useRoute } from "@react-navigation/native"
import { AppNavigatorRoutesProps } from "@routes/app.routes"
import { ArrowLeft } from "lucide-react-native"
import { ScrollView, TouchableOpacity } from "react-native"
import BodySvg from "@assets/body.svg"
import SeriesSvg from '@assets/series.svg'
import RepetitionsSvg from '@assets/repetitions.svg'
import { Button } from "@components/button/Button"
import { exerciseDTO } from "@dtos/exerciseDTO"
import { useEffect, useState } from "react"
import { appError } from "@utils/appError"
import { ToastAlert } from "@components/toast-alert/ToastAlert"
import { api } from "@services/api"
import { Loading } from "@components/loading/Loading"

interface ExerciseRouteParams {
  exerciseId: string
}

export function ExerciseScreen() {
  const [exercise, setExercise] = useState<exerciseDTO>()
  const [isLoading, setIsLoading] = useState(true)

  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const route = useRoute()
  const toast = useToast()

  const { exerciseId } = route.params as ExerciseRouteParams

  function handleGoBack() {
    navigation.goBack()
  }

  async function fetchExerciseDetails() {
    try {
      setIsLoading(true)

      const response = await api.get(`/exercises/${exerciseId}`)

      setExercise(response.data)
    } catch (error) {
      const isAppError = error instanceof appError
      const message = isAppError ? error.message : 'Não foi possível carregar os detalhes do exercício.'

      ToastAlert({ message, toast })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchExerciseDetails()
  }, [exerciseId])

  return (
    <VStack flex={1}>
      <VStack px="$8" bg="$gray600" pt="$14" pb="$4">
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={ArrowLeft} color="$green500" size="xl" />
        </TouchableOpacity>

        <HStack
          justifyContent="space-between"
          alignItems="center"
          mt="$4"
        >
          <Heading
            color="$gray100"
            fontFamily="$heading"
            fontSize="$lg"
            flexShrink={1}
          >
            {isLoading ? 'Carregando...' : exercise?.name}
          </Heading>

          <HStack alignItems="center">
            <BodySvg />

            <Text
              color="$gray200"
              ml="$1"
              textTransform="capitalize"
            >
              {isLoading ? 'Carregando...' : exercise?.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          <VStack p="$8">
            <Image
              source={{
                uri: `${api.defaults.baseURL}/exercise/demo/${exercise?.demo}`,
              }}
              alt="Nome do exercício"
              mb="$3"
              resizeMode="cover"
              rounded="$lg"
              w="$full"
              h="$80"
            />

            <Box bg="$gray600" rounded="$md" pb="$4" px="$4">
              <HStack
                alignItems="center"
                justifyContent="space-around"
                marginVertical="$5"
              >
                <HStack>
                  <SeriesSvg />

                  <Text color="$gray200" ml="$2">
                    {exercise?.series} séries
                  </Text>
                </HStack>

                <HStack>
                  <RepetitionsSvg />

                  <Text color="$gray200" ml="$2">
                    {exercise?.repetitions} repetições
                  </Text>
                </HStack>
              </HStack>

              <Button title="Marcar como realizado" />
            </Box>
          </VStack>
        </ScrollView>
      )}
    </VStack>
  )
}