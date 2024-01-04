export interface ReportData<T = any> {
  target?: T;

  attendanceCount: number;
  earnsIncentiveCount: number;
  mealCostCount: number;
  prepaidCount: number;
  otCount: number;

  paySum: number;
  mealCostSum: number;
  otPaySum: number;
  prepaySum: number;

  taxAmount: number;
  totalPaySum: number;
  finalPay: number;
}
