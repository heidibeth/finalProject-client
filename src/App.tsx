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
        <Route path='login' element={
          <Login updateToken={updateToken}/>}/>
        <Route path='register' element={
          <Signup updateToken={updateToken}/>}/>
          <Route path='table' element={
            <MoodTable token={sessionToken}/>
          }/>
        <Route path='moodlog' element={
          <MoodIndex 
            token={sessionToken}
            setRefreshMoodTable={setRefreshMoodTable}
            refreshMoodTable={refreshMoodTable}/>}/>
      </Routes>
      {/* <Route path='/*' element={
       !sessionToken ? <Auth updateToken={updateToken}/> :
        <MoodIndex 
          token={sessionToken} 
          refreshMoodTable={refreshMoodTable}
          setRefreshMoodTable={setRefreshMoodTable} />
      }/> */}

    </div>
  );
}

export default App;
