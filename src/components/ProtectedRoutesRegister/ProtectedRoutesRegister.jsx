import React from "react";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ProtectedRoutesRegister = ({ registerIn, children }) => {
  if (!registerIn) {
    toast.error(`Debes registrarte para poder navegar a esta página`);
    return (
      <>
        <Navigate to="/register"></Navigate>;
        <ToastContainer position="top-right" autoClose={4000} />
      </>
    );
  }
  return (
    <>
      {children};<ToastContainer position="top-right" autoClose={4000} />
    </>
  );
};

export default ProtectedRoutesRegister;
