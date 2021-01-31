import React from 'react';
import {Link} from "react-router-dom";
import {useAuth} from "../../context/auth";


function NavBar({isAuthed}) {
  const {setAuthTokens} = useAuth();

  return (
    <>
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
              {!isAuthed ? <Link className='nav-link text-white' to="/login">Login</Link> :
                <a className='nav-link text-white' href='#' onClick={() => {
                  setAuthTokens(null)
                  localStorage.removeItem('userAuth')
                }}>Logout</a>}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavBar;