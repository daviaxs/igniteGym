import { Toast, ToastTitle, useToast } from "@gluestack-ui/themed"

interface ToastAlertProps {
  message: string
  toast: ReturnType<typeof useToast>
}

export function ToastAlert({ message, toast }: ToastAlertProps) {
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
      </Toast >
    )
  })
}