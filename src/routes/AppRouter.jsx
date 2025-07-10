import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import Home from "../pages/Home";
import Cliente from "../pages/Cliente";
import Campain from "../pages/Campain";
import Ml from "../pages/Ml";
import Reportes from "../pages/Reportes";
import NotFoundPage from "../pages/NotFoundPage";
import DashboardLayout from "../layouts/DashboardLayout";
import Login from "../pages/Login";
import EmailCampanas from "../pages/EmailCampanas";

export default function AppRouter() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <p style={{ padding: "2rem" }}>Cargando autenticación...</p>;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Rutas protegidas */}
      <Route
        path="/"
        element={user ? <DashboardLayout /> : <Navigate to="/login" />}
      >
        <Route index element={<Home />} />
        <Route path="clientes" element={<Cliente />} />
        <Route path="campañas" element={<Campain />} />
        <Route path="email-campanas" element={<EmailCampanas />} />
        <Route path="ml" element={<Ml />} />
        <Route path="reportes" element={<Reportes />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
