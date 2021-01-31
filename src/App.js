import {useState} from 'react';
import './App.css';
//Libraries
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {Menu} from 'semantic-ui-react'
// import { Menu } from 'antd';
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
        <Menu pointing secondary>
          <Menu.Item as={Link} to='/'>
            Home
          </Menu.Item>
          <Menu.Item as={Link} to='/donut'>
            Donut
          </Menu.Item>

          <Menu.Menu position='right'>

            {!userAuth ?
              <Menu.Item as={Link} to='/login'>
                Login
              </Menu.Item> :

              <Menu.Item onClick={() => {
                setUserAuth(null)
                localStorage.removeItem('userAuth')
              }
              }>Logout</Menu.Item>
            }

          </Menu.Menu>
        </Menu>
        {/*<nav>*/}
        {/*  <ul>*/}
        {/*    <li>*/}
        {/*      <Link to="/">Home</Link>*/}
        {/*    </li>*/}
        {/*    <li>*/}
        {/*      <Link to="/donut">Donut Graph</Link>*/}
        {/*    </li>*/}
        {/*    <li>*/}
        {/*      {!userAuth ? <Link to="/login">Login</Link> : <a onClick={() => {*/}
        {/*        setUserAuth(null)*/}
        {/*        localStorage.removeItem('userAuth')*/}
        {/*      }}>Logout</a>}*/}

        {/*    </li>*/}
        {/*    /!*<li>*!/*/}
        {/*    /!*  <Link to="/signup">Sign Up</Link>*!/*/}
        {/*    /!*</li>*!/*/}
        {/*  </ul>*/}
        {/*</nav>*/}
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
