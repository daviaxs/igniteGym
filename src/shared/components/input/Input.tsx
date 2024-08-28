import { GlueStackConfig } from '@gluestack-style/react/lib/typescript/types'
import { Input as GluestackInput, InputField, Text } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

type GluestackInputProps = ComponentProps<typeof GluestackInput>

type InputProps = ComponentProps<typeof InputField> & {
  isReadOnly?: boolean
  bg?: GluestackInputProps['bg']
}

export function Input({ isReadOnly, bg = "$gray700", ...rest }: InputProps) {
  return (
    <GluestackInput
      bg={bg}
      h="$14"
      px="$4"
      borderWidth="$0"
      borderRadius="$md"
      $focus={{
        borderWidth: '$1',
        borderColor: '$green500',
      }}
      isReadOnly={isReadOnly}
      opacity={isReadOnly ? 0.5 : 1}
    >
      <InputField
        color='$gray100'
        {...rest}
      />
    </GluestackInput>
  )
}