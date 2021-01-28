import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import {useState, useEffect} from 'react';
import {AuthContext} from "./context/auth";

function App() {

  const existingAuth = JSON.parse(localStorage.getItem("userAuth"));
  const [userAuth, setUserAuth] = useState(existingAuth);

  const setAuthData = (data) => {
    localStorage.setItem("userAuth", JSON.stringify(data));
    setUserAuth(data);
  }

  return (
    <AuthContext.Provider value={{userAuth, setAuthTokens: setAuthData}}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                {!userAuth ? <Link to="/login">Login</Link> : <a onClick={() => {
                  setUserAuth(null)
                  localStorage.removeItem('userAuth')
                }}>Logout</a>}

              </li>
              {/*<li>*/}
              {/*  <Link to="/signup">Sign Up</Link>*/}
              {/*</li>*/}
            </ul>
          </nav>
          <Switch>
            <PrivateRoute exact path="/" component={Home} isAuthed={userAuth}/>
            <Route path="/login" component={Login}/>
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
