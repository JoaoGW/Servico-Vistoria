import { Wifi } from 'lucide-react-native'

import { Box } from '@/components/ui/box'
import { Icon } from '@/components/ui/icon'

export function IndicadorConexao() {
  return (
    <Box accessibilityLabel="Conexão com a internet" accessibilityRole="image" className="pt-1">
      <Icon as={Wifi} className="text-vistoria-marca" size="xl" />
    </Box>
  )
}
