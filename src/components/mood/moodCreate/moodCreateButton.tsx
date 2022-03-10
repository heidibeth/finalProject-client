import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';



export const MoodCreateButton=(props:any)=>{
    const navigate = useNavigate();
    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        fetch('http://localhost:4000/moodlog/', {
            method: 'POST',
            body: JSON.stringify({
              date: props.date,
              mood: props.mood,
              struggleWith: props.struggleWith,
              gratefulFor: props.gratefulFor,
              goalForWeek: props.goalForWeek,
              summaryOfDay: props.summaryOfDay
            }),
            headers: new Headers({
              'Content-Type': 'application/json',
              Authorization: props.token,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            navigate("/table")
        })
        .catch(error => {
            console.error('Error:', error);
          });
    }

    // const handleSubmit =()=> navigate("/table")

    return (
        <div>
            <Button className='mb-3' onClick={handleSubmit}>Submit</Button>
        </div>
        )
}