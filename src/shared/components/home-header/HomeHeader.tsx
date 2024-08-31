import { Heading, HStack, Icon, Pressable, Text, VStack } from "@gluestack-ui/themed"
import { useAuth } from "@hooks/useAuth"
import { LogOut } from "lucide-react-native"
import { UserAvatar } from "@components/user-avatar/UserAvatar"

export function HomeHeader() {
  const { user, signOut } = useAuth()

  return (
    <HStack bg="$gray600" pt="$16" pb="$5" px="$8" alignItems="center" gap="$4">
      <UserAvatar h="$16" w="$16" />

      <VStack flex={1}>
        <Text color="$gray100" fontSize="$sm">Olá</Text>

        <Heading color="$gray100" fontSize="$md">{user.name}</Heading>
      </VStack>

      <Pressable onPress={signOut}>
        <Icon as={LogOut} color="$gray200" size="xl" />
      </Pressable>
    </HStack>
  )
}