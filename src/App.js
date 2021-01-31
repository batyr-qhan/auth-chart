import {useState} from 'react';
//Libraries
import {
  BrowserRouter as Router
} from "react-router-dom";
//Pages and Components
import NavBar from "./components/NavBar/NavBar";
import Routes from "./Routes/Routes";
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
        <NavBar isAuthed={userAuth} />
        <Routes isAuthed={userAuth} />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
