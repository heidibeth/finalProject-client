import * as React from 'react';
import { Form, FormGroup, Label, Input, Button, Container } from 'reactstrap';
import { Link } from 'react-router-dom';


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
          window.location.href = "/"
        //   this.props.setRefreshUserTable(!this.props.refreshUserTable);
        })
        .catch(error => {
            console.error('Error:', error);
          });
    }

    render() { 
        return ( 
        <div>
            <Container style={{ width: '41%'}}>
            <h1 className='py-3'>
                Signup
            </h1>
            <Form onSubmit={this.handleSubmit}>
            <div style={{ margin: 2, justifyContent: 'center', textAlign: 'center'}}>
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
                <div className='row ps-5 pe-5 pb-3 pt-4'>
                    <Button type='submit'>Submit</Button>
                    <br/>
                    <br/>
                    <Link to='/'>
                    <p className='row ps-4 pe-4 pt-3 pb-4' style={{justifyContent: 'center', textDecoration: 'none'}}>Already a User?</p>
                    </Link>
                </div>
            </div>
            </Form>
            </Container>
        </div> 
        );
    }
}
 
export default Signup;