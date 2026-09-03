import React from 'react'

import { createInput } from '@gluestack-ui/core/input/creator'
import { UIIcon } from '@gluestack-ui/core/icon/creator'
import { tva, withStyleContext } from '@gluestack-ui/utils/nativewind-utils'
import { Pressable, TextInput, View } from 'react-native'

const ESCOPO = 'INPUT'

const UIInput = createInput({
  Root: withStyleContext(View, ESCOPO),
  Icon: UIIcon,
  Slot: Pressable,
  Input: TextInput,
})

const estiloInput = tva({
  base: 'h-14 flex-row items-center rounded-xl border border-vistoria-borda bg-vistoria-superficie data-[focus=true]:border-vistoria-marca data-[disabled=true]:opacity-40',
})

const estiloCampo = tva({
  base: 'h-full flex-1 px-4 text-base text-vistoria-titulo placeholder:text-vistoria-auxiliar web:outline-none',
})

interface IInputProps extends React.ComponentProps<typeof UIInput> {
  className?: string
}

const Input = React.forwardRef<React.ComponentRef<typeof UIInput>, IInputProps>(function Input(
  { className, ...props },
  ref,
) {
  return <UIInput {...props} ref={ref} className={estiloInput({ class: className })} />
})

interface IInputFieldProps extends React.ComponentProps<typeof UIInput.Input> {
  className?: string
}

const InputField = React.forwardRef<React.ComponentRef<typeof UIInput.Input>, IInputFieldProps>(
  function InputField({ className, ...props }, ref) {
    return <UIInput.Input {...props} ref={ref} className={estiloCampo({ class: className })} />
  },
)

Input.displayName = 'Input'
InputField.displayName = 'InputField'

export { Input, InputField }
