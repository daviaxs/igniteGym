import { VStack, Image, Center, Text, Heading, ScrollView } from '@gluestack-ui/themed'
import BackgroundImg from '@assets/background.png'
import Logo from '@assets/logo.svg'
import { Input } from '@components/input/Input'
import { Button } from '@components/button/Button'

export function SignUpScreen() {
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

            <Input
              placeholder='Nome'
            />

            <Input
              placeholder='Email'
              keyboardType='email-address'
              autoCapitalize='none'
            />

            <Input
              placeholder='Password'
              secureTextEntry
            />

            <Button title="Criar e acessar" />
          </Center>

          <Button title='Voltar para login' variant='outline' mt="$12" />
        </VStack>
      </VStack>
    </ScrollView>
  )
}