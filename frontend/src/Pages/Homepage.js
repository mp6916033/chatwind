import React from "react";
import { Link, useLocation } from "react-router-dom";
import MetaData from "../components/layouts/MetaData/Metadata"
import "./Homepage.css";
function HomePage() {
  const location = useLocation();

  return (
    <>
      <MetaData title="ChatWind | Home" />
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="#">
            <div className="navbar-logo">ChatMind</div>
          </Link>
          <div className="navbar-menu">
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default HomePage;
