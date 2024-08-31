import { Toast, ToastTitle, useToast } from "@gluestack-ui/themed"

interface ToastAlertProps {
  message: string
  toast: ReturnType<typeof useToast>
  variant?: 'error' | 'success'
}

export function ToastAlert({ message, toast, variant = 'error' }: ToastAlertProps) {
  toast.show({
    placement: "top",
    render: () => (
      <Toast
        action={variant}
        variant="solid"
        marginHorizontal="$2"
        bgColor={variant === 'error' ? "$red500" : "$green500"}
        mt="$20"
      >
        <ToastTitle color="$white">{message}</ToastTitle>
      </Toast >
    )
  })
}