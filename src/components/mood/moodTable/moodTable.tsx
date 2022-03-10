import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { Table, Button, Container } from 'reactstrap';
import MoodEdit from '../moodEdit/moodEdit';
import { IGetMoodMine } from '../moodInex.interface';

import {NavigationButton} from '../../../Navigation'
interface MoodTableProps {
  token: string
  // editUpdateMoodEntry: (e: any) => void,
  // updateOn: (e: boolean)=> void
  // setRefreshMoodTable: React.Dispatch<React.SetStateAction<boolean>>
  // refreshMoodTable: boolean
  // updateOff: (e: boolean)=> void
  // moodEntryToUpdate: MoodEntryAPI;
}

interface MoodTableState {
  moodEntries: IGetMoodMine[],
  isOpen: boolean,
  moodEntryToUpdate: MoodEntryAPI;
    
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
        this.state = { moodEntries: [],
        isOpen: false,
      moodEntryToUpdate: {} as MoodEntryAPI };
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

  handleEdit =(moodEntry: IGetMoodMine)=>{
    this.setState({moodEntryToUpdate: moodEntry, isOpen: true})
    console.log(moodEntry)
  }

  updateOff =()=>{
    this.setState({isOpen: false})
    this.fetchMood()
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
                  this.handleEdit(moodEntry);
                  // this.props.editUpdateMoodEntry(moodEntry);
                  // this.props.updateOn(true);
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

    toggleModal = () => {
      this.setState({
        isOpen: !this.state.isOpen
      })
    }
   

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
        <NavigationButton path="/moodlog" buttonColor="success" buttonTitle="Create New Mood Entry"/>
        </div>
      </Container>
      { this.state.isOpen?
      <MoodEdit 
                moodEntryToUpdate={this.state.moodEntryToUpdate}
                token={this.props.token}
                updateOff={this.updateOff}
              
             
                />: null}
      </div>  
      );
    }
}
 
export default MoodTable;