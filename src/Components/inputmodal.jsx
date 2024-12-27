import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const Modal = ({ open, onClose, onSubmit, title }) => {
  const [formValues, setFormValues] = useState({
    employeeName: "",
    designation: "",
    address: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(formValues);
    setFormValues({
      employeeName: "",
      designation: "",
      address: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "10px",
          background: "#ffffff",
          color: "#000000",
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: "bold" }}>{title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Employee Name"
          name="employeeName"
          type="text"
          fullWidth
          variant="outlined"
          value={formValues.employeeName}
          onChange={handleInputChange}
          sx={{ color: "#000000" }}
        />
        <TextField
          margin="dense"
          label="Designation"
          name="designation"
          type="text"
          fullWidth
          variant="outlined"
          value={formValues.designation}
          onChange={handleInputChange}
          sx={{ color: "#000000" }}
        />
        <TextField
          margin="dense"
          label="Address"
          name="address"
          type="text"
          fullWidth
          variant="outlined"
          value={formValues.address}
          onChange={handleInputChange}
          sx={{ color: "#000000" }}
        />
        <TextField
          margin="dense"
          label="Email"
          name="email"
          type="email"
          fullWidth
          variant="outlined"
          value={formValues.email}
          onChange={handleInputChange}
          sx={{ color: "#000000" }}
        />
        <TextField
          margin="dense"
          label="Phone Number"
          name="phoneNumber"
          type="text"
          fullWidth
          variant="outlined"
          value={formValues.phoneNumber}
          onChange={handleInputChange}
          sx={{ color: "#000000" }}
        />
        <TextField
          margin="dense"
          label="Password"
          name="password"
          type="password"
          fullWidth
          variant="outlined"
          value={formValues.password}
          onChange={handleInputChange}
          sx={{ color: "#000000" }}
        />
        <TextField
          margin="dense"
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          fullWidth
          variant="outlined"
          value={formValues.confirmPassword}
          onChange={handleInputChange}
          sx={{ color: "#000000" }}
        />
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            color: "#000000",
            "&:hover": { background: "rgba(0,0,0,0.05)" },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;