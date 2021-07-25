import styles from './AnswersPieChart.module.css';
import { PieChart } from 'react-minimal-pie-chart';
import React from 'react';
import { BsSquareFill } from 'react-icons/bs';
import { ChoiceInfo } from '../../../model/survey/Survey';
import SliderInput from '../../common/forms/Input/SliderInput';
import Card from '../../common/Card/Card';

export type ChartItem = {
  title: string;
  value: number;
  color: string;
};

export type AnswersPieChartProps = {
  data: ChoiceInfo[];
  question: string;
  avg?: number;
  questionNumber: number;
};

const AnswersPieChart = ({ data, question, avg, questionNumber }: AnswersPieChartProps) => {
  const dataWithColor: ChartItem[] = data.map((choiceInfo: ChoiceInfo, index: number) => {
    return {
      title: choiceInfo.point !== undefined ? choiceInfo.point.toString() : choiceInfo.choice,
      value: choiceInfo.info.percentage,
      color: `rgba(112, 103, 207, ${(index + 1) / data.length})`,
    };
  });

  const chartData: ChartItem[] = dataWithColor.filter(
    (chartItem: ChartItem) => chartItem.value !== 0
  );

  const legend = dataWithColor.map((chartItem: ChartItem, index: number) => (
    <div key={index}>
      <BsSquareFill style={{ color: chartItem.color, marginRight: '10px' }} />
      {chartItem.title} - {chartItem.value}%
    </div>
  ));

  return (
    <Card title={'Question ' + questionNumber}>
      <p>{question}</p>
      <div className={styles.chartWithLegendContainer}>
        {chartData.length > 0 && (
          <div className={styles.chartContainer}>
            <PieChart
              data={chartData}
              animate={true}
              label={({ dataEntry }) => dataEntry.value + '%'}
              viewBoxSize={[100, 100]}
              radius={42}
              labelStyle={() => ({
                fill: 'var(--dark-grey)',
                fontSize: '6px',
              })}
              lineWidth={30}
              paddingAngle={5}
            />
          </div>
        )}
        <div className={styles.legendContainer}>{legend}</div>
      </div>
      {avg !== undefined && (
        <>
          <p className="mt-4">Average value</p>
          <SliderInput
            value={avg}
            onChange={() => void 0}
            min={data[0].point}
            max={data[data.length - 1].point}
          />
        </>
      )}
    </Card>
  );
};

export default AnswersPieChart;
