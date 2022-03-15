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
import { IGetMoodMine } from '../mood/moodInex.interface';
  
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
        display: true
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
        label: 'Moods Over Time',
        data: [0, 0, 0 , 0, 0],
        backgroundColor: 'rgb(255, 99, 132)',
      },
    ],
  };

interface MoodChartProps {
    token: string
    URL: string
}
 
interface MoodChartState {
    moodEntries: IGetMoodMine[],
    filteredArray: number[],
    newData: {
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            backgroundColor: string;
        }[]
},
showChart: boolean}
 
class MoodChart extends React.Component<MoodChartProps, MoodChartState> {
    constructor(props: MoodChartProps) {
        super(props);
        this.state = { 
            moodEntries: [],
            filteredArray: [0, 0, 0, 0, 0],
            newData: data ,
            showChart:false
    };
    }

    componentDidUpdate(prevProps: MoodChartProps, prevState: MoodChartState) {
        if (prevState.filteredArray !== this.state.filteredArray) {
      
            let clonedData = data
            clonedData.datasets[0].data = this.state.filteredArray
            this.setState({newData: {...this.state.newData, ...clonedData}, showChart:true})
        } 
        if (prevState.moodEntries !== this.state.moodEntries) {
            this.buildFilterArray();
        }
    }


    fetchMood = () => {
        fetch(this.props.URL, {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json',
            Authorization: this.props.token,
          }),
        })
          .then((res) => res.json())
          .then((logData) => {
            this.setState({moodEntries: (logData)});
            console.log(logData);
          });
      };

      componentDidMount() {
          this.fetchMood();
      }

      buildFilterArray = () => {
          const excited = this.state.moodEntries.filter(entry => entry.mood === 'excited').length
          const happy = this.state.moodEntries.filter(entry => entry.mood === 'happy').length
          const ok = this.state.moodEntries.filter(entry => entry.mood === 'ok').length
          const sad = this.state.moodEntries.filter(entry => entry.mood === 'sad').length
          const struggling = this.state.moodEntries.filter(entry => entry.mood === 'struggling').length

          this.setState({filteredArray: [excited, happy, ok, sad, struggling]})
      }


    render() {
        return (
          <div style={{ marginBottom: "150px"}}>
            <h2 className='mt-3'>Mood Chart</h2>
            {this.state.showChart  ? <Bar options={options} style={{width: '70vw'}} data={this.state.newData} redraw={true}/> : <h3>Loading...</h3>}
            
          </div>
        );
      }
}
 
export default MoodChart;