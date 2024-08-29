import { VStack, Image, Center, Text, Heading, ScrollView } from '@gluestack-ui/themed'
import BackgroundImg from '@assets/background.png'
import Logo from '@assets/logo.svg'
import { Input } from '@components/input/Input'
import { Button } from '@components/button/Button'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'

export function SignUpScreen() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()
  const { control, handleSubmit } = useForm()

  function handleSignIn() {
    navigation.navigate('sigIn')
  }

  function handleSignUp(data: any) {
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
                />
              )}
            />



            <Button title="Criar e acessar" onPress={handleSubmit(handleSignUp)} />
          </Center>

          <Button title='Voltar para login' variant='outline' mt="$12" onPress={handleSignIn} />
        </VStack>
      </VStack>
    </ScrollView>
  )
}