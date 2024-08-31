import { UserPhoto } from "@components/user-photo/UserPhoto"
import { Heading, HStack, Icon, Text, VStack } from "@gluestack-ui/themed"
import { useAuth } from "@hooks/useAuth"
import { LogOut } from "lucide-react-native"
import DefaultUserAvatar from "@assets/userPhotoDefault.png"
import { UserAvatar } from "@components/user-avatar/UserAvatar"

export function HomeHeader() {
  const { user } = useAuth()

  return (
    <HStack bg="$gray600" pt="$16" pb="$5" px="$8" alignItems="center" gap="$4">
      <UserAvatar h="$16" w="$16" />

      <VStack flex={1}>
        <Text color="$gray100" fontSize="$sm">Olá</Text>

        <Heading color="$gray100" fontSize="$md">{user.name}</Heading>
      </VStack>

      <Icon as={LogOut} color="$gray200" size="xl" />
    </HStack>
  )
}