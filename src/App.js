import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
//import Home from "./pages/Home";
import Login from "./pages/Login";
import ImportData from "./pages/ImportData";
import TrainData from "./pages/TrainData";
import Predict from "./pages/Predict";
import Result from "./pages/Result";
import TrainChart from "./pages/TrainChart";

function App() {
  return (
    <Router>
      <div>
        {/* Chỉ hiển thị Navbar và Sidebar khi ở trang Home */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Login />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/import-data"
            element={
              <>
                <Navbar />
                <ImportData />
              </>
            }
          />
          <Route
            path="/train-data"
            element={
              <>
                <Navbar />
                <TrainData />
              </>
            }
          />
          <Route
            path="/predict"
            element={
              <>
                <Navbar />
                <Predict />
              </>
            }
          />
          <Route
            path="/result"
            element={
              <>
                <Navbar />
                <Result />
              </>
            }
          />
          <Route
            path="/train-chart"
            element={
              <>
                <Navbar />
                <TrainChart />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
