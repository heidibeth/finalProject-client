import * as React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar";
import Auth from "./components/auth/Auth";
import MoodIndex from "./components/mood/moodIndex";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/auth/login/Login";
import Signup from "./components/auth/signup/Signup";
import MoodTable from "./components/mood/moodTable/moodTable";
import Dashboard from "./components/Dashboard";
import ToDoIndex from "./components/todo/toDoIndex";
import MoodCreate from "./components/mood/moodCreate/moodCreate";
import ToDoTable from "./components/todo/toDoTable";
import MoodChart from "./components/chart/moodChart";
import AllUsers from "./components/users/AllUsers";
import AllToDos from "./components/todo/AllToDos";
import AllMoods from "./components/mood/AllMoods";

function App() {
  const [sessionToken, setSessionToken] = useState("");
  const [refreshMoodTable, setRefreshMoodTable] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token") ?? "");
    }
  }, []);

  const updateToken = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  };
const 
clearToken = () => {
  localStorage.clear();
  setSessionToken("")
};
  return (
    <div className="App">
      <Navbar
      clearToken={clearToken}
        token={sessionToken}
        updateToken={updateToken}
        setRefreshMoodTable={setRefreshMoodTable}
        refreshMoodTable={refreshMoodTable}
      />
      <Routes>
        {sessionToken === localStorage.getItem("token") ? (
          <Route
            path="/"
            element={
              <>
                <Dashboard
                  token={sessionToken}
                  setRefreshMoodTable={setRefreshMoodTable}
                  refreshMoodTable={refreshMoodTable}
                />
              </>
            }
          />
        ) : (
          <>
            {" "}
            <Route path="/" element={<Login updateToken={updateToken} />} />
            <Route
              path="register"
              element={<Signup updateToken={updateToken} />}
            />
          </>
        )}

        {
          sessionToken === localStorage.getItem("token") && <Route path="/all-users" element={<AllUsers />} />
        }

        {
          sessionToken === localStorage.getItem("token") && <Route path="/all-moods" element={<AllMoods />} />
        }

        {
          sessionToken === localStorage.getItem("token") && <Route path="/all-todos" element={<AllToDos />} />
        }

        {sessionToken === localStorage.getItem("token") ? (
          <Route
            path="/moodlog/*"
            element={
              <MoodIndex
                token={sessionToken}
                setRefreshMoodTable={setRefreshMoodTable}
                refreshMoodTable={refreshMoodTable}
              />
            }
          />
        ) : (
          <>
            {" "}
            <Route path="/" element={<Login updateToken={updateToken} />} />
            <Route
              path="register"
              element={<Signup updateToken={updateToken} />}
            />
          </>
        )}

        <Route path="/table" element={sessionToken? <MoodTable token={sessionToken} />: <Navigate to="/" replace/>} />

        {sessionToken === localStorage.getItem("token") ? (
          <Route
            path="/create"
            element={
              <MoodCreate
                token={sessionToken}
                refreshMoodTable={refreshMoodTable}
                setRefreshMoodTable={setRefreshMoodTable}
              />
            }
          />
        ) : (
          <>
            {" "}
            <Route path="/" element={<Login updateToken={updateToken} />} />
            <Route
              path="register"
              element={<Signup updateToken={updateToken} />}
            />
          </>
        )}

        {sessionToken===localStorage.getItem('token') ? 
          <Route path='todo/*' element={
          <ToDoIndex
            token={sessionToken}
           />}/>
      
        : <> <Route path='/' element={
          <Login updateToken={updateToken}/>}/>
        <Route path='register' element={
          <Signup updateToken={updateToken}/>}/></>}


        {sessionToken===localStorage.getItem('token') ? 
          <Route path='/chart' element={
          <MoodChart 
            // token={sessionToken}
            // setRefreshMoodTable={setRefreshMoodTable}
            // refreshMoodTable={refreshMoodTable}
            />}
            />
      
        : <> <Route path='/' element={
          <Login updateToken={updateToken}/>}/>
        <Route path='register' element={
          <Signup updateToken={updateToken}/>}/></>}
      </Routes>

    </div>
  );
}

export default App;
