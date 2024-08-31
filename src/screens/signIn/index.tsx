import { VStack, Image, Center, Text, Heading, ScrollView, Toast, ToastTitle, Spinner } from '@gluestack-ui/themed'
import BackgroundImg from '@assets/background.png'
import Logo from '@assets/logo.svg'
import { Input } from '@components/input/Input'
import { Button } from '@components/button/Button'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { appError } from '@utils/appError'
import { useToast } from '@gluestack-ui/themed'
import { useAuth } from '@hooks/useAuth'

interface SignInFormDataProps {
  email: string
  password: string
}

const SignInFormSchema = yup.object({
  email: yup.string().email('Email inválido.').required('Informe seu email.'),
  password: yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres.').required('Informe sua senha.'),
})

export function SignInScreen() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignInFormDataProps>({
    resolver: yupResolver(SignInFormSchema)
  })
  const { signIn } = useAuth()

  const toast = useToast()

  function handleNewAccount() {
    navigation.navigate('signUp')
  }

  async function handleSignIn({ email, password }: SignInFormDataProps) {
    try {
      await signIn(email, password)
    } catch (error) {
      const isAppError = error instanceof appError
      const message = isAppError ? error.message : 'Não foi possível acessar sua conta. Tente novamente mais tarde.'

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
        )
      })
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
          <Center my="$24">
            <Logo />

            <Text color='$gray100' fontSize="$sm">
              Treine sua mente e seu corpo
            </Text>
          </Center>

          <Center gap="$2">
            <Heading color='$gray100'>Acesse a conta</Heading>

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

            <Button
              title={isSubmitting ? <Spinner color="$white" /> : "Acessar"}
              onPress={handleSubmit(handleSignIn)}
              disabled={isSubmitting}
            />
          </Center>

          <Center flex={1} justifyContent='flex-end' marginTop="$10">
            <Text color="$gray100" fontSize="$sm" mb="$3" fontFamily='$body'>
              Ainda não tem acesso?
            </Text>

            <Button title='Criar conta' variant='outline' onPress={handleNewAccount} />
          </Center>
        </VStack>
      </VStack>
    </ScrollView>
  )
}