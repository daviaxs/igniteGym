import { ButtonSpinner, Button as GluestackButton, Text } from "@gluestack-ui/themed"
import { ComponentProps, ReactNode } from "react"

type ButtonProps = ComponentProps<typeof GluestackButton> & {
  title: string | ReactNode
  variant?: 'solid' | 'outline'
  isLoading?: boolean
}

export function Button({
  title,
  variant = "solid",
  isLoading = false,
  ...props
}: ButtonProps) {
  return (
    <GluestackButton
      w="$full"
      h="$14"

      bg={variant === "outline" ? "$transparent" : isLoading ? "$gray500" : "$green500"}
      $active-bg={variant === "outline" ? "$gray500" : "$green500"}

      borderWidth={variant === "outline" ? "$1" : "$0"}
      borderColor="$green500"
      rounded="$sm"

      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <ButtonSpinner color={variant === "outline" ? "$green500" : "$white"} />
      ) : (
        <Text 
          color={variant === "outline" ? "$green500" : "$white"} 
          fontFamily="$heading" 
          fontSize="$sm"
        >
          {title}
        </Text>
      )}
    </GluestackButton>
  )
}