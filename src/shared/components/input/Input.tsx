import { GlueStackConfig } from '@gluestack-style/react/lib/typescript/types'
import { FormControl, FormControlError, FormControlErrorText, Input as GluestackInput, InputField, Text } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

type GluestackInputProps = ComponentProps<typeof GluestackInput>

type InputProps = ComponentProps<typeof InputField> & {
  errorMessage?: string | null
  isInvalid?: boolean
  isReadOnly?: boolean
  bg?: GluestackInputProps['bg']
}

export function Input({
  isReadOnly,
  bg = "$gray700",
  isInvalid = false,
  errorMessage = null,
  ...rest
}: InputProps) {
  const invalid = !!errorMessage || isInvalid

  return (
    <FormControl isInvalid={invalid} w="$full" mb="$4">
      <GluestackInput
        isInvalid={invalid}
        bg={bg}
        h="$14"
        px="$4"
        borderWidth="$1"
        borderColor="$gray600"
        borderRadius="$md"
        $focus={{
          borderWidth: "$1",
          borderColor: invalid ? "$red500" : "$green500",
        }}
        $invalid={{
          borderWidth: "$1",
          borderColor: "$red500",
        }}
        isReadOnly={isReadOnly}
        opacity={isReadOnly ? 0.5 : 1}
      >
        <InputField
          color="$gray100"
          {...rest}
        />
      </GluestackInput>

      <FormControlError>
        <FormControlErrorText color="$red500">
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}