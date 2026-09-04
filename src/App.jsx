import React, { useState } from "react";
import ProductList from "./ProductList";
import AboutUs from "./AboutUs";
import "./App.css";

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  return (
    <div className="app-container">
      {!showProductList ? (
        <div className="landing-page background-image" style={{ textAlign: "center", padding: "50px 20px", color: "white" }}>
          <h1>Welcome to Paradise Nursery</h1>
          <p>Where Green Meets Serenity</p>
          <button 
            onClick={handleGetStartedClick}
            style={{ padding: "12px 24px", fontSize: "18px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginBottom: "30px" }}
          >
            Get Started
          </button>
          <AboutUs />
        </div>
      ) : (
        <ProductList />
      )}
    </div>
  );
}

export default App;
