import * as React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from './components/Navbar';
import MoodIndex from "./components/mood/moodIndex";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/auth/login/Login";
import Signup from "./components/auth/signup/Signup";
import MoodTable from "./components/mood/moodTable/moodTable";
import Dashboard from "./components/Dashboard";
import ToDoIndex from "./components/todo/toDoIndex";
import MoodCreate from "./components/mood/moodCreate/moodCreate";
import MoodChart from "./components/chart/moodChart";
import ToDoCreate from "./components/todo/toDoCreate/toDoCreate";

function App() {
  const [sessionToken, setSessionToken] = useState("");
  const [refreshMoodTable, setRefreshMoodTable] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);


  const updateIsAdmin = (adminStatus: boolean) => {
    localStorage.setItem('isAdmin', String(adminStatus));
    setIsAdmin(adminStatus);
    console.log(isAdmin);
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token") ?? "");
    } 
    if (localStorage.getItem("isAdmin")) {
      setIsAdmin(Boolean(localStorage.getItem("isAdmin")) ?? false);
    }
    console.log(isAdmin);
    
  }, []);


  const updateToken = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  };

  const clearToken = () => {
    localStorage.clear();
    setSessionToken("")
  };
  return (
    <div className="App">
      <NavBar
      clearToken={clearToken}
        token={sessionToken}
        updateToken={updateToken}
        setRefreshMoodTable={setRefreshMoodTable}
        refreshMoodTable={refreshMoodTable}
      />

      <Routes>
        <Route path="/table" element={sessionToken ? <MoodTable URL='http://localhost:4000/moodlog/mine' token={sessionToken} /> : <Navigate to="/" replace/>} />

        <Route path="/admin/table" element={isAdmin ? <MoodTable URL='http://localhost:4000/admin/all-moods' token={sessionToken} /> : setTimeout(() => <Navigate to="/" replace/>, 1000)} />

        <Route path="/admin/chart" element={isAdmin ? <MoodChart URL='http://localhost:4000/admin/all-moods' token={sessionToken} />:setTimeout(()=> <Navigate to="/" replace/>, 1000)} />

        <Route path="/admin/todo" element={isAdmin ? <ToDoCreate URL='http://localhost:4000/admin/all-todos' token={sessionToken} /> : setTimeout(()=><Navigate to="/" replace/>, 1000)} />

        <Route path="/todo" element={sessionToken ? <ToDoCreate URL='http://localhost:4000/todo/' token={sessionToken} /> : <Navigate to="/" replace/>} />


        


        {sessionToken === localStorage.getItem("token") ? (
          <Route path="/" element={ <> <Dashboard isAdmin={isAdmin} token={sessionToken} setRefreshMoodTable={setRefreshMoodTable} refreshMoodTable={refreshMoodTable} /> </> } /> 
          ) : ( 
          <> {" "} <Route path="/" element={<Login updateIsAdmin={updateIsAdmin} updateToken={updateToken} />} /> <Route path="register" element={<Signup updateIsAdmin={updateIsAdmin} updateToken={updateToken} />} /> </> )}


        {sessionToken === localStorage.getItem("token") ? (
          <Route path="/moodlog/*" element={ <MoodIndex token={sessionToken} setRefreshMoodTable={setRefreshMoodTable} refreshMoodTable={refreshMoodTable} />}/> 
              ) : ( 
              <> {" "} <Route path="/" element={<Login updateIsAdmin={updateIsAdmin} updateToken={updateToken} />} /> <Route path="register" element={<Signup updateIsAdmin={updateIsAdmin} updateToken={updateToken} />} /> </>  )}

 
        {sessionToken === localStorage.getItem("token") ? (
          <Route path="/create" element={ <MoodCreate token={sessionToken} refreshMoodTable={refreshMoodTable} setRefreshMoodTable={setRefreshMoodTable} /> } />
        ) : (
          <> {" "}
            <Route path="/" element={<Login updateIsAdmin={updateIsAdmin} updateToken={updateToken} />} />
            <Route path="register" element={<Signup updateIsAdmin={updateIsAdmin} updateToken={updateToken} />} /> </> )}

        {sessionToken===localStorage.getItem('token') ? 
          <Route path='todo/*' element={
          <ToDoIndex token={sessionToken} URL='http://localhost:4000/todo/'
           />}/>
        : <> <Route path='/' element={
          <Login updateIsAdmin={updateIsAdmin} updateToken={updateToken}/>}/>
        <Route path='register' element={
          <Signup updateIsAdmin={updateIsAdmin} updateToken={updateToken}/>}/></>}


        {sessionToken===localStorage.getItem('token') ? 
          <Route path='/chart' element={
          <MoodChart 
            token={sessionToken}
            URL= 'http://localhost:4000/moodlog/mine' />} /> 
        : <> <Route path='/' element={
          <Login updateIsAdmin={updateIsAdmin} updateToken={updateToken}/>}/>
        <Route path='register' element={
          <Signup updateIsAdmin={updateIsAdmin} updateToken={updateToken}/>}/></>}
      </Routes>
    </div>
  );
}

export default App;
