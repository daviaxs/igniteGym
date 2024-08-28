import { Button } from "@components/button/Button"
import { Input } from "@components/input/Input"
import { ScreenHeader } from "@components/screen-header/ScreenHeader"
import { UserPhoto } from "@components/user-photo/UserPhoto"
import { Center, Heading, Text, VStack } from "@gluestack-ui/themed"
import { ScrollView, TouchableOpacity } from "react-native"
import * as ImagePicker from "expo-image-picker"

export function ProfileScreen() {
  async function handleUserPhotoSelected() {
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: [4, 4],
      allowsEditing: true
    })
  }

  return (
    <VStack>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
        <Center mt="$6" px="$10">
          <UserPhoto
            source={{ uri: 'https://github.com/daviaxs.png' }}
            alt="Foto de perfil"
            size="xl"
          />

          <TouchableOpacity onPress={handleUserPhotoSelected}>
            <Text
              fontFamily="$heading"
              fontSize="$md"
              color="$green500"
              mt="$2"
              mb="$8"
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Center w="$full" gap="$4">
            <Input placeholder="Nome" bg="$gray600" />
            <Input value="davialves@gmail.com" bg="$gray600" isReadOnly />
          </Center>

          <Heading
            alignSelf="flex-start"
            fontFamily="$heading"
            color="$gray200"
            fontSize="$md"
            mt="$12"
            mb="$2"
          >
            Alterar senha
          </Heading>

          <Center w="$full" gap="$4">
            <Input placeholder="Senha antiga" bg="$gray600" secureTextEntry />
            <Input placeholder="Nova senha" bg="$gray600" secureTextEntry />
            <Input placeholder="Confirme a nova senha" bg="$gray600" secureTextEntry />

            <Button title="Salvar" />
          </Center>
        </Center>
      </ScrollView>
    </VStack>
  )
}