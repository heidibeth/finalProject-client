import * as React from 'react';
import { Form, FormGroup, Label, Input, Button, Container } from 'reactstrap';


interface SignupProps { 
    updateToken: (newToken: string) => void,
}
 
interface SignupState {   
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    isAdmin: boolean
}
 
class Signup extends React.Component<SignupProps, SignupState> {
    constructor(props: SignupProps) {
        super(props);
        this.state = { 
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            isAdmin: false
      };
    }

    handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetch('http://localhost:4000/user/register', {
            method: 'POST',
            body: JSON.stringify({
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              email: this.state.email,
              username: this.state.username,
              password: this.state.password,
              isAdmin: this.state.isAdmin
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
            <h1>
                Signup
            </h1>
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input onChange={(e) => this.setState({firstName: e.target.value})}
                    name="firstName"
                    value={this.state.firstName}/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                    onChange={(e) => this.setState({lastName: e.target.value})}
                    name="lastName"
                    value={this.state.lastName}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input
                    onChange={(e) => this.setState({email: e.target.value})}
                    name="email"
                    value={this.state.email}
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"
                    type="email"
                    />
                </FormGroup>
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
                    // minLength="5"
                    />
                </FormGroup>
                <div>
                    <Button type='submit'>Submit</Button>
                    <br/>
                    <br/>
                    <p>Already a User?</p>
                </div>
            </Form>
            </Container>
        </div> 
        );
    }
}
 
export default Signup;