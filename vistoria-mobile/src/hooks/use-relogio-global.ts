import { useEffect, useRef, useState } from 'react'

interface IRespostaHorarioGlobal {
  datetime: string
  timezone: string
}

const URL_HORARIO_GLOBAL = 'https://worldtimeapi.org/api/ip'

export function useRelogioGlobal() {
  const diferencaDeHorario = useRef(0)
  const fusoHorario = useRef<string | undefined>(undefined)
  const [agora, setAgora] = useState(() => new Date())

  useEffect(() => {
    let estaMontado = true

    const atualizarHorario = () => {
      if (estaMontado) {
        setAgora(new Date(Date.now() + diferencaDeHorario.current))
      }
    }

    const buscarHorarioGlobal = async () => {
      try {
        const resposta = await fetch(URL_HORARIO_GLOBAL)

        if (!resposta.ok) {
          throw new Error('Não foi possível consultar o horário global.')
        }

        const dados = (await resposta.json()) as IRespostaHorarioGlobal

        const horarioGlobal = new Date(dados.datetime).getTime()

        if (Number.isFinite(horarioGlobal)) {
          diferencaDeHorario.current = horarioGlobal - Date.now()
          fusoHorario.current = dados.timezone
          atualizarHorario()
        }
      } catch {
        diferencaDeHorario.current = 0
        fusoHorario.current = undefined
      }
    }

    atualizarHorario()
    void buscarHorarioGlobal()

    const intervalo = setInterval(atualizarHorario, 1000)

    return () => {
      estaMontado = false
      clearInterval(intervalo)
    }
  }, [])

  const opcoesDeFusoHorario = fusoHorario.current ? { timeZone: fusoHorario.current } : undefined

  return {
    dataAtual: agora.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      ...opcoesDeFusoHorario,
    }),
    horarioAtual: agora.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      hour12: false,
      minute: '2-digit',
      ...opcoesDeFusoHorario,
    }),
  }
}
