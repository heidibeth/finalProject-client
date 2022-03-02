import * as React from 'react';

interface LoginProps {
    
}
 
interface LoginState {
    
}
 
class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
        this.state = { test: ""  };
    }
    render() { 
        return ( <div><h1>Hello from login</h1></div> );
    }
}
 
export default Login;