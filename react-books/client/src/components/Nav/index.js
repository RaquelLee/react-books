import React from "react";
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-info">
      <a className="navbar-brand" href="/">
        React Reading List
      </a>
      <Link className="navbar-brand" to="/">
        Search
      </Link>
      <Link className="navbar-brand" to="/Saved">
        Saved
      </Link>
    </nav>
  );
}

export default Nav;
