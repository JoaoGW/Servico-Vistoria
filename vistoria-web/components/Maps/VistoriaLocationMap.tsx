"use client"

import { useEffect, useRef } from 'react'

import type { Map as LeafletMap } from 'leaflet'

interface VistoriaLocationMapProps {
  latitude: number
  longitude: number
}

export default function VistoriaLocationMap({ latitude, longitude }: VistoriaLocationMapProps) {
  const mapElement = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let map: LeafletMap | undefined
    let ativo = true

    void import('leaflet').then(({ default: L }) => {
      if (!ativo || !mapElement.current) {
        return
      }

      map = L.map(mapElement.current, {
        scrollWheelZoom: false,
      }).setView([latitude, longitude], 16)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map)

      L.circleMarker([latitude, longitude], {
        color: '#1E274A',
        fillColor: '#00C8E0',
        fillOpacity: 1,
        radius: 10,
        weight: 3,
      })
        .addTo(map)
        .bindTooltip('Localização registrada')
    })

    return () => {
      ativo = false
      map?.remove()
    }
  }, [latitude, longitude])

  return <div aria-label="Mapa da localização da vistoria" className="h-[28rem] w-full" ref={mapElement} />
}
