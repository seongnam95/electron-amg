export interface ReportData<T = any> {
  target: T;

  attendanceCount: number;
  earnsIncentiveCount: number;
  mealCostCount: number;
  prepaidCount: number;
  otCount: number;

  dailyPay: number;
  mealCost: number;
  otPay: number;
  prepay: number;

  taxAmount: number;
  totalPaySum: number;
  finalPay: number;
}
