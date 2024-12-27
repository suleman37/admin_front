import { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CssBaseline,
  Paper,
} from "@mui/material";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            borderRadius: 2,
            width: "100%",
            maxWidth: 400,
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#1976d2" }}
          >
            Welcome Back
          </Typography>
          <Typography
            variant="body2"
            align="center"
            gutterBottom
            sx={{ color: "gray" }}
          >
            Please login to your account
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#115293" },
              }}
            >
              Login
            </Button>
          </Box>
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 2, color: "gray" }}
          >
            Don&apos;t have an account? <a href="/dashboard">Sign Up</a>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;