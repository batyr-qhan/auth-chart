import {useState} from 'react';
import './App.css';
//Libraries
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
//Pages and Components
import Home from './Pages/Home/Home'
import Donut from './Pages/Donut/Donut'
import Login from './Pages/Login/Login'
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
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
        <nav className='navbar navbar-expand-lg navbar-light bg-dark px-5 mb-5'>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                  aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className='nav-link text-white mr-3' to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className='nav-link text-white' to="/donut">Donut Graph</Link>
              </li>

            </ul>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                {!userAuth ? <Link className='nav-link text-white' to="/login">Login</Link> : <a className='nav-link text-white' href='#' onClick={() => {
                  setUserAuth(null)
                  localStorage.removeItem('userAuth')
                }}>Logout</a>}
              </li>
            </ul>
          </div>
        </nav>
        <Switch>
          <PrivateRoute exact path="/" component={Home} isAuthed={userAuth}/>
          <PrivateRoute exact path="/donut" component={Donut} isAuthed={userAuth}/>
          <Route path="/login" component={Login}/>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
