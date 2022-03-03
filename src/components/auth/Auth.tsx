import * as React from 'react';
import Signup from './signup/Signup';
import Login from './login/Login';
import { Button } from 'reactstrap';

interface AuthProps {
    updateToken: (newToken: string) => void
}
 
interface AuthState {
    isLoginVisible: boolean;
}
 
class Auth extends React.Component<AuthProps, AuthState> {
    constructor(props: AuthProps) {
        super(props);
        this.state = { isLoginVisible: true };
    }


    handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (this.state.isLoginVisible === true) {
            this.setState({ isLoginVisible: false });
        } else {
            this.setState({ isLoginVisible: true });
        }
    }

    render() { 
        return ( 
            <div>
                <div>
                    {this.state.isLoginVisible === true ? (
                        <Login updateToken={this.props.updateToken}/>
                     ) : (
                        <Signup updateToken={this.props.updateToken}/> 
                    )}
                </div>
                <br/>
                {this.state.isLoginVisible === true ? (
                    <Button onClick={this.handleToggle}>Signup</Button>
                ) : (
                    <Button onClick={this.handleToggle}>Login</Button>
                )}
            </div>
         );
    }
}
 
export default Auth;
