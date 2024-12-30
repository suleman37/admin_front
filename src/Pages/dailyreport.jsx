import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

const DailyReport = () => {
  const { id } = useParams();
  const employeeId = id; // Keep as string to match API _id
  const [attendanceData, setAttendanceData] = useState([]);
  const [employeeName, setEmployeeName] = useState("");

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get("http://16.170.204.4:5000/api/employees");
        const employee = response.data.find(emp => emp._id === employeeId);
        if (employee) {
          setAttendanceData(employee.attendance);
          setEmployeeName(employee.name);
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, [employeeId]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        padding: 3,
      }}
    >
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.main" }}>
              <TableCell sx={{ color: "#fff" }}>Date</TableCell>
              <TableCell sx={{ color: "#fff" }}>Employee Name</TableCell>
              <TableCell sx={{ color: "#fff" }}>Check-In Time</TableCell>
              <TableCell sx={{ color: "#fff" }}>Check-Out Time</TableCell>
              <TableCell sx={{ color: "#fff" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendanceData.map((record) => (
              <TableRow key={record._id}>
                <TableCell>{record.date}</TableCell>
                <TableCell>{employeeName}</TableCell>
                <TableCell>{record.checkInTime}</TableCell>
                <TableCell>{record.checkOutTime}</TableCell>
                <TableCell>
                  {record.checkInTime && record.checkOutTime ? "Present" : "Absent"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DailyReport;