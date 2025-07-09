import React, { useEffect, useState } from "react";
import axios from "axios";
import { ClientTable } from "../components/tablaCliente/ClientTable";


const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://localhost:8000/clientes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setClientes(res.data);
    })
    .catch((err) => {
      console.error("Error al cargar clientes:", err);
    })
    .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start">
      <div className="w-full">
        {loading ? (
          <p className="text-center p-4">Cargando clientes...</p>
        ) : (
          <ClientTable data={clientes} />
        )}
      </div>
    </div>
  );
};

export default Clientes;
