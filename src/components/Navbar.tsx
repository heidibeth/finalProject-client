import * as React from 'react';
import { Button } from 'reactstrap';
import { MdOutlineMood } from 'react-icons/md';
import { GoTasklist } from 'react-icons/go';
import { BiHomeSmile } from 'react-icons/bi';
import { RiLineChartLine } from 'react-icons/ri';
import { BiHealth } from 'react-icons/bi';


class Navbar extends React.Component {
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
        <a className="nav-link" href="#"><MdOutlineMood/>  Mood Logs</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#"><RiLineChartLine/>  Mood Chart</a>
      </li>
    </ul>
  </div>
</nav>)
}}

export default Navbar;