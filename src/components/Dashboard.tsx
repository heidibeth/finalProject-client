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
                <div className='header'>
                    <h2 className='mt-5 mb-5' style={{fontSize: '50px', opacity: '0.7'}}>Let's Get Started</h2>
                </div>
            <Container className="d-flex">
                <Row className='m-auto align-self-center'>
                    <Col>
                     <CardGroup className='mt-5'>
                     <div className="col-lg-4 col-md-4 col-sm-6 text-center">
                        <Card className='mx-5 pb-5 dashIcon' style={{ backgroundColor: 'transparent', border: 'none' }}> 
                            <Link to='todo' className='mx-2 py-2' style={{ textDecoration: 'none', color: '#FF8C00', opacity: '0.6'}}>
                                <GoTasklist size={'100px'}/></Link>
                            
                            <Link to='todo' className='mx-1 pb-5' style={{fontSize: '30px', textDecoration: 'none', color: 'black', opacity: '0.6'}}><br/>To Do List</Link>
                        </Card>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6 text-center">
                        <Card className='mx-5 pb-5 dashIcon' style={{ backgroundColor: 'transparent', border: 'none' }}>
                            <Link to='moodlog' className='mx-2 py-2' style={{textDecoration: 'none', color: '#FF8C00', opacity: '0.6'}}>
                                <MdOutlineMood size={'100px'}/></Link>
                            <Link to='moodlog' className='mx-1 pb-5' style={{fontSize: '30px', textDecoration: 'none', color: 'black', opacity: '0.6'}}>
                                <br/>Mood Entries</Link>
                        </Card>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6 text-center">
                        <Card className='mx-5 pb-5 dashIcon' style={{ backgroundColor: 'transparent', border: 'none' }}>       
                            <Link to='chart' className='mx-2 py-2' style={{textDecoration: 'none', color: '#FF8C00', opacity: '0.6'}}>
                                <RiLineChartLine size={'100px'}/></Link>
                            <Link to='chart' className='mx-1 pb-5' style={{fontSize: '30px', textDecoration: 'none', color: 'black', opacity: '0.6'}}>
                                <br/>Mood Chart</Link>
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