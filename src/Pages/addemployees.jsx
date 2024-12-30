import { Box, Typography, Button, Card, CardContent, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../Components/inputmodal";
import { ToastContainer, toast } from "material-react-toastify";
import 'material-react-toastify/dist/ReactToastify.css';
import DeleteIcon from '@mui/icons-material/Delete';

const EmployeeCards = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/employees");
        setEmployees(response.data);
      } catch (error) {
        toast.error(`Error fetching employees: ${error.response?.data || error.message}`);
      }
    };

    fetchEmployees();
  }, []);

  const handleAddEmployee = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = async (formData) => {
    const { employeeName, designation, address, email, phoneNumber, password, confirmPassword } = formData;

    // Validation
    if (!employeeName || !designation || !address || !email || !phoneNumber || !password || !confirmPassword) {
      toast.error("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/create", {
        name: employeeName,
        designation,
        address,
        email,
        phoneNumber,
        password,
      });
      toast.success("New employee added successfully.");
      setIsModalOpen(false);
      setEmployees([...employees, response.data.employee]);
    } catch (error) {
      toast.error(`Error adding employee: ${error.response?.data || error.message}`);
    }
  };

  const handleCardClick = (employee) => {
    navigate(`/employee/${employee._id}`);
  };

  const handleDeleteEmployee = async (employeeId) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${employeeId}`);
      setEmployees(employees.filter(employee => employee._id !== employeeId));
      toast.success("Employee deleted successfully.");
    } catch (error) {
      toast.error(`Error deleting employee: ${error.response?.data || error.message}`);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        <b>Employee Cards</b>
      </Typography>

      <Button variant="contained" color="primary" sx={{ mb: 3 }} onClick={handleAddEmployee}>
        Add New Employee
      </Button>
      <ToastContainer position="top-right" />

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
        {employees.map((employee, index) => (
          employee && (
            <Card key={index} sx={{ width: 460, height: 'auto', cursor: 'pointer', flex: '1 1 calc(33.333% - 16px)', position: 'relative' }} onClick={() => handleCardClick(employee)}>
              <IconButton
                sx={{ position: 'absolute', top: 0, right: 0 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteEmployee(employee._id);
                }}
              >
                <DeleteIcon />
              </IconButton>
              <CardContent>
                <Typography variant="h5" component="div">
                  <b>{employee.name}</b>
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {employee.email}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {employee.designation}
                </Typography>
              </CardContent>
            </Card>
          )
        ))}
      </Box>

      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        title="Add New Employee"
      />
    </Box>
  );
};

export default EmployeeCards;