import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Cliente from "../pages/Cliente";
import Campain from "../pages/Campain";
import Ml from "../pages/Ml";
import Reportes from "../pages/Reportes";
import NotFoundPage from "../pages/NotFoundPage";
import DashboardLayout from "../layouts/DashboardLayout";
// import Login from "../pages/Reportes";


export default function AppRouter() {
  return (
    <Routes>
     <Route path="/" element={ <DashboardLayout/> }>
        <Route index element={<Home />} />
        <Route path="clientes" element={<Cliente />} />
        <Route path="campañas" element={<Campain />} />
        <Route path="ml" element={<Ml />} />
        <Route path="reportes" element={<Reportes />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      {/* <Route path="login" element={<Login/> } /> */}
    </Routes>
  );
}
