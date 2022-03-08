import * as React from 'react';
import { MdOutlineMood } from 'react-icons/md';
import { GoTasklist } from 'react-icons/go';
import { BiHomeSmile } from 'react-icons/bi';
import { RiLineChartLine } from 'react-icons/ri';
import { BiHealth } from 'react-icons/bi';
import { NavLink, Route, Routes, Link } from 'react-router-dom'
import ToDoIndex from './todo/toDoIndex';
import MoodIndex from './mood/moodIndex';
import {BrowserRouter as Router} from 'react-router-dom'
import { Card, CardGroup, Col, Container, Row } from 'reactstrap';

interface DashboardProps {
    token: string,
    refreshMoodTable: boolean,
    setRefreshMoodTable: React.Dispatch<React.SetStateAction<boolean>>,
}
 
interface DashboardState {
    
}
 
class Dashboard extends React.Component<DashboardProps, DashboardState> {
    constructor(props: DashboardProps) {
        super(props);
        // this.state = { :  };
    }
    render() { 
        return ( 
            <div>
                <h2 className='mt-4 mb-0'>Let's Get Started</h2>
            <Container className="d-flex vh-100">
                <Row className='m-auto align-self-center'>
                    <Col>
                     <CardGroup>
                     <div className="col-lg-4 col-md-4 col-sm-6 text-center">
                        <Card className='mx-5 pb-5 dashIcon' style={{ backgroundColor: 'transparent', border: 'none' }}>
                            <Link to='todo' className='mx-2 py-4 pb-5' style={{textDecoration: 'none'}}><GoTasklist size={'100px'}/><br/><br/>To Do List</Link>
                        </Card>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6 text-center">
                        <Card className='mx-5 pb-5 dashIcon' style={{ backgroundColor: 'transparent', border: 'none' }}>
                            <Link to='moodlog' className='mx-2 py-4 pb-5' style={{textDecoration: 'none'}}><MdOutlineMood size={'100px'}/><br/><br/>Mood Entries</Link>
                        </Card>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6 text-center">
                        <Card className='mx-5 pb-5 dashIcon' style={{ backgroundColor: 'transparent', border: 'none' }}>       
                            <Link to='chart' className='mx-2 py-4 pb-5' style={{textDecoration: 'none'}}><RiLineChartLine size={'100px'}/><br/><br/>Mood Chart</Link>
                        </Card> 
                        </div>
                    </CardGroup>
                    </Col>
                </Row>
            </Container>
            </div>
         );
    }
}
 
export default Dashboard;