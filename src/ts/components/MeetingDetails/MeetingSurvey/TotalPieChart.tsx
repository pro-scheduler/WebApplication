import styles from './TotalPieChart.module.css';
import { PieChart } from 'react-minimal-pie-chart';
import React from 'react';

const TotalPieChart = ({ filled, total }: { filled: number; total: number }) => {
  const percentage: number = total === 0 ? 0 : Math.round((filled * 100) / total);

  return (
    <div>
      <p>
        Survey completed by {filled} {filled === 1 ? 'participant' : 'participants'}
      </p>
      {percentage ? (
        <div className={styles.chartContainer}>
          <PieChart
            data={[{ value: percentage, color: 'var(--bright-green)' }]}
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
      ) : (
        <p>0%</p>
      )}
    </div>
  );
};

export default TotalPieChart;
