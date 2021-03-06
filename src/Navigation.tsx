import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

interface NavigationButtonProps{
    path: string,
    buttonTitle: string
}

export const NavigationButton=(props:NavigationButtonProps)=>{
    const navigate = useNavigate();
 


    const handleSubmit =()=> navigate(props.path)
    return (
        <div>
            <Button className='mb-5' 
            style={{backgroundColor: 'rgb(126, 207, 192)', border: 'rgb(126, 207, 192)', opacity: '0.7'}} onClick={handleSubmit}>{props.buttonTitle}</Button>
        </div>
        )
}