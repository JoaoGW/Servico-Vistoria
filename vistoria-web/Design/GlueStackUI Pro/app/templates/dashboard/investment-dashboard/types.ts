export interface Portfolio {
  totalValue: number;
  totalGain: number;
  totalGainPercentage: number;
  dayChange: number;
  dayChangePercentage: number;
}

export interface Investment {
  id: string;
  symbol: string;
  name: string;
  currentPrice: number;
  change: number;
  changePercentage: number;
  shares: number;
  value: number;
  gain: number;
  gainPercentage: number;
  logo: string;
}

export interface TrendingStock {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercentage: number;
  volume: string;
  logo: string;
}

export interface FinancialGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  progress: number;
  icon: string;
}

