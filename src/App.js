import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import Dashboard from "./Pages/admindashboard";
import LoginPage from "./Pages/login";
import Sidebar from "./Components/sidebar";
import Header from "./Components/header";
import AddEmployee from "./Pages/addemployees";
import DailyReport from "./Pages/dailyreport";

function App() {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <Box sx={{ display: "flex" }}>
              <Sidebar open={open} />
              <Box sx={{ flexGrow: 1 }}>
                <Header onDrawerToggle={toggleDrawer} />
                <Box sx={{ padding: 3 }}>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/employee" element={<AddEmployee />} />
                    <Route path="/employee/:id" element={<DailyReport />} />
                  </Routes>
                </Box>
              </Box>
            </Box>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;