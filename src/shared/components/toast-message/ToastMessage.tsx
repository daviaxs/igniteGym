import { Icon, Pressable, Toast, ToastTitle, VStack } from "@gluestack-ui/themed"
import { X } from "lucide-react-native"

interface ToastMessageProps {
  id: string
  title: string
  description?: string
  action?: "success" | "error"
  onClose: () => void
}

export function ToastMessage({
  id,
  title,
  description,
  action = "success",
  onClose
}: ToastMessageProps) {
  return (
    <Toast
      nativeID={`toast-${id}`}
      action={action}
      bgColor={action === "success" ? "$green500" : "$red500"}
      mt="$10"
    >
      <VStack space="xs" w="$full">
        <Pressable onPress={onClose} style={{ position: "absolute", right: 0 }}>
          <Icon as={X} color="$coolGray50" size="xl" />
        </Pressable>

        <ToastTitle color="$white" fontFamily="$heading">{title}</ToastTitle>

        {description && (
          <ToastTitle color="$white" fontFamily="$body">
            {description}
          </ToastTitle>
        )}
      </VStack>
    </Toast>
  )
}