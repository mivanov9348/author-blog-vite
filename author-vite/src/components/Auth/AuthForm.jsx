import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setConfirmPassword(""); // Reset confirmPassword when toggling
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLogin) {
      if (login(email, password)) {
        navigate("/");
      } else {
        alert("Invalid credentials");
      }
    } else {
      // Registration logic here
    }
  };

  return (
    <Container
      sx={{
        backgroundColor: "black",
        height: "500px",
        mt: 2,
        border: "2px solid white",
      }}
    >
      <Typography variant="body2" align="center" sx={{ mt: 1, mb: -2 }}>
        <Link
          component="button"
          onClick={() => setIsLogin(true)}
          sx={{
            cursor: "pointer",
            textDecoration: isLogin ? "underline" : "none",
            fontWeight: isLogin ? "bold" : "normal",
            color: isLogin ? "red" : "green",
          }}
        >
          Login
        </Link>
        {" / "}
        <Link
          component="button"
          onClick={() => setIsLogin(false)}
          sx={{
            cursor: "pointer",
            textDecoration: !isLogin ? "underline" : "none",
            fontWeight: !isLogin ? "bold" : "normal",
            color: !isLogin ? "red" : "green",
          }}
        >
          Register
        </Link>
      </Typography>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mt: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "darkgray",
        }}
      >
        <Typography variant="h6" sx={{ mb: 3 }}>
          {isLogin ? "Login" : "Register"}
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          {!isLogin && (
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              required
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ mb: 2 }}
            />
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mb: 2 }}
          >
            {isLogin ? "Login" : "Register"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
