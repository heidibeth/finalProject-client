import * as React from 'react';
import MoodCreate from './moodCreate/moodCreate';
import MoodTable from './moodTable/moodTable'
import MoodEdit, {MoodEntryAPI} from './moodEdit/moodEdit';
import { IGetMoodMine } from './moodInex.interface';

interface MoodIndexProps {
    token: string,
    setRefreshMoodTable: React.Dispatch<React.SetStateAction<boolean>>,
    refreshMoodTable: boolean,
}

interface MoodIndexState {
    moodEntries: IGetMoodMine[]
    moodEntryToUpdate: MoodEntryAPI
    isTableVisible: boolean
    updateActive: boolean
    setMoodEntryToUpdate: boolean
    
}
 
class MoodIndex extends React.Component<MoodIndexProps, MoodIndexState> {
    constructor(props: MoodIndexProps) {
        super(props);
        this.state = { 
            moodEntries: [],
       
            moodEntryToUpdate: {
              id: 0,
              date: '',
              mood: '',
              struggleWith: '',
              gratefulFor: '',
              goalForWeek: '',
              summaryOfDay: ''
            },
            isTableVisible: true,
            updateActive: true,
            setMoodEntryToUpdate: true
    }
  }


      // editUpdateMoodEntry = (this.state.moodEntry) => {
      //   this.props.setMoodEntryToUpdate(this.state.moodEntry);
      //   console.log(this.state.moodEntry);
      // };
    
      // updateOn = (value: boolean) => {
      //   this.setState({updateActive: value})}
      // // };
    
      // updateOff = (value: boolean) => {
      //   this.setState({updateActive: value})}
      // };
    
      // useEffect(() => {
      //   fetchMood();
      // }, [this.props.refreshMoodTable]);
    
    //   handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     if (this.state.isTableVisible === true) {
    //         this.setState({ isTableVisible: false });
    //     } else {
    //         this.setState({ isTableVisible: true });
        
      // }

    render() { 
        return ( 
        <div>
            <div>
                 {/* {this.state.isTableVisible === true ? ( */}
                 <h1>Hello</h1>
            <MoodCreate 
                token={this.props.token} 
                refreshMoodTable={this.props.refreshMoodTable} 
                setRefreshMoodTable={this.props.setRefreshMoodTable}
                />
                {/* //  ) : ( */}

          
            {/* <MoodTable 
                token={this.props.token} 
                refreshMoodTable={this.props.refreshMoodTable} setRefreshMoodTable={this.props.setRefreshMoodTable}editUpdateMoodEntry={this.props.editUpdateMoodyEntry}
        /> */}
                // {/* //  }) */}
            {/* <MoodEdit 
                moodEntryToUpdate={this.state.moodEntryToUpdate}
                token={this.props.token}
                updateOff={this.updateOff}
                fetchMood={this.fetchMood}
                refreshMoodTable={this.props.refreshMoodTable} 
                setRefreshMoodTable={this.props.setRefreshMoodTable}
                /> */}

            </div>
        </div> 
         );
    }
}
 
export default MoodIndex;