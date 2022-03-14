import * as React from 'react';

interface AllUsersProps {
    
}
 
interface AllUsersState {
    
}
 
class AllUsers extends React.Component<AllUsersProps, AllUsersState> {
    constructor(props: AllUsersProps) {
        super(props);
        this.state = {  };
    }
    render() { 
        return ( <div>
            <h4>All Users works</h4>
        </div> );
    }
}
 
export default AllUsers;