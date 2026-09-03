import React from 'react'
import { Text as TextoNativo } from 'react-native'

import type { VariantProps } from '@gluestack-ui/utils/nativewind-utils'
import { estiloTexto } from './styles'

type ITextProps = React.ComponentProps<typeof TextoNativo> & VariantProps<typeof estiloTexto>

const Text = React.forwardRef<React.ComponentRef<typeof TextoNativo>, ITextProps>(function Text(
  { className, isTruncated, bold, underline, strikeThrough, size = 'md', ...props },
  ref,
) {
  return (
    <TextoNativo
      {...props}
      ref={ref}
      className={estiloTexto({
        isTruncated: isTruncated as boolean,
        bold: bold as boolean,
        underline: underline as boolean,
        strikeThrough: strikeThrough as boolean,
        size,
        class: className,
      })}
    />
  )
})

Text.displayName = 'Text'

export { Text }
