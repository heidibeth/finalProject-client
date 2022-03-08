import * as React from "react";
import MoodCreate from "./moodCreate/moodCreate";
import MoodTable from "./moodTable/moodTable";
import MoodEdit, { MoodEntryAPI } from "./moodEdit/moodEdit";
import { IGetMoodMine } from "./moodIndex.interface";
import { Route, Routes } from "react-router-dom";

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
          <Routes>
          
          {/* //  ) : ( */}
          <Route
            path="table"
            element={
              <MoodTable
                token={this.props.token}
                updateOn={this.updateOn}
                updateOff={this.updateOff}
                refreshMoodTable={this.props.refreshMoodTable}
                setRefreshMoodTable={this.props.setRefreshMoodTable}
                editUpdateMoodEntry={this.editUpdateMoodEntry}
                moodEntryToUpdate={this.state.moodEntryToUpdate}
              />
            }
          /></Routes>
        </div>
      </div>
    );
  }
}

export default MoodIndex;
