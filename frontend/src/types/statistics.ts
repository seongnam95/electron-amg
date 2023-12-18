export interface ReportData<T = any> {
  target: T;

  earnsIncentiveCount: number;
  mealCostCount: number;
  prepaidCount: number;
  otCount: number;
  attendanceCount: number;

  dailyPay: number;
  mealCost: number;
  otPay: number;
  prepay: number;

  taxAmount: number;
  totalPaySum: number;
  finalPay: number;
}
