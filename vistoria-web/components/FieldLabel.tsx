import type { ReactNode } from 'react'

interface FieldLabelProps {
  children: ReactNode
  htmlFor: string
  required?: boolean
}

export default function FieldLabel({ children, htmlFor, required = false }: FieldLabelProps) {
  return (
    <label className="block text-sm font-bold uppercase tracking-[0.02em] text-[#50617B]" htmlFor={htmlFor}>
      {children} {required ? <span className="text-[#C9353D]">*</span> : null}
    </label>
  )
}
