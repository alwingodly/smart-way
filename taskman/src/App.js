// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/Login";
import Home from "./pages/users/Home";
import Dashboard from "./pages/admin/Dashboard";
import Layout from "./components/Layout";
import AddEnquery from "./pages/users/AddEnquery";
import AdminWrapper from "./wrappers/adminWrapper";
import UserWrapper from "./wrappers/userWrapper";
import AuthWrapper from "./wrappers/authwrapper";
import AddEmployee from "./pages/admin/AddEmployee";
import EmployeeDetails from "./pages/admin/EmployeeDetails";
import EditEnquiry from "./pages/users/EditEnquiry";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthWrapper element={<Login />} />} />
        <Route
          path="/add-enquiry"
          element={
            <UserWrapper
              element={
                <Layout>
                  <AddEnquery />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/edit-enquiry/:id"
          element={
            <UserWrapper
              element={
                // <Layout>
                  <EditEnquiry />
                // </Layout>
              }
            />
          }
        />
        <Route
          path="/add-employee"
          element={
            <AdminWrapper
              element={
                <Layout>
                  <AddEmployee />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/employee/:employeeId"
          element={
            <AdminWrapper
              element={
                <Layout>
                  <EmployeeDetails />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/home"
          element={
            <UserWrapper
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <AdminWrapper
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
              roleRequired="admin"
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
