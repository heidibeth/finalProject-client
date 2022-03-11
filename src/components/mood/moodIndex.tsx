import * as React from "react";
import MoodCreate from "./moodCreate/moodCreate";
import { MoodEntryAPI } from "./moodEdit/moodEdit";
import { IGetMoodMine } from "./moodInex.interface";

interface MoodIndexProps {
  token: string;
  setRefreshMoodTable: React.Dispatch<React.SetStateAction<boolean>>;
  refreshMoodTable: boolean;
}

interface MoodIndexState {
  moodEntries: IGetMoodMine[];
  moodEntryToUpdate: MoodEntryAPI;
  isTableVisible: boolean;
  updateActive: boolean;
}

class MoodIndex extends React.Component<MoodIndexProps, MoodIndexState> {
  constructor(props: MoodIndexProps) {
    super(props);
    this.state = {
      moodEntries: [],

      moodEntryToUpdate: {
        id: 0,
        date: "",
        mood: "",
        struggleWith: "",
        gratefulFor: "",
        goalForWeek: "",
        summaryOfDay: "",
      },
      isTableVisible: true,
      updateActive: true,
    };
  }

  editUpdateMoodEntry = (moodEntry: MoodEntryAPI) => {
    this.setState({ moodEntryToUpdate: moodEntry });
    console.log(moodEntry);
  };

  updateOn = (value: boolean) => {
    this.setState({ updateActive: value });
  };

  updateOff = (value: boolean) => {
    this.setState({ updateActive: value });
  };

  // useEffect(() => {
  //   fetchMood();
  // }, [this.props.refreshMoodTable]);

 

  render() {
    return (
      <div>
        <div>
          <h1>Hello</h1>
          <MoodCreate
                token={this.props.token}
                refreshMoodTable={this.props.refreshMoodTable}
                setRefreshMoodTable={this.props.setRefreshMoodTable}/>
  
        
        </div>
      </div>
    );
  }
}

export default MoodIndex;
