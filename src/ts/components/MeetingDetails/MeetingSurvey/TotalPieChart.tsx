import styles from './TotalPieChart.module.css';
import { PieChart } from 'react-minimal-pie-chart';
import React from 'react';

export type TotalPieChartProps = {
  filled: number;
  total: number;
};

const TotalPieChart = ({ filled, total }: TotalPieChartProps) => {
  const percentage: number = total === 0 ? 0 : Math.round((filled * 100) / total);

  return (
    <div>
      {percentage > 0 && (
        <div className={styles.chartContainer}>
          <PieChart
            data={[{ value: percentage, color: 'var(--secondary)' }]}
            totalValue={100}
            animate={true}
            label={({ dataEntry }) => dataEntry.value + '%'}
            viewBoxSize={[100, 100]}
            radius={42}
            labelStyle={() => ({
              fill: 'var(--dark-grey)',
              fontSize: '6px',
            })}
            labelPosition={0}
            lineWidth={30}
          />
        </div>
      )}
    </div>
  );
};

export default TotalPieChart;
