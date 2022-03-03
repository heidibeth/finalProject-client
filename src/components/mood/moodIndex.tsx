import * as React from 'react';
import MoodCreate from './moodCreate/moodCreate';

interface MoodIndexProps {
    token: string,
    setRefreshMoodTable: React.Dispatch<React.SetStateAction<boolean>>,
    refreshMoodTable: boolean,
}

interface MoodIndexState {
    moodEntries: [],
    moodEntry: []
    moodEntryToUpdate: {}
    isTableVisible: boolean
    updateActive: boolean,
    setMoodEntryToUpdate: boolean
    
}
 
class MoodIndex extends React.Component<MoodIndexProps, MoodIndexState> {
    constructor(props: MoodIndexProps) {
        super(props);
        this.state = { 
            moodEntries: [],
            moodEntry: [],
            moodEntryToUpdate: {},
            isTableVisible: true,
            updateActive: true,
            setMoodEntryToUpdate: true
    }

    const fetchMood = () => {
        fetch('http://localhost:4000/moodlog/mine', {
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

    //   editUpdateMoodEntry = (this.state.moodEntry) => {
    //     this.props.setMoodEntryToUpdate(this.state.moodEntry);
    //     console.log(this.state.moodEntry);
    //   };
    
    //   updateOn = () => {
    //     this.props.setUpdateActive(true);
    //   };
    
    //   updateOff = () => {
    //     this.props.setUpdateActive(false);
    //   };
    
    //   useEffect(() => {
    //     fetchMood();
    //   }, [this.props.refreshMoodTable]);
    
    //   handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     if (this.state.isTableVisible === true) {
    //         this.setState({ isTableVisible: false });
    //     } else {
    //         this.setState({ isTableVisible: true });
    //     }
      }

    render() { 
        return ( 
        <div>
            <div>
                 {/* {this.state.isTableVisible === true ? ( */}
            <MoodCreate 
                token={this.props.token} 
                refreshMoodTable={this.props.refreshMoodTable} 
                setRefreshMoodTable={this.props.setRefreshMoodTable}
                />
                {/* //  ) : ( */}
            {/* <MoodTable token={this.props.token} refreshMoodTable={this.props.refreshMoodTable} setRefreshMoodTable={this.props.setRefreshMoodTable editUpdateMoodEntry={this.props.editUpdateMoodyEntry}/> */}
                {/* //  }) */}
            </div>
        </div> 
         );
    }
}
 
export default MoodIndex;