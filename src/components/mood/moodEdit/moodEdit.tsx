import * as React from 'react';
import { FormGroup, ModalBody, Modal, Form, Input, Label, Button, ModalHeader, ModalFooter, Container, } from 'reactstrap';


interface MoodEditProps {
    token: string,
    refreshMoodTable: boolean,
    setRefreshMoodTable: React.Dispatch<React.SetStateAction<boolean>>,
    moodEntryToUpdate: MoodEntryAPI,
    updateOff: (value: boolean) => void,
    fetchMood: () => void
}
 
interface MoodEditState {
    date: string,
    mood: string,
    struggleWith: string,
    gratefulFor: string,
    goalForWeek: string,
    summaryOfDay: string
}

export interface MoodEntryAPI {
    id: number,
    date: string,
    mood: string,
    struggleWith: string,
    gratefulFor: string,
    goalForWeek: string,
    summaryOfDay: string
}
 
class MoodEdit extends React.Component<MoodEditProps, MoodEditState> {
    excited = '🤗'
    happy = '😀'
    ok = '😐'
    sad = '😢'
    struggling = '💩'
    constructor(props: MoodEditProps) {
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
        fetch(`http://localhost:4000/moodlog/${this.props.moodEntryToUpdate.id}`, {
            method: 'PUT',
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
            alert('Mood Log Updated');
            this.setState({date: '', mood: '', struggleWith: '', gratefulFor: '', goalForWeek: '', summaryOfDay: ''})
        })
        .catch(error => {
            console.error('Error:', error);
          });
    }

    render() { 
        return ( 
            <div style={{ textAlign: 'center' }}>
            <Container style={{ width: '41%' }}>
                <h2 style={{ textAlign: 'center' }}>How Are You Feeling?</h2>
                <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label htmlFor="date" />
                    <Input
                    type="date"
                    name="date"
                    pattern="[0-9]{8}"
                    value={this.state.date}
                    onChange={(e) => this.setState({date: e.target.value})}
                    />
                </FormGroup>
                <FormGroup tag="fieldset">
            <FormGroup>Mood</FormGroup>
            <FormGroup inline check>
              <Input
                type="radio"
                name="emoji"
                value="excited"
                onChange={(e) => this.setState({mood: e.target.value})}
                style={{ margin: '0px' }}
              />
              <Label check htmlFor="mood" style={{ zoom: '3', margin: '0px' }}>
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
              <Label check htmlFor="mood" style={{ zoom: '3', margin: '0px' }}>
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
              <Label check htmlFor="mood" style={{ zoom: '3', margin: '0px' }}>
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
              <Label check htmlFor="mood" style={{ zoom: '3', margin: '0px' }}>
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
              <Label check htmlFor="mood" style={{ zoom: '3', margin: '0px' }}>
                {this.struggling}
              </Label>
            </FormGroup>
          </FormGroup>
                <FormGroup>
                    <Label htmlFor="struggleWith">Struggling With:</Label>
                    <Input
                    type="text"
                    name="struggleWith"
                    placeholder="What are you struggling with today?"
                    value={this.state.struggleWith}
                    onChange={(e) => this.setState({struggleWith: e.target.value})}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="gratefulFor">Grateful For:</Label>
                    <Input
                    type="text"
                    name="gratefulFor"
                    placeholder="What are you grateful for today?"
                    value={this.state.gratefulFor}
                    onChange={(e) => this.setState({gratefulFor: e.target.value})}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="goalForWeek">Goal For The Week:</Label>
                    <Input
                    type="text"
                    name="goalForWeek"
                    placeholder="What is your goal for the week ahead?"
                    value={this.state.goalForWeek}
                    onChange={(e) => this.setState({goalForWeek: e.target.value})}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="summaryOfDay">Summary of Day:</Label>
                    <Input
                    type="text"
                    name="summaryOfDay"
                    placeholder="What were some highlights of your day?"
                    value={this.state.summaryOfDay}
                    onChange={(e) => this.setState({summaryOfDay: e.target.value})}
                    />
                </FormGroup>
                <FormGroup style={{ textAlign: 'center' }}>
                    <Button className='mb-5' type="submit">Submit</Button>
                </FormGroup>
                </Form>
            </Container>
          </div>
         );
    }
}
 
export default MoodEdit;