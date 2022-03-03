import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Button } from 'reactstrap';
import Auth from './auth/Auth';
import MoodIndex from './mood/moodIndex';
import { MdOutlineMood } from 'react-icons/md';
import { GoTasklist } from 'react-icons/go';
import { BiHomeSmile } from 'react-icons/bi';
import { RiLineChartLine } from 'react-icons/ri';
import { BiHealth } from 'react-icons/bi';


interface NavbarProps {
  token: string
  clearToken: () => void;
  updateToken: (newToken: string) => void
  setRefreshMoodTable: React.Dispatch<React.SetStateAction<boolean>>,
  refreshMoodTable: boolean

}

interface NavbarState {
}
  
  
class Navbar extends React.Component<NavbarProps, NavbarState> {
    constructor(props: NavbarProps) {
      super(props);
      this.state = { 
         };
    }

render() {
    return (
      <nav className="navbar fixed-bottom navbar-expand-lg navbar-light align-center">
        <a className="navbar-brand" href="#"><BiHealth/>Seize The Day</a>
        <Button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </Button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#"><BiHomeSmile/> Home<span className="sr-only"></span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#"><GoTasklist/>  To Do Lists</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/moodlog"><MdOutlineMood/>  Mood Logs</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#"><RiLineChartLine/>  Mood Chart</a>
            </li>
          </ul>
        </div>


        <div>
          
              <Auth updateToken={this.props.updateToken}/>
            
              <MoodIndex 
                token={this.props.token} 
                refreshMoodTable={this.props.refreshMoodTable}
                setRefreshMoodTable={this.props.setRefreshMoodTable} />
             
        </div>
      </nav>
  )
}}

export default Navbar;