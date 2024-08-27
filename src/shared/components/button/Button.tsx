import { ButtonSpinner, Button as GluestackButton, Text } from "@gluestack-ui/themed"
import { ComponentProps } from "react"

type ButtonType = ComponentProps<typeof GluestackButton>

interface ButtonProps extends ButtonType {
  title: string
  isLoading?: boolean
}

export function Button({ title, isLoading = false, ...props }: ButtonProps) {
  return (
    <GluestackButton 
      w="$full"
      h="$14"
      bg="$green700"
      $active-bg="$green500"
      borderWidth="$0"
      borderColor="$green500"
      rounded="$sm"
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <ButtonSpinner color="$white" />
      ) : (
        <Text color="$white" fontFamily="$heading" fontSize="$sm">
          {title}
        </Text>
      )}
    </GluestackButton>
  )
}