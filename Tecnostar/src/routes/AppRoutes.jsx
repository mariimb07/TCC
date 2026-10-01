import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import AdminDashboard from "../pages/AdminDashboard";
import Imc from "../pages/Imc";
import CriarConta from "../pages/CriarConta";
import AcompNutri from "../pages/AcompNutri";
import PerfilUsuario from "../pages/PerfilUsuario";
import PlanoAlimentar from "../pages/PlanoAlimentar"
import DashboardCliente from "../pages/DashboardClinte";




export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/imc" element={<Imc />} />
        <Route path="/CriarConta" element={<CriarConta />} />
        <Route path="/AcompNutri" element={<AcompNutri />} />
        <Route path="/PerfilUsuario" element={<PerfilUsuario />} />
        <Route path="/PlanoAlimentar" element={<PlanoAlimentar />} />
        <Route path="/DashboardCliente" element={<DashboardCliente />} />
        



        {/* Página 404 */}
        {/* Página 404 */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center">
              <h1 className="text-4xl font-bold">
                404 - Página não encontrada
              </h1>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}