import { Button } from "@components/button/Button"
import { Input } from "@components/input/Input"
import { ScreenHeader } from "@components/screen-header/ScreenHeader"
import { UserPhoto } from "@components/user-photo/UserPhoto"
import { Center, Heading, Text, VStack, useToast } from "@gluestack-ui/themed"
import { Alert, ScrollView, TouchableOpacity } from "react-native"
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"
import { useState } from "react"
import { ToastMessage } from "@components/toast-message/ToastMessage"
import { UserAvatar } from "@components/user-avatar/UserAvatar"
import { useAuth } from "@hooks/useAuth"
import { Controller, useForm } from "react-hook-form"

interface FormDataProps {
  name: string
  email: string
  old_password: string
  password: string
  confirmPassword: string
}

export function ProfileScreen() {
  const [userPhoto, setUserPhoto] = useState('https://github.com/daviaxs.png')

  const toast = useToast()
  const { user } = useAuth()

  const { control } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email
    }
  })

  async function handleUserPhotoSelected() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true
      })

      if (photoSelected.canceled) {
        return
      }

      const photoURI = photoSelected.assets[0].uri

      if (!photoURI) {
        return
      }

      const photoInfo = (await FileSystem.getInfoAsync(photoURI)) as {
        size: number
      }

      if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
        return toast.show({
          placement: "top",
          render: ({ id }) => (
            <ToastMessage
              id={id}
              title="Imagem muito grande!"
              description="Essa imagem é muito grande. Utilize uma imagem de até 5MB."
              action="error"
              onClose={() => toast.close(id)}
            />
          )
        })
      }

      setUserPhoto(photoURI)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <VStack>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
        <Center mt="$6" px="$10">
          <UserAvatar h="$32" w="$32" avatar={userPhoto} />

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
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Nome"
                  bg="$gray600"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange } }) => (
                <Input
                  bg="$gray600"
                  placeholder="E-mail"
                  onChangeText={onChange}
                  value={value}
                  isReadOnly
                />
              )}
            />
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

            <Controller
              control={control}
              name="old_password"
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Senha antiga"
                  bg="$gray600"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Nova senha"
                  bg="$gray600"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Confirme a nova senha"
                  bg="$gray600"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Button title="Salvar" />
          </Center>
        </Center>
      </ScrollView>
    </VStack>
  )
}