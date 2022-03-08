import * as React from 'react';
import { Table, Button, Container } from 'reactstrap';
import MoodEdit from '../moodEdit/moodEdit';
import { IGetMoodMine } from '../moodIndex.interface';

interface MoodTableProps {
  token: string
  editUpdateMoodEntry: (e: any) => void,
  updateOn: (e: boolean)=> void
  setRefreshMoodTable: React.Dispatch<React.SetStateAction<boolean>>
  refreshMoodTable: boolean
  updateOff: (e: boolean)=> void
  moodEntryToUpdate: MoodEntryAPI;
}

interface MoodTableState {
  moodEntries: IGetMoodMine[],
    
}

export interface MoodEntryAPI {
  id: number,
  date: string,
  mood: string,
  struggleWith: string,
  gratefulFor: string,
  goalForWeek: string,
  summaryOfDay: string
}
 
class MoodTable extends React.Component<MoodTableProps, MoodTableState> {
    constructor(props: MoodTableProps) {
        super(props);
        this.state = { moodEntries: [] };
    };

    fetchMood = () => {
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

    deleteMoodEntry = (moodEntry: IGetMoodMine) => {
      fetch(`http://localhost:4000/moodlog/${moodEntry.id}`, {
        method: 'DELETE',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: this.props.token,
        }),
      }).then(() => this.fetchMood());
    };

  componentDidUpdate(prevProps: MoodTableProps, prevState: MoodTableState) {
    if (prevProps.token !== this.props.token){
      this.fetchMood()
    }
  }

  componentDidMount() {
    if (this.props.token){
      this.fetchMood()
    }
  }

    moodTableMapper = () => {
      return this.state.moodEntries.map((moodEntry, index) => {
        return (
          <tr key={index}>
            <td>{moodEntry.id}</td>
            <td>{moodEntry.date}</td>
            <td>{moodEntry.mood}</td>
            <td>{moodEntry.struggleWith}</td>
            <td>{moodEntry.gratefulFor}</td>
            <td>{moodEntry.goalForWeek}</td>
            <td>{moodEntry.summaryOfDay}</td>
            <td>
              <Button
                style={{
                  justifyContent: 'center',
                  borderWidth: '0',
                  textAlign: 'center',
                  alignItems: 'center',
                  marginRight: '50',
                  width: '100',
                  backgroundColor: '#86b13d',
                }}
                onClick={() => {
                  this.props.editUpdateMoodEntry(moodEntry);
                  this.props.updateOn(true);
                }}
              >
                Edit
              </Button>
            </td>
            <td>
              <Button
                style={{
                  borderWidth: 0,
                  textAlign: 'center',
                  width: 100,
                  backgroundColor: '#fe9233',
                }}
                onClick={() => {
                  this.deleteMoodEntry(moodEntry);
                }}
              >
                Delete
              </Button>{' '}
            </td>
          </tr>
        );
      });
    };
      

    render() { 
        return (
        <div style={{marginBottom:"150px"}}><Container style={{ width: '50%' }}>
        <div>
          <h1>Mood Entries</h1>
        </div>
        <div>
          <Table hover style={{ backgroundColor: 'white', borderRadius: 10 }}>
            <thead>
              <tr className="MoodTable">
                <th>Entry ID</th>
                <th>Date</th>
                <th>Mood</th>
                <th>Struggling With</th>
                <th>Grateful For</th>
                <th>Goal For Week</th>
                <th>Summary Of Day</th>
              </tr>
            </thead>
            <tbody>{this.moodTableMapper()}</tbody>
          </Table>
        </div>
      </Container>
      <MoodEdit 
                moodEntryToUpdate={this.props.moodEntryToUpdate}
                token={this.props.token}
                updateOff={this.props.updateOff}
                fetchMood={this.fetchMood}
                refreshMoodTable={this.props.refreshMoodTable} 
                setRefreshMoodTable={this.props.setRefreshMoodTable}
                />
      </div>  
      );
    }
}
 
export default MoodTable;