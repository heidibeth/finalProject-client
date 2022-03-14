import * as React from 'react';
import {Form, Button, Input, Container} from 'reactstrap';
// import {NavigationButton} from '../../../Navigation'

interface ToDoCreateProps {
    token: string,
    URL: string
}
 
interface ToDoCreateState {
    toDo: string,
    isComplete: boolean,
    itemToAdd: string,
    todos: any,
    isUpdated: boolean,
    todoToEdit: any
}
 
class ToDoCreate extends React.Component<ToDoCreateProps, ToDoCreateState> {
    constructor(props: ToDoCreateProps) {
        super(props);
        this.state = { 
            toDo: '',
            isComplete: false,
            itemToAdd: '',
            todos: [],
            isUpdated: false,
            todoToEdit: {}
        };
    }

    componentDidMount() {
        this.fetchAllTodos();
    }

    handleChange = (val: string) => {
        //console.log(val)
        this.setState({
            ...this.state,
            itemToAdd: val
        })
    }

    handleEdit = (todoToEdit: any) => {
        var filterResult = this.state.todos.filter((todo: any) => todo.id === todoToEdit.id)
        this.setState({
            ...this.state,
            itemToAdd: filterResult[0].toDo,
            isUpdated: true,
            todoToEdit: todoToEdit
        })
        //console.log(filterResult)
    }

    fetchAllTodos() {
        fetch('http://localhost:4000/todo/todos', {
            method: 'GET',
            headers: new Headers({
              'Content-Type': 'application/json',
              Authorization: this.props.token,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            this.setState({
                ...this.state,
                todos: data
            })
            //console.log(data)
        })
        .catch(error => {
            console.error('Error:', error);
          });
    }

    handleUpdateTodo = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        fetch(`http://localhost:4000/todo/${this.state.todoToEdit.id}`, {
            method: 'PUT',
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
            this.setState({
                ...this.state,
                isUpdated: false
            })

            this.fetchAllTodos()
        })
        .catch(error => {
            console.error('Error:', error);
          });
    }

    handleTodoDelete = (id: any) => {
        fetch(`http://localhost:4000/todo/${id}`, {
            method: 'DELETE',
            headers: new Headers({
              'Content-Type': 'application/json',
              Authorization: this.props.token,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            this.fetchAllTodos()

        })
        .catch(error => {
            console.error('Error:', error);
          });
    }


    handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        // console.log(this.state.itemToAdd)
        fetch(this.props.URL, {
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

            this.fetchAllTodos()

        })
        .catch(error => {
            console.error('Error:', error);
          });
    }

    render() { 
        return ( <div className='wrapper'>
            <Container style={{ width: 'fit-content'}}>
        <div className='toDoheader'>
            <Form className='toDoInput'>
                <Input 
                    className='input' 
                    type="text" 
                    placeholder='Task'
                    value={this.state.itemToAdd} 
                    onChange={(e) => this.handleChange(e.target.value)}
                    />
                {/* <Input 
                    className='input'
                    type="number" 
                    placeholder='Deadline (In Days)'
                    value={''}
                    // onChange={this.handleAddDeadline}
                    /> */}
                {
                    !this.state.isUpdated && <Button onClick={(e) => this.handleSubmit(e)} className='my-3' style={{ backgroundColor: '#E26310', color: 'white', opacity: '0.6'}}>Add To Do</Button>
                }
                {
                    this.state.isUpdated && <Button onClick={(e) => this.handleUpdateTodo(e)} className='mb-3' style={{ backgroundColor: '#E26310', color: 'white', opacity: '0.65'}}>Update</Button>
                }  
            </Form>
        
            <div className='toDoList'>
                {
                   this.state.todos.map((todo: any) => {
                       return (
                            <div className='list-area mb-3 mt-3'>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <span>{ todo.toDo }</span>
                                    </div>
                                    <div className='col-md-3'>
                                        <Button style={{borderRadius: '10%', margin: '2%'}} onClick={() => this.handleEdit(todo)}>Edit</Button>
                                    </div>
                                    <div className='col-md-3'>
                                        <Button style={{borderRadius: '10%'}}  onClick={() => this.handleTodoDelete(todo.id)}>Delete</Button>
                                    </div>
                                </div>
                            </div>
                       )
                   }) 
                }
            </div>
        </div> 
        </Container>
        </div> );
    }
}
 
export default ToDoCreate;