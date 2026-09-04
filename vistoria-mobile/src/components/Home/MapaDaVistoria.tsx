interface IMapaDaVistoriaProps {
  coordenadas: { latitude: number; longitude: number } | null;
}

/**
 * Mantém uma referência vazia do mapa na bundle de servidor.
 * @param props - Coordenadas recebidas somente para manter a mesma interface nativa.
 * @returns Retorna null, pois o mapa é exibido apenas no cliente nativo.
 */
export function MapaDaVistoria(_: IMapaDaVistoriaProps) {
  return null;
}
