import * as React from 'react';
import Signup from './signup/Signup';
import Login from './login/Login';

interface AuthProps {
    updateToken: (newToken: string) => void
}
 
interface AuthState {
    
}
 
class Auth extends React.Component<AuthProps, AuthState> {
    constructor(props: AuthProps) {
        super(props);
        this.state = { isLoginVisible: true };
    }


    handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {

    }

    render() { 
        return ( 
            <div>
                <h1>Welcome from auth</h1>
                <Signup updateToken={this.props.updateToken}/>
                <Login updateToken={this.props.updateToken}/>
            </div>
         );
    }
}
 
export default Auth;
