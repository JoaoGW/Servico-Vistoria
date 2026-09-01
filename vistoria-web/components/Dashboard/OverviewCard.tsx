interface IOverviewCard {
  description: string
  label: string
  tone: 'default' | 'success' | 'warning'
  value: number
}

const tiposOverview = {
  default: 'text-[#1E274A]',
  warning: 'text-[#C8353F]',
  success: 'text-[#16803A]',
}

export default function OverviewCard({ description, label, tone, value }: IOverviewCard) {
  return (
    <section className="rounded-2xl border border-[#DDE3ED] bg-white px-5 py-5 shadow-[0_8px_24px_rgba(30,39,74,0.06)] sm:px-6">
      <p className="text-sm font-semibold text-[#687076]">{label}</p>
      <p className={`mt-3 text-4xl font-bold tracking-tight ${tiposOverview[tone]}`}>{value}</p>
      <p className="mt-2 text-sm text-[#687076]">{description}</p>
    </section>
  )
}
