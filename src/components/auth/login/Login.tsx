import * as React from 'react';
import { FormGroup, Label, Input, Button, Container, Form } from 'reactstrap';
import { Link } from 'react-router-dom';

interface LoginProps {
    updateToken: (newToken: string) => void
    updateIsAdmin: (adminStatus: boolean) => void
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
          this.props.updateIsAdmin(data.user.isAdmin);
          console.log(data.user.isAdmin);
          
        })
        .catch(error => {
            console.error('Error:', error);
          });
    }


    render() { 
        return ( 
        <div>
            <Container style={{ width: '41%' }}>
                <h1 className='py-3'>Login</h1>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="username">Username</Label>
                        <Input style={{color: '#FFE194'}}
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
                    <div className='row ps-5 pe-5 pb-3 pt-4'>
                        <Button type="submit">Submit</Button>
                        <br/>
                        <br/>
                        <Link to='/register'>
                        <p className='row ps-4 pe-4 pt-3' style={{justifyContent: 'center', textDecoration: 'none'}}>Not a User?</p>
                        </Link>
                    </div>
                </Form>
            </Container>
        </div> );
    }
}
 
export default Login;