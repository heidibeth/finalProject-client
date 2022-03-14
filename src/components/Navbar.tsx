import React from 'react';
import { Container, Navbar, Nav, NavItem } from 'react-bootstrap';
import { MdOutlineMood } from 'react-icons/md';
import { GoTasklist } from 'react-icons/go';
import { BiHomeSmile } from 'react-icons/bi';
import { RiLineChartLine } from 'react-icons/ri';
import { FiLogOut } from 'react-icons/fi';
import { BiHealth } from 'react-icons/bi';



interface NavBarProps {
  token: string
  updateToken: (newToken: string) => void
  setRefreshMoodTable: React.Dispatch<React.SetStateAction<boolean>>,
  refreshMoodTable: boolean
  clearToken: ()=> void
}

interface NavBarState {
    navbarOpen: boolean
    sessionToken: string
    isLoggedIn: boolean
}


export default class NavBar extends React.Component<NavBarProps, NavBarState> {
  constructor(props: NavBarProps) {
    super(props);

    this.state = {
      navbarOpen: false,
      sessionToken: '',
      isLoggedIn: false
    };
  }

 
render() {
    return (
      
      <Navbar style={{ backgroundColor: '#7ECFC0'}} className="fixed-bottom" expand="lg">
        <Container>
          <div style={{justifyContent: 'left'}}>
          <Navbar.Brand href="/" style={{opacity: '0.7'}}><BiHealth/>Seize The Day</Navbar.Brand></div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto" style={{ marginLeft: 'auto'}}>
      
              <NavItem>
                <Nav.Link href="/"><BiHomeSmile/>Home</Nav.Link>
              </NavItem>
              <NavItem>
                <Nav.Link href="todo"><GoTasklist/>To Do List</Nav.Link>
              </NavItem>
              <NavItem>
                <Nav.Link href="moodlog"><MdOutlineMood/>Mood Log</Nav.Link>
              </NavItem>
              <NavItem>
                <Nav.Link href="chart"><RiLineChartLine />Mood Chart</Nav.Link>
              </NavItem>
              <NavItem>
                { localStorage.getItem("token") && <Nav.Link href='/' style={{ textDecoration: 'none' }} className="nav-link" onClick={this.props.clearToken}><FiLogOut/> Logout</Nav.Link> }
              </NavItem>            
      
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
