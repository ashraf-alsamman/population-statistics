import React from "react";
import Chart from "./Chart";
import Search from "./Search";
import Map from "./Map";

function App() {
  return (
    <>
      <div className="container">
        <h2 className="glow">Population Statistics</h2>
        <Search />
        <div className="row container data-con">
          <div className="col-5">
            <Chart />
          </div>
          <div className="col-7">
            <Map />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;