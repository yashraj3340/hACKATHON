import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AssetList from "./components/AssetList";
import AddAsset from "./components/AddAsset";
import AssetMap from "./components/AssetMap";

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">
            Municipal Asset Management
          </Link>
          <div className="navbar-nav">
            <Link to="/" className="nav-item nav-link">
              Assets
            </Link>
            <Link to="/add" className="nav-item nav-link">
              Add Asset
            </Link>
            <Link to="/map" className="nav-item nav-link">
              Asset Map
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<AssetList />} />
          <Route path="/add" element={<AddAsset />} />
          <Route path="/map" element={<AssetMap />} />
        </Routes>
        <div className="App">
          <h1>Geo Mapping Application</h1>
          <MapComponent />
        </div>
      </div>
    </Router>
  );
}

export default App;
