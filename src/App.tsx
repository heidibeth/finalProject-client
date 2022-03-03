import * as React from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Auth from './components/auth/Auth';
import Navbar from './components/Navbar';



function App() {
  const [sessionToken, setSessionToken] = useState('');
  const [refreshUserTable, setRefreshUserTable] = useState(true);

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

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  };

  return (
    <div className="App">
      <Navbar />
      <Auth updateToken={updateToken}/>
     
    </div>
  );
}

export default App;
