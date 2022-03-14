import * as React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  export const options = {
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Bar Chart - Stacked',
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  // filter this array based on month and based on emoji feeling .length
  
  const labels = ['🤗','😀', '😐', '😢', '💩'];

  const allMyMoods =[{mood:"🤗"}, {mood: "😀"}, {mood: "😀"}]
    console.log(allMyMoods.filter(myMood=> myMood.mood=="😀").length)

  export const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [10, 2, 4 , 5, 3],
        backgroundColor: 'rgb(255, 99, 132)',
      },
    //   {
    //     label: 'Dataset 2',
    //     data: labels.map(() => 100),
    //     backgroundColor: 'rgb(75, 192, 192)',
    //   },
    //   {
    //     label: 'Dataset 3',
    //      data: labels.map(() => 100),
    //     backgroundColor: 'rgb(53, 162, 235)',
    //   },
    ],
  };

interface MoodChartProps {
    
}
 
interface MoodChartState {
    
}
 
class MoodChart extends React.Component<MoodChartProps, MoodChartState> {
    constructor(props: MoodChartProps) {
        super(props);
        // this.state = { :  };
    }
    render() {
        return (
          <div>
            <h2>Line Example</h2>
            <Bar options={options} data={data} />
          </div>
        );
      }
}
 
export default MoodChart;