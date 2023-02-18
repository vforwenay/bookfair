import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate()
  return (
    <Button
      className="Button"
      variant="danger"
      onClick={() =>{
        localStorage.clear()
        navigate('/')
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
