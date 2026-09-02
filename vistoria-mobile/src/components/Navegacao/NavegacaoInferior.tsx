import { ClipboardCheck, FileText, House } from 'lucide-react-native'
import { type Href, useRouter } from 'expo-router'

import { Box } from '@/components/ui/box'
import { Icon } from '@/components/ui/icon'
import { Pressable } from '@/components/ui/pressable'
import { Text } from '@/components/ui/text'

interface INavegacaoInferiorProps {
  abaAtiva: 'home' | 'vistoria' | 'documentos'
}

interface IItemNavegacao {
  destino?: Href
  icone: typeof House
  identificador: INavegacaoInferiorProps['abaAtiva']
  titulo: string
}

const itensNavegacao = [
  { destino: '/', icone: House, identificador: 'home', titulo: 'Home' },
  { destino: '/vistorias', icone: ClipboardCheck, identificador: 'vistoria', titulo: 'Vistoria' },
  { icone: FileText, identificador: 'documentos', titulo: 'Documentos' },
] satisfies IItemNavegacao[]

export function NavegacaoInferior({ abaAtiva }: INavegacaoInferiorProps) {
  const router = useRouter()

  return (
    <Box accessibilityRole="tablist" className="min-h-[108px] flex-row border-t border-vistoria-borda bg-vistoria-superficie">
      {itensNavegacao.map((item) => {
        const Icone = item.icone
        const selecionado = item.identificador === abaAtiva

        return (
          <Pressable
            accessibilityRole="tab"
            accessibilityState={{ selected: selecionado }}
            key={item.titulo}
            onPress={() => {
              if (item.destino) {
                router.push(item.destino)
              }
            }}
            className="min-h-24 flex-1 items-center justify-center gap-2 data-[active=true]:bg-vistoria-fundo">
            <Icon
              as={Icone}
              className={selecionado ? 'text-vistoria-marca' : 'text-vistoria-auxiliar'}
              size="3xl"
            />
            <Text
              className={
                selecionado
                  ? 'text-xl font-semibold text-vistoria-marca'
                  : 'text-xl font-semibold text-vistoria-auxiliar'
              }>
              {item.titulo}
            </Text>
          </Pressable>
        )
      })}
    </Box>
  )
}
