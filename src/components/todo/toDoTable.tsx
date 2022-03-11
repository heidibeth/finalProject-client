import * as React from 'react';
import {Button} from 'reactstrap';


interface ToDoTableProps {
    token: string
}
 
interface ToDoTableState {
    toDoEntries: ToDoInterface[];
    isOpen: boolean
}

export interface ToDoInterface {
    id: number,
    toDo: string,
    isComplete: boolean
}
 
class ToDoTable extends React.Component<ToDoTableProps, ToDoTableState> {
    constructor(props: ToDoTableProps) {
        super(props);
        this.state = { 
            toDoEntries: [],
            isOpen: false 
         };
    }

    fetchToDo = () => {
        fetch(`http://localhost:4000/todo/`, {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json',
            Authorization: this.props.token,
          }),
        })
          .then((res) => res.json())
          .then((logData) => {
            this.setState({toDoEntries: (logData)});
            console.log(logData);
          });
      };


      deleteToDoEntry = (toDoEntry: ToDoInterface) => {
        fetch(`http://localhost:4000/moodlog/${toDoEntry.id}`, {
          method: 'DELETE',
          headers: new Headers({
            'Content-Type': 'application/json',
            Authorization: this.props.token,
          }),
        }).then(() => this.fetchToDo());
      };


      componentDidUpdate(prevProps: ToDoTableProps, prevState: ToDoTableState) {
        if (prevProps.token !== this.props.token){
          this.fetchToDo()
        }
      }
    
      componentDidMount() {
        if (this.props.token){
          this.fetchToDo()
        }
      }

      updateOff =()=>{
        this.setState({isOpen: false})
        this.fetchToDo()
      }

      toggleModal = () => {
        this.setState({
          isOpen: !this.state.isOpen
        })
      }

      toDoTableMapper = () => {
        return this.state.toDoEntries.map((toDoEntry, index) => {
          return (
            <tr key={index}>
              <td>{toDoEntry.id}</td>
              <td>{toDoEntry.toDo}</td>
              <td>{toDoEntry.isComplete}</td>
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
                    // this.handleEdit(toDoEntry);
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
                    this.deleteToDoEntry(toDoEntry);
                  }}
                >
                  Delete
                </Button>{' '}
              </td>
            </tr>
          );
        });
      };

    //   handleEdit =(toDoEntry: ToDoInterface)=>{
    //     this.setState({toDoEntries: toDoEntry, isOpen: true})
    //     console.log(toDoEntry)
    //   }


    render() { 
        return ( <div>

        </div> );
    }
}
 
export default ToDoTable;