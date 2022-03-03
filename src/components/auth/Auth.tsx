import * as React from 'react';
import Signup from './signup/Signup';
import Login from './login/Login';
import { Button } from 'reactstrap';

interface AuthProps {
    updateToken: (newToken: string) => void
}
 
interface AuthState {
    isLoginVisible: true
}
 
class Auth extends React.Component<AuthProps, AuthState> {
    constructor(props: AuthProps) {
        super(props);
        this.state = { isLoginVisible: true };
    }


    handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
        // this.state.setisLoginVisible(!this.state.isLoginVisible);
    }

    render() { 
        return ( 
            <div>
                <h1>Welcome from auth</h1>
                {this.state.isLoginVisible === true ? (
                <Signup updateToken={this.props.updateToken}/> 
                ) : (
                <Login updateToken={this.props.updateToken}/>
                )}
                <br/>
                <Button onClick={this.handleToggle}>Signup/Login</Button>
            </div>
         );
    }
}
 
export default Auth;
