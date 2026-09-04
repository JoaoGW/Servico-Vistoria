import type React from 'react'

import { SafeAreaView as SafeAreaViewNativo } from 'react-native-safe-area-context'
import { cssInterop } from 'nativewind'

interface ISafeAreaViewProps extends React.ComponentProps<typeof SafeAreaViewNativo> {
  className?: string
}

const SafeAreaView = SafeAreaViewNativo as React.ComponentType<ISafeAreaViewProps>

cssInterop(SafeAreaView, { className: 'style' })

export { SafeAreaView }
