import { ToastMessage } from "@components/toast-message/ToastMessage"
import { useToast } from "@gluestack-ui/themed"
import { useAuth } from "@hooks/useAuth"
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"
import { api } from "@services/api"
import { ToastAlert } from "@components/toast-alert/ToastAlert"

export function useHandleUserPhotoSelected() {
  const { user, updateUserProfile } = useAuth()
  const toast = useToast()

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

      const fileExtension = photoURI.split('.').pop()

      const photoFile = {
        name: `${user.name}.${fileExtension}`.toLowerCase().replace(' ', '_'),
        uri: photoURI,
        type: `${(photoSelected.assets[0].type)}/${fileExtension}`
      } as any

      const userPhotoUploadForm = new FormData()

      userPhotoUploadForm.append('avatar', photoFile)

      const avatarUpdatedResponse = await api.patch('/users/avatar', userPhotoUploadForm, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      const userUpdated = user
      user.avatar = avatarUpdatedResponse.data.avatar
      await updateUserProfile(userUpdated)

      ToastAlert({ message: 'Foto de perfil atualizada com sucesso!', toast, variant: 'success' })
    } catch (error) {
      console.log(error)
    }
  }

  return { handleUserPhotoSelected }
}