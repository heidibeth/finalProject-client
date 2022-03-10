import * as React from 'react';
import ToDoCreate from './toDoCreate';
import {ToDoInterface} from './toDoInterface';


interface ToDoIndexProps {
    token: string
}
 
interface ToDoIndexState {
    toDoEntries: ToDoInterface[];
    itemToAdd: string,
    // toDoEntryToUpdate: ToDoEntryAPI
    // deadlineToAdd: number
}
 
class ToDoIndex extends React.Component<ToDoIndexProps, ToDoIndexState> {
    constructor(props: ToDoIndexProps) {
        super(props);
        this.state = { 
            toDoEntries: [],
            itemToAdd: '',
            // deadlineToAdd: '',
            // toDoEntryToUpdate: {
            //     id: 0,
            //     toDo: '',
            //     isComplete: false,
            //     eventId: 0
            // }
     };
    }

    

    // editUpdateToDoEntry = (toDoEntry: ToDoEntryAPI) => {
    //     this.setState({ toDoEntryToUpdate: toDoEntry });
            // console.log(toDoEntry);
            
    // }


    // handleAddDeadline = (e) => {
    //     this.setState({deadlineToAdd: e.target.value})
    // }

    render() { 
        return ( 
        <div>
            <div>
                <h1>To Do List</h1>
                <ToDoCreate
                token={this.props.token}/>
            </div>
        </div>
        );
    }
}
 
export default ToDoIndex;