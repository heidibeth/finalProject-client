import * as React from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';


function App() {
  const [sessionToken, setSessionToken] = useState('');
  const [refreshMoodTable, setRefreshMoodTable] = useState(true);
  const [token, setToken] = useState('');

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


  // const protectedViews = () => {
  //   return sessionToken === localStorage.getItem('token') ? (
  //     <MainPage token={sessionToken} />
  //   ) : (
  //     <Auth
  //       updateToken={updateToken}
  //       refreshUserTable={refreshUserTable}
  //       setRefreshUserTable={setRefreshUserTable}
  //     />
  //   );
  // };

  return (
    <div className="App">
      <Navbar 
        token={token}
        updateToken={updateToken}
        clearToken={clearToken}
        setRefreshMoodTable={setRefreshMoodTable}
        refreshMoodTable={refreshMoodTable}
        />
     
    </div>
  );
}

export default App;
