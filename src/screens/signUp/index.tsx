import { VStack, Image, Center, Text, Heading, ScrollView, useToast, Toast, ToastTitle, ToastDescription, Spinner, View } from '@gluestack-ui/themed'
import BackgroundImg from '@assets/background.png'
import Logo from '@assets/logo.svg'
import { Input } from '@components/input/Input'
import { Button } from '@components/button/Button'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { appError } from '@utils/appError'
import { api } from '@services/api'
import { useState } from 'react'

interface SignUpFormDataProps {
  name: string
  email: string
  password: string
  password_confirm: string
}

const signUpFormSchema = yup.object({
  name: yup.string().required('Informe seu nome.'),
  email: yup.string().email('Email inválido.').required('Informe seu email.'),
  password: yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres.').required('Informe sua senha.'),
  password_confirm:
    yup.string()
      .required('Confirme sua senha.')
      .oneOf([yup.ref('password')], 'As senhas não conferem.'),
})

export function SignUpScreen() {
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation<AuthNavigatorRoutesProps>()
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpFormDataProps>({
    resolver: yupResolver(signUpFormSchema)
  })

  const toast = useToast()

  function handleSignIn() {
    navigation.navigate('sigIn')
  }

  async function handleSignUp({ name, email, password }: SignUpFormDataProps) {
    try {
      setIsLoading(true)

      const response = await api.post('/users', { name, email, password })
    } catch (error) {
      const isAppError = error instanceof appError
      const message = isAppError ? error.message : 'Não foi possível criar sua conta. Tente novamente mais tarde.'

      toast.show({
        placement: "top",
        render: () => (
          <Toast
            action="error"
            variant="solid"
            marginHorizontal="$2"
            bgColor="$red500"
            mt="$20"
          >
            <ToastTitle color="$white">{message}</ToastTitle>
          </Toast>
        ),
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1}>
        <Image
          w="$full"
          h={624}
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt='Pessoas treinando'
          position='absolute'
        />

        <VStack flex={1} px="$10" pb="$16">
          {/* LOGO */}
          <Center my="$24">
            <Logo />

            <Text color='$gray100' fontSize="$sm">
              Treine sua mente e seu corpo
            </Text>
          </Center>

          {/* FORM */}
          <Center flex={1} gap="$2">
            <Heading color='$gray100'>Crie sua conta</Heading>

            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder='Nome'
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder='Email'
                  keyboardType='email-address'
                  autoCapitalize='none'
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder='Password'
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password_confirm"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder='Confirmar senha'
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.password_confirm?.message}
                />
              )}
            />

            <Button
              title={isLoading ? <Spinner color="$white" /> : "Criar e acessar"}
              onPress={handleSubmit(handleSignUp)}
              disabled={isSubmitting}
            />
          </Center>

          <Button title='Voltar para login' variant='outline' mt="$12" onPress={handleSignIn} />
        </VStack>
      </VStack>
    </ScrollView>
  )
}