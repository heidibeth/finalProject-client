import * as React from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { MoodCreateButton } from './moodCreateButton';
import {NavigationButton} from '../../../Navigation'

interface MoodCreateProps {
    token: string,
    refreshMoodTable: boolean,
    setRefreshMoodTable: React.Dispatch<React.SetStateAction<boolean>>,
}
 
interface MoodCreateState {
    date: string,
    mood: string,
    struggleWith: string,
    gratefulFor: string,
    goalForWeek: string,
    summaryOfDay: string
}
 
class MoodCreate extends React.Component<MoodCreateProps, MoodCreateState> {
    excited = '🤗'
    happy = '😀'
    ok = '😐'
    sad = '😢'
    struggling = '💩'
    constructor(props: MoodCreateProps) {
        super(props);

        this.state = { 
            date: '',
            mood: '',
            struggleWith: '',
            gratefulFor: '',
            goalForWeek: '',
            summaryOfDay: ''
        };
    }

    handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetch('http://localhost:4000/moodlog/', {
            method: 'POST',
            body: JSON.stringify({
              date: this.state.date,
              mood: this.state.mood,
              struggleWith: this.state.struggleWith,
              gratefulFor: this.state.gratefulFor,
              goalForWeek: this.state.goalForWeek,
              summaryOfDay: this.state.summaryOfDay
            }),
            headers: new Headers({
              'Content-Type': 'application/json',
              Authorization: this.props.token,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
          this.props.setRefreshMoodTable(!this.props.refreshMoodTable);
            alert('Mood Log Created');
            this.setState({date: '', mood: '', struggleWith: '', gratefulFor: '', goalForWeek: '', summaryOfDay: ''})
        
        })
        .catch(error => {
            console.error('Error:', error);
          });
    }

    render() { 
        return ( 
            <div style={{ textAlign: 'center' }}>
            <Container style={{ width: '47%' }}>
                <h2 style={{ textAlign: 'center', marginTop: '10%', marginBottom: '5%', opacity: '0.7' }}>How Are You Feeling?</h2>
                <Form >
                <FormGroup>
                    <Label htmlFor="date" />
                    <Input
                    style={{backgroundColor: '#E8F6EF', opacity: '0.6'}}
                    type="date"
                    name="date"
                    pattern="[0-9]{8}"
                    value={this.state.date}
                    onChange={(e) => this.setState({date: e.target.value})}
                    />
                </FormGroup>
                <FormGroup tag="fieldset">
            <FormGroup style={{opacity: '0.7'}}>Mood</FormGroup>
            <FormGroup inline check>
              <Input
                type="radio"
                name="emoji"
                value="excited"
                onChange={(e) => this.setState({mood: e.target.value})}
                style={{ margin: '0px' }}
              />
              <Label className='emoji-label' check htmlFor="mood" style={{ zoom: '3', margin: '0px' }}>
                {this.excited}
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Input
                type="radio"
                name="emoji"
                value="happy"
                onChange={(e) => this.setState({mood: e.target.value})}
                style={{ margin: '0px' }}
              />
              <Label className='emoji-label' check htmlFor="mood" style={{ zoom: '3', margin: '0px' }}>
                {this.happy}
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Input
                type="radio"
                name="emoji"
                value="ok"
                onChange={(e) => this.setState({mood: e.target.value})}
                style={{ margin: '0px' }}
              />
              <Label className='emoji-label' check htmlFor="mood" style={{ zoom: '3', margin: '0px' }}>
                {this.ok}
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Input
                type="radio"
                name="emoji"
                value="sad"
                onChange={(e) => this.setState({mood: e.target.value})}
                style={{ margin: '0px' }}
              />
              <Label className='emoji-label' check htmlFor="mood" style={{ zoom: '3', margin: '0px' }}>
                {this.sad}
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Input
                type="radio"
                name="emoji"
                value="struggling"
                onChange={(e) => this.setState({mood: e.target.value})}
                style={{ margin: '0px' }}
              />
              <Label className='emoji-label' check htmlFor="mood" style={{ zoom: '3', margin: '0px' }}>
                {this.struggling}
              </Label>
            </FormGroup>
          </FormGroup>
                <FormGroup>
       
                   <div className='row'>
                     <div className='col-md-4'>
                      <Label className='moodLabel' htmlFor="struggleWith" style={{opacity: '0.7'}}>Struggling With:</Label></div>
                    <div className='col-md-8'>
                      <Input
                      type="text"
                      name="struggleWith"
                      placeholder="What do you struggle with today?"
                      value={this.state.struggleWith}
                      style={{backgroundColor: '#E8F6EF'}}
                      onChange={(e) => this.setState({struggleWith: e.target.value})}
                      />
                  </div>
                    </div>
                </FormGroup>
                <FormGroup>

                <div className='row'>
                     <div className='col-md-4'>
                     <Label className='moodLabel' htmlFor="gratefulFor" style={{opacity: '0.7'}}>Grateful For:</Label></div>
                    <div className='col-md-8'>
                    <Input
                    type="text"
                    name="gratefulFor"
                    placeholder="What are you grateful for?"
                    value={this.state.gratefulFor}
                    style={{backgroundColor: '#E8F6EF'}}
                    onChange={(e) => this.setState({gratefulFor: e.target.value})}
                    />
                  </div>
                    </div>

                </FormGroup>
                <FormGroup>

                <div className='row'>
                     <div className='col-md-4'>
                     <Label className='moodLabel' htmlFor="goalForWeek" style={{opacity: '0.7'}}>Goal For The Week:</Label></div>
                    <div className='col-md-8'>
                    <Input
                    type="text"
                    name="goalForWeek"
                    placeholder="What can you accomplish this week?"
                    value={this.state.goalForWeek}
                    style={{backgroundColor: '#E8F6EF'}}
                    onChange={(e) => this.setState({goalForWeek: e.target.value})}
                    />
                  </div>
                    </div>

                </FormGroup>
                <FormGroup>


                <div className='row'>
                     <div className='col-md-4'>
                     <Label className='moodLabel' htmlFor="summaryOfDay" style={{opacity: '0.7'}}>Summary of Day:</Label></div>
                    <div className='col-md-8'>
                    <Input
                    type="text"
                    name="summaryOfDay"
                    placeholder="How was your day?"
                    value={this.state.summaryOfDay}
                    style={{backgroundColor: '#E8F6EF'}}
                    onChange={(e) => this.setState({summaryOfDay: e.target.value})}
                    />
                  </div>
                    </div>

                </FormGroup>
                <FormGroup style={{ textAlign: 'center' }}>
                </FormGroup>
                </Form>
                  <MoodCreateButton token={this.props.token} date={this.state.date} mood={this.state.mood} struggleWith={this.state.struggleWith} gratefulFor={this.state.gratefulFor} goalForWeek={this.state.goalForWeek} summaryOfDay={this.state.summaryOfDay} />
                    
                    <NavigationButton path="/table" buttonColor="success" buttonTitle="View All Mood Entries"/>
            </Container>
          </div>
         );
    }
}
 
export default MoodCreate;