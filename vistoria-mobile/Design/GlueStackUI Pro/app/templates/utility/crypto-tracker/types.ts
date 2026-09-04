export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  currentPrice: number;
  priceChange24h: number;
  priceChangePercent24h: number;
  marketCap: number;
  volume24h: number;
  sparklineData: number[];
  isFavorite: boolean;
}

export interface MiniSparklineProps {
  data: number[];
  width: number;
  height: number;
  color: string;
}

export interface CryptoLogoProps {
  size?: number;
}
