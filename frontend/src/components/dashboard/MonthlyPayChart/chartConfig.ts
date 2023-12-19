import { ChartOptions, TooltipItem } from 'chart.js';
import { Dayjs } from 'dayjs';

const getChartOptions = (
  day: Dayjs,
  statsData: {
    positionName: string;
    positionColor: string;
    attendanceCounts: number[];
    dailyPaySums: number[];
  }[],
): ChartOptions<'bar'> => {
  return {
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false }, stacked: true },
      y: {
        beginAtZero: true,
        grid: { display: false },
        ticks: { display: false },
        border: { display: false },
        stacked: true,
      },
    },
    datasets: {
      bar: {
        backgroundColor: 'red',
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          title: (items: TooltipItem<'bar'>[]) => {
            return `${day.format('YY년 MM월')} ${items[0].label}일`;
          },
          labelColor: (item: TooltipItem<'bar'>) => {
            const datasetIndex = item.datasetIndex;
            const color = statsData[datasetIndex].positionColor;
            return { backgroundColor: color, borderColor: color };
          },
          label: (item: TooltipItem<'bar'>) => {
            const label = item.dataset.label || '';
            const value = item.formattedValue || '';
            return ` ${label} : ${value} 원`;
          },
          afterBody: (items: TooltipItem<'bar'>[]) => {
            const dateIndex = items[0].dataIndex;

            const attendanceCount = statsData.reduce((total, stats) => {
              return total + stats.attendanceCounts[dateIndex];
            }, 0);

            const totalAmount = items.reduce((total, item) => {
              const pay = Number(item.formattedValue.replaceAll(',', ''));
              return total + pay;
            }, 0);

            return `\n🙋🏻 총 출근 인원: ${attendanceCount}명\n📌 일일 합계액: ${totalAmount.toLocaleString()}원`;
          },
        },
      },
    },
  };
};

export default getChartOptions;
