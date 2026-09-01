export interface Transaction {
  id: string;
  type: "income" | "expense";
  category: string;
  description: string;
  amount: number;
  date: string;
  icon: string;
}

export interface ChartDataPoint {
  date: string;
  value: number;
}

export interface FinanceOverview {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savings: number;
  balanceChange: number;
  balanceChangePercentage: number;
}

export interface CategorySummary {
  category: string;
  amount: number;
  percentage: number;
  icon: string;
  color: string;
}
