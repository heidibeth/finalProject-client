import * as React from 'react';
import ToDoCreate from './toDoCreate/toDoCreate';


interface ToDoIndexProps {
    token: string
}
 
interface ToDoIndexState {
    toDoEntries: ToDoInterface[];
    itemToAdd: string,
    // toDoEntryToUpdate: ToDoEntryAPI
    // deadlineToAdd: number
}

export interface ToDoInterface {
    id: number,
    toDo: string,
    isComplete: boolean
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
                <h1 className='my-3'>To Do List</h1>
                <ToDoCreate
                    token={this.props.token}/>
            </div>
        </div>
        );
    }
}
 
export default ToDoIndex;