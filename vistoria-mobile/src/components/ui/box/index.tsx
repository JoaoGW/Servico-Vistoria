import React from 'react'
import { View, type ViewProps } from 'react-native'

import type { VariantProps } from '@gluestack-ui/utils/nativewind-utils'
import { estiloCaixa } from './styles'

interface IBoxProps extends ViewProps, VariantProps<typeof estiloCaixa> {
  className?: string
}

const Box = React.forwardRef<React.ComponentRef<typeof View>, IBoxProps>(function Box(
  { className, ...props },
  ref,
) {
  return <View ref={ref} {...props} className={estiloCaixa({ class: className })} />
})

Box.displayName = 'Box'

export { Box }
