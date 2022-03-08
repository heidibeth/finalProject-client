import * as React from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import Auth from './components/auth/Auth';
import MoodIndex from './components/mood/moodIndex';
import { Route, Routes } from 'react-router-dom' 
import Login from './components/auth/login/Login';
import Signup from './components/auth/signup/Signup';
import MoodTable from './components/mood/moodTable/moodTable';
import Dashboard from './components/Dashboard';
import ToDoIndex from './components/todo/toDoIndex';
import MoodCreate from './components/mood/moodCreate/moodCreate';


function App() {
  const [sessionToken, setSessionToken] = useState('');
  const [refreshMoodTable, setRefreshMoodTable] = useState(true);


  useEffect(() => {
    if (localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token')??"");
    }
  }, []);

  const updateToken = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  };

  return (
    <div className="App">
    
          <Navbar 
            token={sessionToken}
            updateToken={updateToken}
            setRefreshMoodTable={setRefreshMoodTable}
            refreshMoodTable={refreshMoodTable}
            />
      <Routes>
       

          {sessionToken===localStorage.getItem('token') ? 
          <Route path='/' element={
          <Dashboard 
            token={sessionToken}
            setRefreshMoodTable={setRefreshMoodTable}
            refreshMoodTable={refreshMoodTable}
        />}/> 
      
        : <> <Route path='/' element={
          <Login updateToken={updateToken}/>}/>
        <Route path='register' element={
          <Signup updateToken={updateToken}/>}/></>}


        {sessionToken===localStorage.getItem('token') ? 
          <Route path='/moodlog/*' element={
          <MoodIndex 
            token={sessionToken}
            setRefreshMoodTable={setRefreshMoodTable}
            refreshMoodTable={refreshMoodTable}/>}/>
      
        : <> <Route path='/' element={
          <Login updateToken={updateToken}/>}/>
        <Route path='register' element={
          <Signup updateToken={updateToken}/>}/></>}


      {sessionToken===localStorage.getItem('token') ? 
          <Route path='/table' element={
          <MoodIndex 
            token={sessionToken}
            setRefreshMoodTable={setRefreshMoodTable}
            refreshMoodTable={refreshMoodTable}/>}/>
      
        : <> <Route path='/' element={
          <Login updateToken={updateToken}/>}/>
        <Route path='register' element={
          <Signup updateToken={updateToken}/>}/></>}

      {sessionToken===localStorage.getItem('token') ? 
        <Route
            path="/"
            element={
              <MoodCreate
                token={sessionToken}
                refreshMoodTable={refreshMoodTable}
                setRefreshMoodTable={setRefreshMoodTable}/>}
              />
              : <> <Route path='/' element={
                <Login updateToken={updateToken}/>}/>
              <Route path='register' element={
                <Signup updateToken={updateToken}/>}/></>}


        {/* {sessionToken===localStorage.getItem('token') ? 
          <Route path='todo' element={
          <ToDoIndex
            token={sessionToken}
            setRefreshMoodTable={setRefreshMoodTable}
            refreshMoodTable={refreshMoodTable}/>}/>
      
        : <> <Route path='/' element={
          <Login updateToken={updateToken}/>}/>
        <Route path='register' element={
          <Signup updateToken={updateToken}/>}/></>} */}

      {/* {sessionToken===localStorage.getItem('token') ? 
          <Route path='chart' element={
          <ChartIndex 
            token={sessionToken}
            setRefreshMoodTable={setRefreshMoodTable}
            refreshMoodTable={refreshMoodTable}/>}/>
      
        : <> <Route path='/' element={
          <Login updateToken={updateToken}/>}/>
        <Route path='register' element={
          <Signup updateToken={updateToken}/>}/></>} */}

         </Routes>


 {/* <Route path='table' element={
            <MoodTable token={sessionToken}
            setRefreshMoodTable={setRefreshMoodTable}
            refreshMoodTable={refreshMoodTable}
            />
          }/>  */}


    

    </div>
  );
}

export default App;
