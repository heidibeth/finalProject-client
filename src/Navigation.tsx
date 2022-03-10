import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

interface NavigationButtonProps{
    path: string,
    buttonTitle: string,
    buttonColor: "danger"| "success"
}

export const NavigationButton=(props:NavigationButtonProps)=>{
    const navigate = useNavigate();
 


    const handleSubmit =()=> navigate(props.path)
    return (
        <div>
            <Button className='mb-5' color={props.buttonColor} onClick={handleSubmit}>{props.buttonTitle}</Button>
        </div>
        )
}