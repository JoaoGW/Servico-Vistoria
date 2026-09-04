import React from 'react'
import { createPressable } from '@gluestack-ui/core/pressable/creator'
import { type VariantProps, tva, withStyleContext } from '@gluestack-ui/utils/nativewind-utils'
import { Pressable as PressableNativo } from 'react-native'

const UIPressable = createPressable({
  Root: withStyleContext(PressableNativo),
})

const estiloPressionavel = tva({
  base: 'data-[focus-visible=true]:outline-none data-[focus-visible=true]:ring-indicator-info data-[focus-visible=true]:ring-2 data-[disabled=true]:opacity-40',
})

type IPressableProps = Omit<React.ComponentProps<typeof UIPressable>, 'context'> &
  VariantProps<typeof estiloPressionavel>

const Pressable = React.forwardRef<React.ComponentRef<typeof UIPressable>, IPressableProps>(
  function Pressable({ className, ...props }, ref) {
    return <UIPressable {...props} ref={ref} className={estiloPressionavel({ class: className })} />
  },
)

Pressable.displayName = 'Pressable'

export { Pressable }
