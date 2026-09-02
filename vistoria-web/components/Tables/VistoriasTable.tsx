export interface Vistoria {
  id: string
  description: string
  pendente: boolean
  createdAt: string
  updatedAt: string
}

interface VistoriasTableProps {
  vistorias: Vistoria[]
}

const formatarData = (valor: string) => {
  const data = new Date(valor)

  if (Number.isNaN(data.getTime())) {
    return 'Data indisponível'
  }

  return data.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export default function VistoriasTable({ vistorias }: VistoriasTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-[52rem] w-full border-collapse text-left">
        <thead className="bg-[#1E274A] text-sm font-semibold text-white">
          <tr>
            <th className="px-5 py-4 sm:px-6" scope="col">Identificador</th>
            <th className="px-5 py-4 sm:px-6" scope="col">Descrição</th>
            <th className="px-5 py-4 sm:px-6" scope="col">Status</th>
            <th className="px-5 py-4 sm:px-6" scope="col">Criada em</th>
            <th className="px-5 py-4 sm:px-6" scope="col">Atualizada em</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#DDE3ED] text-sm text-[#11181C]">
          {vistorias.map((vistoria) => (
            <tr className="hover:bg-[#F8FAFC]" key={vistoria.id}>
              <td className="whitespace-nowrap px-5 py-4 font-mono font-semibold text-[#1E274A] sm:px-6">{vistoria.id}</td>
              <td className="min-w-80 px-5 py-4 leading-6 sm:px-6">{vistoria.description}</td>
              <td className="px-5 py-4 sm:px-6">
                <span className={vistoria.pendente ? 'font-semibold text-[#C8353F]' : 'font-semibold text-[#16803A]'}>
                  {vistoria.pendente ? 'Pendente' : 'Concluída'}
                </span>
              </td>
              <td className="whitespace-nowrap px-5 py-4 text-[#687076] sm:px-6">{formatarData(vistoria.createdAt)}</td>
              <td className="whitespace-nowrap px-5 py-4 text-[#687076] sm:px-6">{formatarData(vistoria.updatedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
