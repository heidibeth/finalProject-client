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
        //   this.props.setRefreshUserTable(!this.props.refreshUserTable);
        })
        .catch(error => {
            console.error('Error:', error);
          });
    }


    render() { 
        return ( 
        <div>
            <Container>
                <h1>Login</h1>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="username">Username</Label>
                        <Input
                        onChange={(e) => (this.state.username)}
                        name="username"
                        value={this.state.username}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Input
                        onChange={(e) => (this.state.password)}
                        name="password"
                        type="password"
                        value={this.state.password}
                        />
                    </FormGroup>
                    <div>
                        <Button type="submit">Submit</Button>
                    </div>
                </Form>
            </Container>
        </div> );
    }
}
 
export default Login;