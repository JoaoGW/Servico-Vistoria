import type React from 'react'

import { OverlayProvider } from '@gluestack-ui/core/overlay/creator'
import { ToastProvider } from '@gluestack-ui/core/toast/creator'
import { View, type ViewProps } from 'react-native'

import { config } from './config'

interface IGluestackUIProviderProps {
  children?: React.ReactNode
  style?: ViewProps['style']
}

export function GluestackUIProvider({ children, style }: IGluestackUIProviderProps) {
  return (
    <View style={[config.light, { flex: 1, height: '100%', width: '100%' }, style]}>
      <OverlayProvider>
        <ToastProvider>{children}</ToastProvider>
      </OverlayProvider>
    </View>
  )
}
