import { useEffect, useState } from 'react';
import { PlaceDetails } from '../../../../model/geo/Geo';
import { Bar } from 'react-chartjs-2';

export type PlacesBarChartProps = {
  placesToDisplay: PlaceDetails[];
};

const data = {
  labels: [],
  datasets: [
    {
      label: '',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: ['rgb(111,66,193)'],
      borderColor: ['rgb(111,66,193)'],
      borderWidth: 0,
    },
  ],
};

const barOptions: any = {
  indexAxis: 'x',
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const PlacesBarChart = ({ placesToDisplay }: PlacesBarChartProps) => {
  const [barData, setBarData] = useState<any>(data);

  useEffect(() => {
    setBarData({
      labels: placesToDisplay.map((place) => place.name),
      datasets: [
        {
          data: placesToDisplay.map((place) => place.votes.length),
          backgroundColor: ['rgb(111,66,193)'],
          borderColor: ['rgb(0,0,0)'],
          borderWidth: 0,
        },
      ],
    });
  }, [placesToDisplay]);

  return <Bar data={barData} options={barOptions} />;
};
export default PlacesBarChart;
