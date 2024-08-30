import { VStack, Image, Center, Text, Heading, ScrollView } from '@gluestack-ui/themed'
import BackgroundImg from '@assets/background.png'
import Logo from '@assets/logo.svg'
import { Input } from '@components/input/Input'
import { Button } from '@components/button/Button'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'

interface SignUpFormDataProps {
  name: string
  email: string
  password: string
  password_confirm: string
}

export function SignUpScreen() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()
  const { control, handleSubmit, formState: { errors } } = useForm<SignUpFormDataProps>()

  function handleSignIn() {
    navigation.navigate('sigIn')
  }

  function handleSignUp(data: SignUpFormDataProps) {
    console.log(data)
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
              rules={{
                required: 'Informe seu nome.'
              }}
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
              rules={{
                required: 'Informe seu email.',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email inválido.'
                }
              }}
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
              rules={{
                required: 'Informe sua senha.'
              }}
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
              rules={{
                required: 'Confirme sua senha.'
              }}
            />

            <Button title="Criar e acessar" onPress={handleSubmit(handleSignUp)} />
          </Center>

          <Button title='Voltar para login' variant='outline' mt="$12" onPress={handleSignIn} />
        </VStack>
      </VStack>
    </ScrollView>
  )
}