import React from 'react'

import { createIcon } from '@gluestack-ui/core/icon/creator'
import { type IPrimitiveIcon, PrimitiveIcon, type Svg } from '@gluestack-ui/core/icon/creator'
import { type VariantProps, tva } from '@gluestack-ui/utils/nativewind-utils'
import { cssInterop } from 'nativewind'

export const UIIcon = createIcon({
  Root: PrimitiveIcon,
}) as React.ForwardRefExoticComponent<
  React.ComponentPropsWithoutRef<typeof PrimitiveIcon> &
    React.RefAttributes<React.ComponentRef<typeof Svg>>
>

const estiloIcone = tva({
  base: 'text-vistoria-titulo fill-none pointer-events-none',
  variants: {
    size: {
      xs: 'h-3.5 w-3.5',
      sm: 'h-4 w-4',
      md: 'h-[18px] w-[18px]',
      lg: 'h-5 w-5',
      xl: 'h-6 w-6',
      '2xl': 'h-8 w-8',
      '3xl': 'h-10 w-10',
    },
  },
})

cssInterop(UIIcon, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      height: true,
      width: true,
      fill: true,
      color: 'classNameColor',
      stroke: true,
    },
  },
})

type IIconProps = IPrimitiveIcon &
  VariantProps<typeof estiloIcone> &
  React.ComponentPropsWithoutRef<typeof UIIcon>

const Icon = React.forwardRef<React.ComponentRef<typeof UIIcon>, IIconProps>(function Icon(
  { size = 'md', className, ...props },
  ref,
) {
  return <UIIcon ref={ref} {...props} className={estiloIcone({ size, class: className })} />
})

Icon.displayName = 'Icon'

export { Icon }
