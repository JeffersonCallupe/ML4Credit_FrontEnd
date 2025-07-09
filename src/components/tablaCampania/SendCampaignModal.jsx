import React, { useState, useMemo } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

const API_URL = "http://localhost:8000";

const SendCampaignModal = ({ isOpen, onClose, campaign, onSend }) => {
  const [selectedClients, setSelectedClients] = useState([]);
  const [searchDni, setSearchDni] = useState("");
  const [message, setMessage] = useState("");
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    const token = localStorage.getItem("token");
    axios
      .get(`${API_URL}/clientes`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setClients(res.data);
      })
      .catch((err) => {
        setClients([]);
        console.error("Error al cargar clientes:", err);
      })
      .finally(() => setLoading(false));
  }, [isOpen]);

  // Filtrar solo clientes activos y por DNI
  const filteredClients = useMemo(() => {
    return clients.filter(
      (c) =>
        c.estado === "Activo" &&
        c.dni.toLowerCase().includes(searchDni.toLowerCase())
    );
  }, [clients, searchDni]);

  const allSelected =
    filteredClients.length > 0 &&
    filteredClients.every((c) => selectedClients.includes(c.dni));

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedClients((prev) =>
        prev.filter((dni) => !filteredClients.some((c) => c.dni === dni))
      );
    } else {
      setSelectedClients((prev) => [
        ...prev,
        ...filteredClients
          .map((c) => c.dni)
          .filter((dni) => !prev.includes(dni)),
      ]);
    }
  };

  const toggleSelectClient = (dni) => {
    setSelectedClients((prev) =>
      prev.includes(dni)
        ? prev.filter((d) => d !== dni)
        : [...prev, dni]
    );
  };

  const handleSend = () => {
    // Aquí se llamaría a la API real de envío
    onSend({
      campaignId: campaign.id,
      clients: selectedClients,
      message,
    });
    setSelectedClients([]);
    setMessage("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative animate-fade-in">
        <h2 className="text-xl font-bold mb-4 text-blue-700">
          Enviar Campaña: <span className="font-normal">{campaign?.nombre}</span>
        </h2>
        <div className="mb-4 flex flex-col sm:flex-row gap-2 sm:items-center">
          <input
            type="text"
            placeholder="Buscar por DNI..."
            className="border p-2 rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchDni}
            onChange={(e) => setSearchDni(e.target.value)}
          />
          <Button
            onClick={toggleSelectAll}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            {allSelected ? "Deseleccionar Todos" : "Seleccionar Todos"}
          </Button>
        </div>
        <div className="overflow-x-auto max-h-56 mb-4 border rounded-md">
          <table className="w-full text-sm">
            <thead className="bg-blue-100">
              <tr>
                <th className="p-2 text-left">Sel.</th>
                <th className="p-2 text-left">DNI</th>
                <th className="p-2 text-left">Nombres</th>
                <th className="p-2 text-left">Correo</th>
                <th className="p-2 text-left">Estado</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.length > 0 ? (
                filteredClients.map((c) => (
                  <tr key={c.dni} className="hover:bg-gray-50">
                    <td className="p-2">
                      <input
                        type="checkbox"
                        checked={selectedClients.includes(c.dni)}
                        onChange={() => toggleSelectClient(c.dni)}
                      />
                    </td>
                    <td className="p-2">{c.dni}</td>
                    <td className="p-2">{c.nombres} {c.apellidos}</td>
                    <td className="p-2">{c.correo}</td>
                    <td className="p-2">
                      <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                        {c.estado}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-400">
                    No hay clientes activos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Contenido de la campaña</label>
          <textarea
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe el contenido del mensaje..."
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            disabled={selectedClients.length === 0 || !message.trim()}
          >
            Enviar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SendCampaignModal;
