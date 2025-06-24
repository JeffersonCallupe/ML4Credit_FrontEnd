import React from "react";
import { ClientTable } from "../components/tablaCliente/ClientTable";
import clientes from "../app/dashboard/clientes.json"

const Clientes = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start ">
      <div className="w-full">
        <ClientTable data={clientes} />
      </div>
    </div>
  );
};

export default Clientes;

