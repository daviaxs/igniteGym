import { useAuth } from "@hooks/useAuth"
import DefaultUserAvatar from "@assets/userPhotoDefault.png"
import { UserPhoto } from "@components/user-photo/UserPhoto"
import { ComponentProps } from "react"
import { Image } from "@gluestack-ui/themed"

type GluestackImageProps = ComponentProps<typeof Image>

interface UserAvatarProps {
  h: GluestackImageProps['h']
  w: GluestackImageProps['w']
}

export function UserAvatar({ h, w }: UserAvatarProps) {
  const { user } = useAuth()

  return (
    <UserPhoto
      source={user.avatar ? { uri: user.avatar } : DefaultUserAvatar}
      alt="Imagem do usuário"
      h={h}
      w={w}
    />
  )
}