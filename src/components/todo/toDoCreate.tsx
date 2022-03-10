import * as React from 'react';
import {Form, Button, Input, Container} from 'reactstrap';

interface ToDoCreateProps {
    token: string
}
 
interface ToDoCreateState {
    toDo: string,
    isComplete: boolean,
    itemToAdd: string
}
 
class ToDoCreate extends React.Component<ToDoCreateProps, ToDoCreateState> {
    constructor(props: ToDoCreateProps) {
        super(props);
        this.state = { 
            toDo: '',
            isComplete: false,
            itemToAdd: '' 
        };
    }


    handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetch('http://localhost:4000/todo/', {
            method: 'POST',
            body: JSON.stringify({
              toDo: this.state.itemToAdd,
              isComplete: this.state.isComplete
            }),
            headers: new Headers({
              'Content-Type': 'application/json',
              Authorization: this.props.token,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            this.setState({toDo: '', isComplete: false})
            console.log(data);
        
        })
        .catch(error => {
            console.error('Error:', error);
          });
    }

    render() { 
        return ( <div className='wrapper'>
            <Container style={{ width: '31%'}}>
        <div className='toDoheader'>
            <Form className='toDoInput' onSubmit={this.handleSubmit}>
                <Input 
                    className='input' 
                    type="text" 
                    placeholder='Task'
                    // value={this.state.itemToAdd} 
                    onChange={(e) => this.setState({itemToAdd: e.target.value})}
                    />
                {/* <Input 
                    className='input'
                    type="number" 
                    placeholder='Deadline (In Days)'
                    value={''}
                    // onChange={this.handleAddDeadline}
                    /> */}
                <Button type='submit' name='submit' value='submit'>Add To Do</Button>
            </Form>
            <div className='toDoList'></div>
        </div> 
        </Container>
        </div> );
    }
}
 
export default ToDoCreate;