import * as React from 'react';
import { FormGroup, Label, Input, Button, Container, Form } from 'reactstrap';

interface LoginProps {
    updateToken: (newToken: string) => void
}
 
interface LoginState {
    username: string,
    password: string
}
 
class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
        this.state = { 
            username: '',
            password: ''  
        };
    }

    handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetch('http://localhost:4000/user/login', {
            method: 'POST',
            body: JSON.stringify({
              username: this.state.username,
              password: this.state.password
            }),
            headers: new Headers({
              'Content-Type': 'application/json',
            }),
        })
        .then((response) => response.json())
        .then((data) => {
          this.props.updateToken(data.sessionToken);
        })
        .catch(error => {
            console.error('Error:', error);
          });
    }


    render() { 
        return ( 
        <div>
            <Container style={{ width: '41%' }}>
                <h1>Login</h1>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="username">Username</Label>
                        <Input
                        onChange={(e) => this.setState({username: e.target.value})}
                        name="username"
                        value={this.state.username}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Input
                        onChange={(e) => this.setState({password: e.target.value})}
                        name="password"
                        type="password"
                        value={this.state.password}
                        />
                    </FormGroup>
                    <div className='row ps-3 pe-3 pb-3'>
                        <Button type="submit">Submit</Button>
                        <br/>
                        <br/>
                        <p className='row ps-3 pe-3 textCenter'>Not a User?</p>
                    </div>
                </Form>
            </Container>
        </div> );
    }
}
 
export default Login;