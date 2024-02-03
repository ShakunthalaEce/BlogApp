import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const navigator = useNavigate();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async () => {
    console.log(user);
    const res = await fetch("http://localhost:7000/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    if (res.ok) {
      navigator("/login");
    } else {
      console.log(data);
    }
  };
  return (
    <Card
      sx={{
        p: 4,
        maxWidth: "550px",
        margin: "50px auto",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        borderRadius: "15px",
      }}
      elevation={10}
    >
      <CardContent sx={{ m: 0 }}>
        <Typography gutterBottom variant="h4" component="div" sx={{ m: 0 }}>
          Register Here!
        </Typography>
      </CardContent>
      <TextField
        id="outlined-basic"
        label="name"
        variant="outlined"
        type={"text"}
        name={"name"}
        onChange={handleChange}
        value={user.name}
      />
      <TextField
        id="outlined-basic"
        label="email"
        variant="outlined"
        type={"email"}
        name={"email"}
        onChange={handleChange}
        value={user.email}
      />
      <TextField
        id="outlined-basic"
        label="password"
        variant="outlined"
        type={"password"}
        name={"password"}
        onChange={handleChange}
        value={user.password}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Register
      </Button>
    </Card>
  );
};

export default Register;
