import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Typography } from "@mui/material";

export default function UserConfig() {
  const { user } = useContext(AuthContext);
  return (
    <Typography>
      nickname: {user.nickname} email: {user.email} role: {user.role}
    </Typography>
  );
}
