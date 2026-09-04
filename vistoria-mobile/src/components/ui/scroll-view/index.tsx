import type React from 'react'

import { ScrollView as ScrollViewNativo } from 'react-native'
import { cssInterop } from 'nativewind'

interface IScrollViewProps extends React.ComponentProps<typeof ScrollViewNativo> {
  className?: string
  contentContainerClassName?: string
}

const ScrollView = ScrollViewNativo as React.ComponentType<IScrollViewProps>

cssInterop(ScrollView, {
  className: 'style',
  contentContainerClassName: 'contentContainerStyle',
})

export { ScrollView }
