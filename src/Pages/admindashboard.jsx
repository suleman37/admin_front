import { useState, useEffect } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { BarChart, Bar } from "recharts";
import axios from "axios";

// Transform the fetched data for use in charts
const transformDataForCharts = (data) => {
  const monthlyPerformance = {};
  const weeklyPerformance = {};

  data.forEach((employee) => {
    employee.attendance.forEach((record) => {
      const month = new Date(record.date).toLocaleString('default', { month: 'short' });
      const week = `Week ${Math.ceil(new Date(record.date).getDate() / 7)}`;

      if (!monthlyPerformance[month]) {
        monthlyPerformance[month] = { month };
      }
      if (!weeklyPerformance[week]) {
        weeklyPerformance[week] = { week };
      }

      monthlyPerformance[month][employee.name] = (monthlyPerformance[month][employee.name] || 0) + 1;
      weeklyPerformance[week][employee.name] = (weeklyPerformance[week][employee.name] || 0) + 1;
    });
  });

  return {
    monthly: Object.values(monthlyPerformance),
    weekly: Object.values(weeklyPerformance),
  };
};

const AdminDashboard = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [currentDay, setCurrentDay] = useState("");
  const [employeeMonthlyPerformanceData, setEmployeeMonthlyPerformanceData] = useState([]);
  const [employeeWeeklyPerformanceData, setEmployeeWeeklyPerformanceData] = useState([]);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
      setCurrentDate(now.toLocaleDateString());
      setCurrentDay(now.toLocaleDateString("en-US", { weekday: "long" }));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/employees");
        const transformedData = transformDataForCharts(response.data);
        setEmployeeMonthlyPerformanceData(transformedData.monthly);
        setEmployeeWeeklyPerformanceData(transformedData.weekly);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "auto",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
      }}
    >
      <Typography variant="h4" gutterBottom align="left" sx={{ mb: 10 }}>
        <b>Admin Dashboard</b>
      </Typography>

      {/* Cards for Time, Date, and Day */}
      <Grid container spacing={3} justifyContent="center" sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Current Time</Typography>
            <Typography variant="h4">{currentTime}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Current Date</Typography>
            <Typography variant="h4">{currentDate}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Current Day</Typography>
            <Typography variant="h4">{currentDay}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Graphs */}
      <Grid container spacing={3} justifyContent="center">
        {/* Line Chart for Employee Monthly Performance */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Employee Monthly Performance
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={employeeMonthlyPerformanceData}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                {Object.keys(employeeMonthlyPerformanceData[0] || {}).filter(key => key !== 'month').map((name, index) => (
                  <Line key={name} type="monotone" dataKey={name} stroke={`hsl(${index * 60}, 70%, 50%)`} strokeWidth={2} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Bar Chart for Employee Weekly Performance */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Employee Weekly Performance
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={employeeWeeklyPerformanceData}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                {Object.keys(employeeWeeklyPerformanceData[0] || {}).filter(key => key !== 'week').map((name, index) => (
                  <Bar key={name} dataKey={name} fill={`hsl(${index * 60}, 70%, 50%)`} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;