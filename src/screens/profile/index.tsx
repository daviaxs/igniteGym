import { ScreenHeader } from "@components/screen-header/ScreenHeader"
import { UserPhoto } from "@components/user-photo/UserPhoto"
import { Center, Text, VStack } from "@gluestack-ui/themed"
import { ScrollView } from "react-native"

export function ProfileScreen() {
  return (
    <VStack>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt="$6" px="$10">
          <UserPhoto 
            source={{ uri: 'https://github.com/daviaxs.png' }}
            alt="Foto de perfil"
            size="xl"
          />

          <Text
            fontFamily="$heading"
            fontSize="$md"
            color="$green500"
            mt="$2"
            mb="$8"
          >
            Alterar foto
          </Text>
        </Center>
      </ScrollView>
    </VStack>
  )
}