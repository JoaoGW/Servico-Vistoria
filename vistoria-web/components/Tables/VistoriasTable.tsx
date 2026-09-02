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
    <section className="mt-10 overflow-hidden rounded-xl border border-[#DDE3ED] bg-white shadow-[0_8px_24px_rgba(30,39,74,0.06)]">
      <div className="border-b border-[#DDE3ED] px-5 py-4 sm:px-6">
        <p className="text-sm leading-6 text-[#71819C]">Vistorias cadastradas</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[48rem] w-full border-collapse text-left">
          <thead className="bg-[#142B59] text-sm font-bold uppercase tracking-[0.04em] text-white">
            <tr>
              <th className="px-5 py-4 sm:px-6" scope="col">Identificador</th>
              <th className="px-5 py-4 sm:px-6" scope="col">Descrição</th>
              <th className="px-5 py-4 sm:px-6" scope="col">Status</th>
              <th className="px-5 py-4 sm:px-6" scope="col">Criada em</th>
              <th className="px-5 py-4 sm:px-6" scope="col">Atualizada em</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DDE3ED] text-sm text-[#40516C]">
            {vistorias.map((vistoria) => (
              <tr className="transition-colors hover:bg-[#F8FAFD]" key={vistoria.id}>
                <td className="whitespace-nowrap px-5 py-5 font-mono font-bold text-[#1D417D] sm:px-6">{vistoria.id}</td>
                <td className="min-w-64 px-5 py-5 text-base font-semibold text-[#30405B] sm:px-6">{vistoria.description}</td>
                <td className="px-5 py-5 sm:px-6">
                  <span className={vistoria.pendente ? 'font-semibold text-[#C8353F]' : 'font-semibold text-[#16803A]'}>
                    {vistoria.pendente ? 'Pendente' : 'Concluída'}
                  </span>
                </td>
                <td className="whitespace-nowrap px-5 py-5 font-mono text-[#4B5C76] sm:px-6">{formatarData(vistoria.createdAt)}</td>
                <td className="whitespace-nowrap px-5 py-5 font-mono text-[#4B5C76] sm:px-6">{formatarData(vistoria.updatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="border-t border-[#DDE3ED] px-5 py-4 text-sm text-[#8A99AF] sm:px-6">{vistorias.length} vistorias exibidas</p>
    </section>
  )
}
