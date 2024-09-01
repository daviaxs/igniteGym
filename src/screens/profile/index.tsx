import { Button } from "@components/button/Button"
import { Input } from "@components/input/Input"
import { ScreenHeader } from "@components/screen-header/ScreenHeader"
import { Center, Heading, Text, VStack, useToast } from "@gluestack-ui/themed"
import { ScrollView, TouchableOpacity } from "react-native"
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"
import { useState } from "react"
import { ToastMessage } from "@components/toast-message/ToastMessage"
import { UserAvatar } from "@components/user-avatar/UserAvatar"
import { useAuth } from "@hooks/useAuth"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { api } from "@services/api"
import { ToastAlert } from "@components/toast-alert/ToastAlert"
import { appError } from "@utils/appError"
import { useHandleUserPhotoSelected } from "@hooks/useHandleUserPhotoSelected"

interface FormDataProps {
  name: string
  email?: string
  old_password?: string | undefined | null
  password?: string | undefined | null
  confirm_password?: string | undefined | null
}

const ProfileFormSchema = yup.object({
  name: yup.string().required('Informe seu nome.'),
  password: yup
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres.')
    .nullable()
    .transform(value => !!value ? value : null),
  confirm_password: yup
    .string()
    .nullable()
    .transform((value) => !!value ? value : null)
    .oneOf([yup.ref('password'), null], 'A confirmação de senha não confere.')
    .when('password', {
      is: (value: string | null) => !!value,
      then: (schema) => schema
        .nullable()
        .required('Informe a confirmação da senha.')
        .transform(value => !!value ? value : null),
      otherwise: (schema) => schema.nullable(),
    }),
})

export function ProfileScreen() {
  const [isUpdating, setIsUpdating] = useState(false)

  const toast = useToast()
  const { user, updateUserProfile } = useAuth()
  const { handleUserPhotoSelected } = useHandleUserPhotoSelected()

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(ProfileFormSchema),
    defaultValues: {
      name: user.name,
      email: user.email
    }
  })


  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsUpdating(true)

      const userUpdated = user
      userUpdated.name = data.name

      await api.put('/users', data)
      await updateUserProfile(userUpdated)

      ToastAlert({ message: 'Perfil atualizado com sucesso!', toast, variant: 'success' })
    } catch (error) {
      const isAppError = error instanceof appError
      const message = isAppError ? error.message : 'Não foi possível atualizar seu perfil. Tente novamente mais tarde.'

      ToastAlert({ message, toast })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <VStack>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
        <Center mt="$6" px="$10">
          <UserAvatar h="$32" w="$32" />

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
                  errorMessage={errors.name?.message}
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
                  value={value ?? undefined}
                  errorMessage={errors.old_password?.message}
                  autoCapitalize="none"
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
                  value={value ?? undefined}
                  errorMessage={errors.password?.message}
                  autoCapitalize="none"
                />
              )}
            />

            <Controller
              control={control}
              name="confirm_password"
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Confirme a nova senha"
                  bg="$gray600"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value ?? undefined}
                  errorMessage={errors.confirm_password?.message}
                  autoCapitalize="none"
                />
              )}
            />

            <Button
              title="Salvar"
              onPress={handleSubmit(handleProfileUpdate)}
              isLoading={isUpdating}
            />
          </Center>
        </Center>
      </ScrollView>
    </VStack>
  )
}