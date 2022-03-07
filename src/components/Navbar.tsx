import * as React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { Button } from 'reactstrap';
import { MdOutlineMood } from 'react-icons/md';
import { GoTasklist } from 'react-icons/go';
import { BiHomeSmile } from 'react-icons/bi';
import { RiLineChartLine } from 'react-icons/ri';
import { FiLogOut } from 'react-icons/fi';
import { BiHealth } from 'react-icons/bi';


interface NavbarProps {
  token: string
  updateToken: (newToken: string) => void
  setRefreshMoodTable: React.Dispatch<React.SetStateAction<boolean>>,
  refreshMoodTable: boolean
  
}

interface NavbarState {
    sessionToken: string;
}
  
  
class Navbar extends React.Component<NavbarProps, NavbarState> {
    constructor(props: NavbarProps) {
      super(props);
      this.state = { 
        sessionToken: ''
         };
    }

    clearToken = () => {
      localStorage.clear();
      this.setState({sessionToken: ''});
    };


render() {
    return (
      <nav className="navbar fixed-bottom navbar-expand-lg navbar-light align-center">
        <a className="navbar-brand" href="/login"><BiHealth/>Seize The Day</a>
        <Button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </Button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#"><BiHomeSmile/> Home<span className="sr-only"></span></a>
            </li>
            <li className="nav-item">
              <NavLink to='todo' style={{ textDecoration: 'none' }}>
                <a className="nav-link"><GoTasklist/>To Do List</a>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='moodlog' style={{ textDecoration: 'none' }}>
                <a className="nav-link"><MdOutlineMood/>Mood Log</a>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='chart' style={{ textDecoration: 'none' }}>
                <a className="nav-link" href="#"><RiLineChartLine/>Mood Chart</a>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='logout' style={{ textDecoration: 'none' }}>
                <a className="nav-link" onClick={this.clearToken}><FiLogOut/> Logout</a>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
  )
}}

export default Navbar;